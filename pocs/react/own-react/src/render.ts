// export function render(element, container) {
//   if (typeof element === "string" || typeof element === "number") {
//     const textNode = document.createTextNode(element);
//     container.appendChild(textNode);
//     return;
//   }
//
//   const dom = document.createElement(element.type);
//
//   if (element.props) {
//     for (const [key, value] of Object.entries(element.props)) {
//       if (key === "children") continue;
//       dom.setAttribute(key, value);
//     }
//   }
//
//   const children = element.props?.children || [];
//   (Array.isArray(children) ? children : [children]).forEach(child =>
//     render(child, dom)
//   );
//
//   container.appendChild(dom);
// }

let nextUnitOfWork = null;
let wipRoot = null;

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    parent: null,
  };

  nextUnitOfWork = wipRoot;
  requestIdleCallback(workLoop);
}

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}
