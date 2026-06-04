# vDOM Reconciler — Full Design Reference

Steps completed so far: `createElement`, `createDom`/`render`, `updateDom`.
Steps remaining: `update` (base cases), unkeyed diff, keyed diff.

---

## Step 2 — `update` + `reconcileChildren`

Add to `vdom.js`:

```js
// Reconciler entry point
//
// Patches the DOM node at one "slot" inside container.
// prevEl._dom is the existing node; after update nextEl._dom points to the
// kept or newly created node.
export function update(prevEl, nextEl, container) {
  // Case 1 — both absent: nothing to do.
  if (!prevEl && !nextEl) return;

  // Case 2 — removal.
  if (prevEl && !nextEl) {
    container.removeChild(prevEl._dom);
    console.log(`REMOVE node <${prevEl.type}>`);
    return;
  }

  // Case 3 — fresh mount.
  if (!prevEl && nextEl) {
    container.appendChild(createDom(nextEl));
    console.log(`CREATE node <${nextEl.type}>`);
    return;
  }

  // Case 4a — different types: tear down old, build new.
  // Nodes of different types never share DOM state (e.g. <div> vs <span>).
  if (prevEl.type !== nextEl.type) {
    container.replaceChild(createDom(nextEl), prevEl._dom);
    console.log(`REPLACE <${prevEl.type}> -> <${nextEl.type}>`);
    return;
  }

  // Cases 4b/4c — same type: reuse the existing DOM node.
  nextEl._dom = prevEl._dom;

  if (nextEl.type === 'TEXT_ELEMENT') {
    // Only write to the DOM if the string actually changed (cheap bailout).
    if (prevEl.props.nodeValue !== nextEl.props.nodeValue) {
      nextEl._dom.nodeValue = nextEl.props.nodeValue;
      console.log(`UPDATE text "${nextEl.props.nodeValue}"`);
    }
    return;
  }

  // Same element type — diff props then recurse into children.
  updateDom(nextEl._dom, prevEl.props, nextEl.props);
  reconcileChildren(prevEl, nextEl);
}

function reconcileChildren(prevEl, nextEl) {
  const prev = prevEl.props.children;
  const next = nextEl.props.children;
  const dom  = nextEl._dom;

  // Array.every([]) === true (vacuously), so empty lists are keyed-compatible.
  const allKeyed = list => list.every(c => c.props?.key != null);
  const anyKeyed = list => list.some(c => c.props?.key != null);

  if (allKeyed(prev) && allKeyed(next)) {
    diffKeyed(prev, next, dom);
  } else {
    // Mixed lists fall back to unkeyed — React does the same and warns.
    if (anyKeyed(prev) || anyKeyed(next)) {
      console.warn('Mixed keyed/unkeyed children — falling back to unkeyed diff');
    }
    diffUnkeyed(prev, next, dom);
  }
}
```

Tests to add to `vdom.test.js`:

```js
describe('update — base cases', () => {
  let container;
  beforeEach(() => { container = document.createElement('div'); });

  it('case 1: both null — no-op', () => {
    update(null, null, container);
    expect(container.childNodes.length).toBe(0);
  });

  it('case 2: prev exists, next null — removes the node', () => {
    const prev = createElement('div', null);
    render(prev, container);
    update(prev, null, container);
    expect(container.childNodes.length).toBe(0);
  });

  it('case 3: prev null, next exists — mounts fresh', () => {
    const next = createElement('span', null, 'new');
    update(null, next, container);
    expect(container.querySelector('span').textContent).toBe('new');
  });

  it('case 4a: different types — replaces node', () => {
    const prev = createElement('div', null);
    render(prev, container);
    const next = createElement('span', null);
    update(prev, next, container);
    expect(container.querySelector('div')).toBeNull();
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('case 4b: same TEXT_ELEMENT — updates nodeValue in place', () => {
    const prev = createElement('p', null, 'old');
    render(prev, container);
    const next = createElement('p', null, 'new');
    update(prev, next, container);
    expect(container.querySelector('p').textContent).toBe('new');
  });

  it('case 4c: same type — reuses the existing DOM node', () => {
    const prev = createElement('div', { id: 'x' });
    render(prev, container);
    const original = container.querySelector('div');
    const next = createElement('div', { id: 'y' });
    update(prev, next, container);
    expect(container.querySelector('div')).toBe(original); // same node, not replaced
    expect(original.id).toBe('y');
  });
});
```

