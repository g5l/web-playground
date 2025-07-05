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
  // Process children to handle different types
  const processedChildren = children
    .flat() // Flatten nested arrays
    .filter(child => child !== null && child !== undefined) // Remove null/undefined
    .map(child => {
      // Convert primitive values to text elements
      if (typeof child === 'string' || typeof child === 'number') {
        return createTextElement(child);
      }
      return child;
    });

  return {
    type,
    props: {
      ...(props || {}), // Spread existing props
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