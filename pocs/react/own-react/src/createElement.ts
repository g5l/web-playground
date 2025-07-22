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
  return {
    type,
    props: {
      ...(props || {}),
      children: children.flat()
    }
  };
}