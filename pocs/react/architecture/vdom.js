// Element creation

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(c =>
        typeof c === 'object' && c !== null ? c : createTextElement(c)
      ),
    },
  };
}

function createTextElement(text) {
  return { type: 'TEXT_ELEMENT', props: { nodeValue: String(text), children: [] } };
}

// Initial mount

function createDom(element) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  updateDom(dom, {}, element.props);
  element.props.children.forEach(child => dom.appendChild(createDom(child)));
  element._dom = dom;
  return dom;
}

export function render(element, container) {
  container.appendChild(createDom(element));
}

// Prop diffing

const isEvent = k => k.startsWith('on');
const isProp  = k => k !== 'children' && k !== 'key' && !isEvent(k);

export function updateDom(dom, prev = {}, next = {}) {
  for (const k of Object.keys(prev).filter(isEvent)) {
    if (!(k in next) || prev[k] !== next[k]) {
      dom.removeEventListener(k.slice(2).toLowerCase(), prev[k]);
      console.log(`REMOVE listener ${k}`);
    }
  }

  for (const k of Object.keys(prev).filter(isProp)) {
    if (!(k in next)) {
      dom.removeAttribute ? dom.removeAttribute(k) : (dom[k] = '');
      console.log(`REMOVE attr ${k}`);
    }
  }

  for (const k of Object.keys(next).filter(isProp)) {
    if (prev[k] !== next[k]) {
      if (k === 'style' && typeof next[k] === 'string') {
        dom.setAttribute('style', next[k]);
      } else {
        dom[k] = next[k];
      }
      console.log(`UPDATE attr ${k} = ${next[k]}`);
    }
  }

  for (const k of Object.keys(next).filter(isEvent)) {
    if (prev[k] !== next[k]) {
      dom.addEventListener(k.slice(2).toLowerCase(), next[k]);
      console.log(`ADD listener ${k}`);
    }
  }
}

// Reconciler

export function update(prevEl, nextEl, container) {

  if (!prevEl && !nextEl) return;

  if (prevEl && !nextEl) {
    container.removeChild(prevEl._dom);
    console.log(`REMOVE node <${prevEl.type}>`);
    return;
  }
  
  if (!prevEl && nextEl) {
    container.appendChild(createDom(nextEl));
    console.log(`CREATE node <${nextEl.type}>`);
    return;
  }

  if (prevEl.type !== nextEl.type) {
    container.replaceChild(createDom(nextEl), prevEl._dom);
    console.log(`REPLACE <${prevEl.type}> -> <${nextEl.type}>`);
    return;
  }
  
  nextEl._dom = prevEl._dom;

  if (nextEl.type === 'TEXT_ELEMENT') {
    if (prevEl.props.nodeValue !== nextEl.props.nodeValue) {
      nextEl._dom.nodeValue = nextEl.props.nodeValue;
      console.log(`UPDATE text "${nextEl.props.nodeValue}"`);
    }
    return;
  }
  
  updateDom(nextEl._dom, prevEl.props, nextEl.props);
  reconcileChildren(prevEl, nextEl);
}

function diffUnkeyed(prev, next, dom) {
  const len = Math.max(prev.length, next.length);
  for (let i = 0; i < len; i++) {
    update(prev[i] ?? null, next[i] ?? null, dom);
  }
}

function diffKeyed(prev, next, dom) {
  diffUnkeyed(prev, next, dom);
}

function reconcileChildren(prevEl, nextEl) {
  const prev = prevEl.props.children;
  const next = nextEl.props.children;
  const dom  = nextEl._dom;

  const allKeyed = list => list.every(c => c.props?.key != null);
  const anyKeyed = list => list.some(c => c.props?.key != null);

  if (allKeyed(prev) && allKeyed(next)) {
    diffKeyed(prev, next, dom);
  } else {
    if (anyKeyed(prev) || anyKeyed(next)) {
      console.warn('Mixed keyed/unkeyed children — falling back to unkeyed diff');
    }
    diffUnkeyed(prev, next, dom);
  }
}