---

## Step 3 — Unkeyed diff

Add to `vdom.js`:

```js
// Pairs children by position. A prepend at index 0 shifts every subsequent
// index: the <input> DOM node at position 0 keeps its typed text but its
// surrounding label gets patched to the new item's data. That is the classic
// keys bug — visually the text "jumps" to the wrong row.
function diffUnkeyed(prev, next, dom) {
  const len = Math.max(prev.length, next.length);
  for (let i = 0; i < len; i++) {
    update(prev[i] ?? null, next[i] ?? null, dom);
  }
}
```

Tests to add:

```js
describe('unkeyed diff', () => {
  let container;
  beforeEach(() => { container = document.createElement('div'); });

  it('updates children pairwise by index', () => {
    const prev = createElement('ul', null, createElement('li', null, 'a'), createElement('li', null, 'b'));
    render(prev, container);
    const next = createElement('ul', null, createElement('li', null, 'x'), createElement('li', null, 'y'));
    update(prev, next, container);
    const items = container.querySelectorAll('li');
    expect(items[0].textContent).toBe('x');
    expect(items[1].textContent).toBe('y');
  });

  it('appends when next has more children', () => {
    const prev = createElement('ul', null, createElement('li', null, 'a'));
    render(prev, container);
    const next = createElement('ul', null, createElement('li', null, 'a'), createElement('li', null, 'b'));
    update(prev, next, container);
    expect(container.querySelectorAll('li').length).toBe(2);
  });

  it('removes when prev has more children', () => {
    const prev = createElement('ul', null, createElement('li', null, 'a'), createElement('li', null, 'b'));
    render(prev, container);
    const next = createElement('ul', null, createElement('li', null, 'a'));
    update(prev, next, container);
    expect(container.querySelectorAll('li').length).toBe(1);
  });

  it('DOM node at index 0 keeps typed content after a prepend (the keys bug)', () => {
    const prev = createElement('ul', null,
      createElement('li', null, createElement('input', { type: 'text' })),
    );
    render(prev, container);
    const input = container.querySelector('input');
    input.value = 'typed';

    const next = createElement('ul', null,
      createElement('li', null, createElement('input', { type: 'text' })),
      createElement('li', null, createElement('input', { type: 'text' })),
    );
    update(prev, next, container);

    const inputs = container.querySelectorAll('input');
    expect(inputs[0].value).toBe('typed'); // follows DOM node, not data item
    expect(inputs[1].value).toBe('');
  });
});
```

---

## Step 4 — Keyed diff

Add to `vdom.js`:

