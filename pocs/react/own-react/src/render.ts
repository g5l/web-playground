import { VNode, VNodeImpl } from './vdom';

/**
 * Render a VNode tree into a real DOM container
 */
export function render(vnode: VNode, container: HTMLElement) {
  // Helper to recursively create DOM nodes from VNode
  function createDomNode(node: VNode): HTMLElement | Text {
    const impl = node as VNodeImpl;
    if (impl.isTextElement()) {
      const textNode = document.createTextNode(impl.props.nodeValue || '');
      impl.dom = textNode;
      return textNode;
    } else if (impl.isElement()) {
      const el = document.createElement(impl.type as string);
      // Set props (excluding children)
      for (const [key, value] of Object.entries(impl.props)) {
        if (key !== 'children' && key !== 'nodeValue') {
          el.setAttribute(key, value != null ? String(value) : '');
        }
      }
      // Recursively append children
      if (impl.children) {
        for (const child of impl.children) {
          el.appendChild(createDomNode(child));
        }
      }
      impl.dom = el;
      return el;
    } else {
      // For now, ignore components (functions/classes)
      throw new Error('Component rendering not supported in basic render');
    }
  }

  // Clear the container
  container.innerHTML = '';
  // Mount the root node
  container.appendChild(createDomNode(vnode));
} 