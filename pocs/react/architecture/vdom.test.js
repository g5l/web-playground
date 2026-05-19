import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createElement, render, update, updateDom } from './vdom.js';

// createElement

describe('createElement', () => {
  it('returns the correct type and props', () => {
    const el = createElement('div', { id: 'x' });
    expect(el.type).toBe('div');
    expect(el.props.id).toBe('x');
    expect(el.props.children).toEqual([]);
  });

  it('boxes text children as TEXT_ELEMENT', () => {
    const el = createElement('p', null, 'hello');
    expect(el.props.children[0]).toEqual({
      type: 'TEXT_ELEMENT',
      props: { nodeValue: 'hello', children: [] },
    });
  });

  it('passes element children through unchanged', () => {
    const child = createElement('span', null);
    expect(createElement('div', null, child).props.children[0]).toBe(child);
  });
});

// render

describe('render', () => {
  it('appends element to container', () => {
    const container = document.createElement('div');
    render(createElement('p', null, 'hi'), container);
    expect(container.querySelector('p').textContent).toBe('hi');
  });

  it('stores _dom on the element for later reconciliation', () => {
    const container = document.createElement('div');
    const el = createElement('span', null);
    render(el, container);
    expect(el._dom).toBe(container.querySelector('span'));
  });
});

// updateDom

describe('updateDom', () => {
  let dom;
  beforeEach(() => { dom = document.createElement('div'); });

  it('sets new attributes', () => {
    updateDom(dom, {}, { id: 'foo', children: [] });
    expect(dom.id).toBe('foo');
  });

  it('removes attributes absent from next', () => {
    dom.id = 'old';
    updateDom(dom, { id: 'old', children: [] }, { children: [] });
    expect(dom.id).toBe('');
  });

  it('skips write when value is referentially equal', () => {
    updateDom(dom, {}, { className: 'x', children: [] });
    const spy = vi.spyOn(dom, 'setAttribute');
    updateDom(dom, { className: 'x', children: [] }, { className: 'x', children: [] });
    expect(dom.className).toBe('x');
    expect(spy).not.toHaveBeenCalled();
  });

  it('wires up event listeners via addEventListener, not .onclick', () => {
    const handler = vi.fn();
    updateDom(dom, {}, { onClick: handler, children: [] });
    dom.click();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(dom.onclick).toBeNull();
  });

  it('removes old listener and adds new one when handler changes', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    updateDom(dom, {}, { onClick: h1, children: [] });
    updateDom(dom, { onClick: h1, children: [] }, { onClick: h2, children: [] });
    dom.click();
    expect(h1).not.toHaveBeenCalled();
    expect(h2).toHaveBeenCalledTimes(1);
  });
});

// update

describe('update: base cases', () => {
  let container;
  beforeEach(() => { container = document.createElement('div'); });

  it('case 1: both null: no-op', () => {
    update(null, null, container);
    expect(container.childNodes.length).toBe(0);
  });

  it('case 2: prev exists, next null: removes the node', () => {
    const prev = createElement('div', null);
    render(prev, container);
    update(prev, null, container);
    expect(container.childNodes.length).toBe(0);
  });

  it('case 3: prev null, next exists: mounts fresh', () => {
    const next = createElement('span', null, 'new');
    update(null, next, container);
    expect(container.querySelector('span').textContent).toBe('new');
  });

  it('case 4a: different types: replaces node', () => {
    const prev = createElement('div', null);
    render(prev, container);
    const next = createElement('span', null);
    update(prev, next, container);
    expect(container.querySelector('div')).toBeNull();
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('case 4b: same TEXT_ELEMENT: updates nodeValue in place', () => {
    const prev = createElement('p', null, 'old');
    render(prev, container);
    const next = createElement('p', null, 'new');
    update(prev, next, container);
    expect(container.querySelector('p').textContent).toBe('new');
  });

  it('case 4c: same type: reuses the existing DOM node', () => {
    const prev = createElement('div', { id: 'x' });
    render(prev, container);
    const original = container.querySelector('div');
    const next = createElement('div', { id: 'y' });
    update(prev, next, container);
    expect(container.querySelector('div')).toBe(original);
    expect(original.id).toBe('y');
  });
});

// unkeyed diff

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
    container.querySelector('input').value = 'typed';

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

// keyed diff

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
