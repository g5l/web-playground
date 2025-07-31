import { ReactElement, ComponentType } from '../types/index';

export function createElement(type: string | ComponentType<any>, props: Record<string, any>, ...children: any[]): ReactElement {
  return {
    type,
    props: {
      ...props,
      children: children
        .filter(child => child !== null && child !== undefined)
        .map(child =>
          typeof child === "object"
            ? child
            : createTextElement(child)
        ),
    },
  }
}

function createTextElement(text: string | number): ReactElement {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
} 