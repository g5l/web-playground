export interface ReactElement {
  type: string | Function;
  props: Record<string, any>;
  key?: string | number;
}

export function createElement(
  type: string | Function,
  props: Record<string, any> | null,
  ...children: any[]
): ReactElement {
  const processedChildren = children
    .flat()
    .filter(child => child !== null && child !== undefined)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return createTextElement(child);
      }
      return child;
    });

  return {
    type,
    props: {
      ...(props || {}),
      children: processedChildren
    }
  };
}

function createTextElement(text: string | number): ReactElement {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text.toString(),
      children: []
    }
  };
}

// Example: create a VNode for <div>Hello World</div>
import { VNodeImpl } from './vdom';
import { Props } from './types';

export function createHelloWorldVNode(): VNodeImpl {
  return new VNodeImpl('div', { children: [] } as Props, undefined, [
    new VNodeImpl('TEXT_ELEMENT', { nodeValue: 'Hello World', children: [] } as Props)
  ]);
}