```js
// Matches children by key so each DOM node follows its logical item across
// insertions, removals, and reorders.
//
// How this differs from React (ReactChildFiber.js, reconcileChildrenArray):
//   React tracks a "last placed index" and only moves nodes whose old index
//   is less than the last placed index — this implicitly finds a simplified
//   LIS to minimise insertBefore calls. We skip that optimisation: we always
//   re-insert any node that is out of position. Both are correct; React's
//   version does fewer moves on a reverse-sorted list but is harder to read.
function diffKeyed(prev, next, dom) {
  // Step 1 — index prev children by key for O(1) lookup.
  const prevByKey = new Map(prev.map(c => [c.props.key, c]));

  // Step 2 — walk next children: update matched, create fresh nodes for new keys.
  const used = new Set();
  for (const nextChild of next) {
    const key = nextChild.props.key;
    const prevChild = prevByKey.get(key);
    if (prevChild) {
      used.add(key);
      nextChild._dom = prevChild._dom;
      updateDom(nextChild._dom, prevChild.props, nextChild.props);
      reconcileChildren(prevChild, nextChild);
    } else {
      // createDom stores the new node on nextChild._dom but does not insert it
      // into the parent — Step 4 positions it via insertBefore.
      createDom(nextChild);
      console.log(`CREATE node key="${key}"`);
    }
  }

  // Step 3 — remove prev nodes whose keys disappeared from next.
  for (const prevChild of prev) {
    if (!used.has(prevChild.props.key)) {
      dom.removeChild(prevChild._dom);
      console.log(`REMOVE node key="${prevChild.props.key}"`);
    }
  }

  // Step 4 — place every next child at its correct index.
  // insertBefore on an in-DOM node moves it; on a fresh node it inserts it.
  // NOTE: optimal version uses LIS on old indices to minimise moves.
  for (let i = 0; i < next.length; i++) {
    const child  = next[i];
    const domAtI = dom.childNodes[i];
    if (domAtI !== child._dom) {
      dom.insertBefore(child._dom, domAtI ?? null);
      if (used.has(child.props.key)) console.log(`MOVE node key="${child.props.key}"`);
    }
  }
}
```

Tests to add:

```js
describe('keyed diff', () => {
  let container;
  beforeEach(() => { container = document.createElement('div'); });

  function renderList(keys) {
    const el = createElement('ul', null, ...keys.map(k => createElement('li', { key: k }, String(k))));
    render(el, container);
    return el;
  }

  it('prepend: inserts one new node, reuses all others', () => {
    const prev = renderList([1, 2, 3]);
    const original = [...container.querySelectorAll('li')];
    const next = createElement('ul', null,
      createElement('li', { key: 0 }, '0'),
      createElement('li', { key: 1 }, '1'),
      createElement('li', { key: 2 }, '2'),
      createElement('li', { key: 3 }, '3'),
    );
    update(prev, next, container);
    const updated = [...container.querySelectorAll('li')];
    expect(updated[1]).toBe(original[0]);
    expect(updated[2]).toBe(original[1]);
    expect(updated[3]).toBe(original[2]);
  });

  it('removes nodes whose keys are absent from next', () => {
    const prev = renderList([1, 2, 3]);
    const next = createElement('ul', null, createElement('li', { key: 1 }, '1'), createElement('li', { key: 3 }, '3'));
    update(prev, next, container);
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe('1');
    expect(items[1].textContent).toBe('3');
  });

  it('reorders without creating new DOM nodes', () => {
    const prev = renderList([1, 2, 3]);
    const original = [...container.querySelectorAll('li')];
    const next = createElement('ul', null,
      createElement('li', { key: 3 }, '3'),
      createElement('li', { key: 1 }, '1'),
      createElement('li', { key: 2 }, '2'),
    );
    update(prev, next, container);
    const reordered = [...container.querySelectorAll('li')];
    expect(reordered[0]).toBe(original[2]);
    expect(reordered[1]).toBe(original[0]);
    expect(reordered[2]).toBe(original[1]);
  });

  it('typed input value follows its DOM node with keys (no keys bug)', () => {
    const prev = createElement('ul', null,
      createElement('li', { key: 1 }, createElement('input', { type: 'text' })),
    );
    render(prev, container);
    container.querySelector('input').value = 'typed';
    const next = createElement('ul', null,
      createElement('li', { key: 2 }, createElement('input', { type: 'text' })),
      createElement('li', { key: 1 }, createElement('input', { type: 'text' })),
    );
    update(prev, next, container);
    const inputs = container.querySelectorAll('input');
    expect(inputs[0].value).toBe('');
    expect(inputs[1].value).toBe('typed');
  });

  it('warns and falls back to unkeyed on mixed lists', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const prev = createElement('ul', null, createElement('li', { key: 1 }, 'a'), createElement('li', null, 'b'));
    render(prev, container);
    const next = createElement('ul', null, createElement('li', { key: 1 }, 'a'), createElement('li', null, 'b'));
    update(prev, next, container);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Mixed keyed/unkeyed'));
    warn.mockRestore();
  });
});
```
