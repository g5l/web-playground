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