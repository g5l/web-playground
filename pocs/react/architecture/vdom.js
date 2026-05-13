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