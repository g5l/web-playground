import { ReactElement, ReactNode, Props, ComponentType, VNode, ReactKey } from './types';

// VNode Types - extending your existing structure
export const VNODE_TYPES = {
  ELEMENT: 'ELEMENT',
  TEXT_ELEMENT: 'TEXT_ELEMENT',
  COMPONENT: 'COMPONENT'
} as const;

export type VNodeType = typeof VNODE_TYPES[keyof typeof VNODE_TYPES];

// VNode implementation class that implements the VNode interface
export class VNodeImpl implements VNode {
  type: string | ComponentType<any>;
  props: Props;
  key?: ReactKey;
  children: VNode[];
  dom?: HTMLElement | Text;
  parent?: VNode;

  constructor(
    type: string | ComponentType<any>,
    props: Props = {},
    key?: ReactKey,
    children: VNode[] = []
  ) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.children = children;
    this.dom = undefined;
    this.parent = undefined;
  }

  // Check if this VNode represents a text element
  isTextElement(): boolean {
    return this.type === 'TEXT_ELEMENT';
  }

  // Check if this VNode represents a DOM element
  isElement(): boolean {
    return typeof this.type === 'string' && this.type !== 'TEXT_ELEMENT';
  }

  // Check if this VNode represents a component
  isComponent(): boolean {
    return typeof this.type === 'function';
  }
}

// Factory function to create VNode from ReactElement
export function createVNode(
  reactElement: ReactElement,
  parent?: VNode
): VNode {
  const vnode = new VNodeImpl(
    reactElement.type,
    reactElement.props,
    reactElement.key
  );

  if (parent) {
    vnode.parent = parent;
  }

  // Process children from ReactElement
  if (reactElement.props.children) {
    vnode.children = processChildren(reactElement.props.children, vnode);
  }

  return vnode;
}

// Helper function to process children
function processChildren(children: any, parent: VNode): VNode[] {
  const result: VNode[] = [];

  const childrenArray = Array.isArray(children) ? children : [children];

  for (const child of childrenArray) {
    if (child === null || child === undefined) {
      continue;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      const textVNode = new VNodeImpl('TEXT_ELEMENT', {
        nodeValue: child.toString(),
        children: []
      });
      textVNode.parent = parent;
      result.push(textVNode);
    } else if (isReactElement(child)) {
      const childVNode = createVNode(child, parent);
      result.push(childVNode);
    }
  }

  return result;
}

// Utility Functions for VNode Manipulation

/**
 * Check if a value is a ReactElement
 */
export function isReactElement(element: any): element is ReactElement {
  return element && typeof element === 'object' && element.type !== undefined;
}

/**
 * Convert ReactElement tree to VNode tree
 */
export function reactElementToVNode(
  reactElement: ReactElement,
  parent?: VNode
): VNode {
  if (!isReactElement(reactElement)) {
    throw new Error('Invalid ReactElement provided');
  }

  return createVNode(reactElement, parent);
}

/**
 * Get all children of a VNode recursively
 */
export function getAllChildren(vnode: VNode): VNode[] {
  if (!vnode || !vnode.children) return [];

  const result: VNode[] = [];
  for (const child of vnode.children) {
    result.push(child);
    result.push(...getAllChildren(child));
  }
  return result;
}

/**
 * Find a child VNode by key
 */
export function findChildByKey(
  parent: VNode,
  key: ReactKey
): VNode | null {
  if (!parent || !parent.children) return null;

  return parent.children.find(child => child.key === key) || null;
}

/**
 * Find all VNodes with a specific key in the tree
 */
