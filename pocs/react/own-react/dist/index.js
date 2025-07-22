// src/render.ts
function render(element2, container2) {
  if (typeof element2 === "string" || typeof element2 === "number") {
    const textNode = document.createTextNode(element2);
    container2.appendChild(textNode);
    return;
  }
  const dom = document.createElement(element2.type);
  if (element2.props) {
    for (const [key, value] of Object.entries(element2.props)) {
      if (key === "children")
        continue;
      dom.setAttribute(key, value);
    }
  }
  const children = element2.props?.children || [];
  (Array.isArray(children) ? children : [children]).forEach(
    (child) => render(child, dom)
  );
  container2.appendChild(dom);
}

// src/createElement.ts
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props || {},
      children: children.flat()
    }
  };
}

// src/vibe.ts
var Vibe = {
  createElement
};
var vibe_default = Vibe;

// src/index.ts
var element = vibe_default.createElement("div", { id: "root" }, "Hello World");
var container = document.getElementById("root");
render(element, container);
//# sourceMappingURL=index.js.map
