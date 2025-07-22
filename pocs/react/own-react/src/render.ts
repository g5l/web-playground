// import { VNode, VNodeImpl } from './vdom';
//
// export function render(vnode: VNode, container: HTMLElement) {
//   function createDomNode(node: VNode): HTMLElement | Text {
//     const impl = node as VNodeImpl;
//     if (impl.isTextElement()) {
//       const textNode = document.createTextNode(impl.props.nodeValue || '');
//       impl.dom = textNode;
//       return textNode;
//     } else if (impl.isElement()) {
//       const el = document.createElement(impl.type as string);
//       for (const [key, value] of Object.entries(impl.props)) {
//         if (key !== 'children' && key !== 'nodeValue') {
//           el.setAttribute(key, value != null ? String(value) : '');
//         }
//       }
//       if (impl.children) {
//         for (const child of impl.children) {
//           el.appendChild(createDomNode(child));
//         }
//       }
//       impl.dom = el;
//       return el;
//     } else {
//       throw new Error('Component rendering not supported in basic render');
//     }
//   }
//
//   container.innerHTML = '';
//   container.appendChild(createDomNode(vnode));
// } 


export function render(element, container) {
  if (typeof element === "string" || typeof element === "number") {
    const textNode = document.createTextNode(element);
    container.appendChild(textNode);
    return;
  }

  const dom = document.createElement(element.type);

  if (element.props) {
    for (const [key, value] of Object.entries(element.props)) {
      if (key === "children") continue;
      dom.setAttribute(key, value);
    }
  }

  const children = element.props?.children || [];
  (Array.isArray(children) ? children : [children]).forEach(child =>
    render(child, dom)
  );

  container.appendChild(dom);
}