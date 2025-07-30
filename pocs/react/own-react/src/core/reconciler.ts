if (typeof globalThis.requestIdleCallback === 'undefined') {
  globalThis.requestIdleCallback = function (cb: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void): number {
    return setTimeout(() => cb({ timeRemaining: () => 50, didTimeout: false }), 1) as unknown as number;
  };
}

import { createDom, updateDom, commitDeletion } from './dom';
import { setWipFiber } from './hooks';
import { Fiber } from '../types/index';

let nextUnitOfWork: Fiber | null = null;
let currentRoot: Fiber | null = null;
let wipRoot: Fiber | null = null;
let deletions: Fiber[] = [];

function commitRoot(): void {
  deletions.forEach(commitWork);
  if (wipRoot && wipRoot.child) {
    commitWork(wipRoot.child);
  }
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber: Fiber | null): void {
  if (!fiber) {
    return;
  }
  let domParentFiber: Fiber = fiber.parent!;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent!;
  }
  const domParent = domParentFiber.dom as HTMLElement | Text;
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom);
  } else if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate!.props,
      fiber.props
    );
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
  }
  commitWork(fiber.child!);
  commitWork(fiber.sibling!);
}

function workLoop(deadline: IdleDeadline): void {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber: Fiber): Fiber | null {
  const isFunctionComponent =
    typeof fiber.type === 'function';
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber: Fiber | null = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent || null;
  }
  return null;
}

function updateFunctionComponent(fiber: Fiber): void {
  setWipFiber(fiber);
  fiber.hooks = [];
  const children = [(fiber.type as Function)(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber: Fiber): void {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const children = Array.isArray(fiber.props.children)
    ? fiber.props.children
    : fiber.props.children != null
      ? [fiber.props.children]
      : [];
  reconcileChildren(fiber, children);
}

function reconcileChildren(wipFiber: Fiber, elements: any[]): void {
  let index = 0;
  let oldFiber: Fiber | undefined =
    wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling: Fiber | null = null;
  while (
    index < elements.length ||
    oldFiber != null
    ) {
    const element = elements[index];
    let newFiber: Fiber | null = null;
    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type;
    if (sameType && oldFiber) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      } as Fiber;
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: undefined,
        parent: wipFiber,
        alternate: undefined,
        effectTag: "PLACEMENT",
      } as Fiber;
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      wipFiber.child = newFiber!;
    } else if (element && prevSibling) {
      prevSibling.sibling = newFiber!;
    }
    prevSibling = newFiber;
    index++;
  }
}

export {
  nextUnitOfWork,
  currentRoot,
  wipRoot,
  deletions,
  commitRoot,
  workLoop,
  performUnitOfWork,
  updateFunctionComponent,
  updateHostComponent,
  reconcileChildren,
}; 