import { Fiber } from '../types/index';

export function createDom(fiber: Fiber): HTMLElement | Text {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type as string)

  updateDom(dom, {}, fiber.props)

  return dom
}

export function updateDom(
  dom: HTMLElement | Text,
  prevProps: Record<string, any> = {},
  nextProps: Record<string, any> = {}
): void {
  prevProps = prevProps || {}
  nextProps = nextProps || {}
  const isEvent = (key: string) => key.startsWith("on")
  const isProperty = (key: string) => key !== "children" && !isEvent(key)
  const isNew = (prev: Record<string, any>, next: Record<string, any>) => (key: string) => prev[key] !== next[key]
  const isGone = (next: Record<string, any>) => (key: string) => !(key in next)

  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })

  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach(name => {
      (dom as any)[name] = ""
    })

  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      (dom as any)[name] = nextProps[name]
    })

  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })
}

export function commitDeletion(fiber: Fiber, domParent: HTMLElement | Text): void {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else if (fiber.child) {
    commitDeletion(fiber.child, domParent)
  }
} 