export function findAllByKey(root: VNode, key: ReactKey): VNode[] {
  const result: VNode[] = [];

  function traverse(node: VNode): void {
    if (node.key === key) {
      result.push(node);
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(root);
  return result;
}

/**
 * Clone a VNode (shallow copy)
 */
export function cloneVNode(
  vnode: VNode,
  newProps: Partial<Props> = {}
): VNode | null {
  if (!vnode) return null;

  const mergedProps: Props = { ...vnode.props, ...newProps };

  const cloned = new VNodeImpl(
    vnode.type,
    mergedProps,
    vnode.key,
    vnode.children // Shallow copy of children
  );

  cloned.parent = vnode.parent;
  cloned.dom = vnode.dom;

  return cloned;
}

/**
 * Deep clone a VNode and all its children
 */
export function deepCloneVNode(vnode: VNode): VNode | null {
  if (!vnode) return null;

  const clonedChildren = vnode.children.map(child => deepCloneVNode(child)).filter(Boolean) as VNode[];

  const cloned = new VNodeImpl(
    vnode.type,
    { ...vnode.props },
    vnode.key,
    clonedChildren
  );

  // Update parent references in cloned children
  clonedChildren.forEach(child => {
    if (child) {
      child.parent = cloned;
    }
  });

  return cloned;
}

/**
 * Convert VNode to a readable string (for debugging)
 */
export function vnodeToString(vnode: VNode, indent: number = 0): string {
  if (!vnode) return '';

  const spaces = ' '.repeat(indent);

  if (vnode.isTextElement()) {
    return `${spaces}"${vnode.props.nodeValue}"`;
  }

  if (vnode.isComponent()) {
    const componentName = typeof vnode.type === 'function' ? vnode.type.name || 'Component' : 'Component';
    return `${spaces}<${componentName} {...props} />`;
  }

  if (vnode.isElement()) {
    const propsEntries = Object.entries(vnode.props)
      .filter(([key]) => key !== 'children')
      .map(([key, value]) => `${key}="${value}"`);

    const propsStr = propsEntries.length > 0 ? ' ' + propsEntries.join(' ') : '';

    if (!vnode.children || vnode.children.length === 0) {
      return `${spaces}<${vnode.type}${propsStr} />`;
    }

    const childrenStr = vnode.children
      .map(child => vnodeToString(child, indent + 2))
      .join('\n');

    return `${spaces}<${vnode.type}${propsStr}>\n${childrenStr}\n${spaces}</${vnode.type}>`;
  }

  return `${spaces}[Unknown VNode Type]`;
}

/**
 * Walk through VNode tree and execute callback for each node
 */
export function walkVNodeTree(
  vnode: VNode,
  callback: (node: VNode) => void
): void {
  if (!vnode) return;

  callback(vnode);

  if (vnode.children) {
    vnode.children.forEach(child => walkVNodeTree(child, callback));
  }
}

/**
 * Get the depth of a VNode in the tree
 */
export function getVNodeDepth(vnode: VNode): number {
  let depth = 0;
  let current: VNode | undefined = vnode;

  while (current && current.parent) {
    depth++;
    current = current.parent;
  }

  return depth;
}

/**
 * Check if two VNodes are of the same type (can be updated)
 */
export function isSameVNodeType(a: VNode | null, b: VNode | null): boolean {
  if (!a || !b) return false;

  return a.type === b.type && a.key === b.key;
}

/**
 * Create a text VNode
 */
export function createTextVNode(text: string | number): VNode {
  return new VNodeImpl('TEXT_ELEMENT', {
    nodeValue: text.toString(),
    children: []
  });
}

/**
 * Create an element VNode
 */
export function createElementVNode(
  type: string,
  props: Props = {},
  ...children: VNode[]
): VNode {
  const vnode = new VNodeImpl(type, props, props.key, children);

  // Set parent references
  children.forEach(child => {
    if (child) {
      child.parent = vnode;
    }
  });

  return vnode;
}

/**
 * Check if a VNode has children
 */
export function hasChildren(vnode: VNode): boolean {
  return vnode.children && vnode.children.length > 0;
}

/**
 * Get the first child of a VNode
 */
export function getFirstChild(vnode: VNode): VNode | null {
  return vnode.children && vnode.children.length > 0 ? vnode.children[0] : null;
}

/**
 * Get the last child of a VNode
 */
export function getLastChild(vnode: VNode): VNode | null {
  return vnode.children && vnode.children.length > 0
    ? vnode.children[vnode.children.length - 1]
    : null;
}

/**
 * Get siblings of a VNode
 */
export function getSiblings(vnode: VNode): VNode[] {
  if (!vnode.parent) return [];

  return vnode.parent.children.filter(child => child !== vnode);
}

/**
 * Get the next sibling of a VNode
 */
export function getNextSibling(vnode: VNode): VNode | null {
  if (!vnode.parent) return null;

  const siblings = vnode.parent.children;
  const index = siblings.indexOf(vnode);

  return index !== -1 && index < siblings.length - 1 ? siblings[index + 1] : null;
}

/**
 * Get the previous sibling of a VNode
 */
export function getPreviousSibling(vnode: VNode): VNode | null {
  if (!vnode.parent) return null;

  const siblings = vnode.parent.children;
  const index = siblings.indexOf(vnode);

  return index > 0 ? siblings[index - 1] : null;
}