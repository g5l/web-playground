import {
  VNodeImpl,
  createVNode,
  reactElementToVNode,
  isReactElement,
  getAllChildren,
  findChildByKey,
  findAllByKey,
  cloneVNode,
  deepCloneVNode,
  vnodeToString,
  walkVNodeTree,
  getVNodeDepth,
  isSameVNodeType,
  createTextVNode,
  createElementVNode,
  hasChildren,
  getFirstChild,
  getLastChild,
  getSiblings,
  getNextSibling,
  getPreviousSibling,
  VNODE_TYPES
} from '../src/vdom';
import { ReactElement, VNode, ComponentType, Props } from '../src/types';

// Mock createElement to match your existing implementation
const createElement = (
  type: string | ComponentType<any>,
  props: Props | null,
  ...children: any[]
): ReactElement => {
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
    },
    key: props?.key
  };
};

const createTextElement = (text: string | number): ReactElement => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text.toString(),
    children: []
  }
});

describe('VNode', () => {
  describe('VNodeImpl constructor and basic properties', () => {
    test('creates VNode from basic parameters', () => {
      const vnode = new VNodeImpl('div', { id: 'test' }, 'key1');

      expect(vnode.type).toBe('div');
      expect(vnode.props.id).toBe('test');
      expect(vnode.key).toBe('key1');
      expect(vnode.children).toEqual([]);
      expect(vnode.dom).toBeUndefined();
      expect(vnode.parent).toBeUndefined();
    });

    test('creates VNode with default props', () => {
      const vnode = new VNodeImpl('div');

      expect(vnode.type).toBe('div');
      expect(vnode.props).toEqual({});
      expect(vnode.key).toBeUndefined();
      expect(vnode.children).toEqual([]);
    });

    test('creates VNode with children', () => {
      const child1 = new VNodeImpl('span');
      const child2 = new VNodeImpl('p');
      const vnode = new VNodeImpl('div', {}, undefined, [child1, child2]);

      expect(vnode.children).toHaveLength(2);
      expect(vnode.children[0]).toBe(child1);
      expect(vnode.children[1]).toBe(child2);
    });
  });

  describe('VNode type checking methods', () => {
    test('isTextElement returns true for text elements', () => {
      const vnode = new VNodeImpl('TEXT_ELEMENT', { nodeValue: 'Hello' });

      expect(vnode.isTextElement()).toBe(true);
      expect(vnode.isElement()).toBe(false);
      expect(vnode.isComponent()).toBe(false);
    });

    test('isElement returns true for DOM elements', () => {
      const vnode = new VNodeImpl('div');

      expect(vnode.isElement()).toBe(true);
      expect(vnode.isTextElement()).toBe(false);
      expect(vnode.isComponent()).toBe(false);
    });

    test('isComponent returns true for function components', () => {
      const MyComponent: ComponentType = () => createElement('div', null);
      const vnode = new VNodeImpl(MyComponent);

      expect(vnode.isComponent()).toBe(true);
      expect(vnode.isElement()).toBe(false);
      expect(vnode.isTextElement()).toBe(false);
    });
  });

  describe('createVNode factory function', () => {
    test('creates VNode from ReactElement', () => {
      const element = createElement('div', { id: 'test' });
      const vnode = createVNode(element);

      expect(vnode).toBeInstanceOf(VNodeImpl);
      expect(vnode.type).toBe('div');
      expect(vnode.props.id).toBe('test');
    });

    test('creates VNode with parent reference', () => {
      const parentElement = createElement('div', null);
      const childElement = createElement('span', null);
      const parentVNode = createVNode(parentElement);
      const childVNode = createVNode(childElement, parentVNode);

      expect(childVNode.parent).toBe(parentVNode);
    });

    test('processes children correctly', () => {
      const element = createElement('div', null, 'Hello', 'World');
      const vnode = createVNode(element);

      expect(vnode.children).toHaveLength(2);
      expect(vnode.children[0].isTextElement()).toBe(true);
      expect(vnode.children[0].props.nodeValue).toBe('Hello');
      expect(vnode.children[1].isTextElement()).toBe(true);
      expect(vnode.children[1].props.nodeValue).toBe('World');
    });
  });

  describe('isReactElement utility', () => {
    test('returns true for valid ReactElement', () => {
      const element = createElement('div', null);
      expect(isReactElement(element)).toBe(true);
    });

    test('returns false for non-ReactElement values', () => {
      expect(isReactElement(null)).toBe(false);
      expect(isReactElement(undefined)).toBe(false);
      expect(isReactElement('string')).toBe(false);
      expect(isReactElement(42)).toBe(false);
      expect(isReactElement({})).toBe(false);
      expect(isReactElement({ type: undefined })).toBe(false);
    });
  });

  describe('reactElementToVNode conversion', () => {
    test('converts simple ReactElement to VNode', () => {
      const element = createElement('div', { id: 'test' }, 'Hello');
      const vnode = reactElementToVNode(element);

      expect(vnode).toBeInstanceOf(VNodeImpl);
      expect(vnode.type).toBe('div');
      expect(vnode.props.id).toBe('test');
      expect(vnode.children).toHaveLength(1);
      expect(vnode.children[0].isTextElement()).toBe(true);
    });

    test('converts nested ReactElement structure', () => {
      const element = createElement('div', null,
        createElement('h1', null, 'Title'),
        createElement('p', null, 'Paragraph')
      );
      const vnode = reactElementToVNode(element);

      expect(vnode.children).toHaveLength(2);
      expect(vnode.children[0].type).toBe('h1');
      expect(vnode.children[1].type).toBe('p');
      expect(vnode.children[0].parent).toBe(vnode);
      expect(vnode.children[1].parent).toBe(vnode);
    });

    test('throws error for invalid ReactElement', () => {
      expect(() => reactElementToVNode('not an element' as any)).toThrow('Invalid ReactElement provided');
    });
  });

  describe('tree traversal utilities', () => {
    test('getAllChildren returns all descendant VNodes', () => {
      const element = createElement('div', null,
        createElement('h1', null, 'Title'),
        createElement('section', null,
          createElement('p', null, 'Paragraph'),
          createElement('span', null, 'Span')
        )
      );
      const vnode = reactElementToVNode(element);
      const allChildren = getAllChildren(vnode);

      expect(allChildren).toHaveLength(6); // h1, section, p, span, and 2 text nodes
    });

    test('getAllChildren returns empty array for VNode without children', () => {
      const vnode = new VNodeImpl('div');
      const allChildren = getAllChildren(vnode);

      expect(allChildren).toEqual([]);
    });

    test('findChildByKey finds direct child by key', () => {
      const element = createElement('div', null,
        createElement('h1', { key: 'title' }, 'Title'),
        createElement('p', { key: 'paragraph' }, 'Paragraph')
      );
      const vnode = reactElementToVNode(element);
      const foundChild = findChildByKey(vnode, 'title');

      expect(foundChild).toBeTruthy();
      expect(foundChild!.type).toBe('h1');
      expect(foundChild!.key).toBe('title');
    });

    test('findChildByKey returns null when key not found', () => {
      const element = createElement('div', null,
        createElement('h1', { key: 'title' }, 'Title')
      );
      const vnode = reactElementToVNode(element);
      const foundChild = findChildByKey(vnode, 'nonexistent');

      expect(foundChild).toBeNull();
    });

    test('findAllByKey finds all VNodes with key in tree', () => {
      const element = createElement('div', null,
        createElement('h1', { key: 'shared' }, 'Title'),
        createElement('section', null,
          createElement('p', { key: 'shared' }, 'Paragraph')
        )
      );
      const vnode = reactElementToVNode(element);
      const foundNodes = findAllByKey(vnode, 'shared');

      expect(foundNodes).toHaveLength(2);
      expect(foundNodes[0].type).toBe('h1');
      expect(foundNodes[1].type).toBe('p');
    });

    test('walkVNodeTree executes callback for each VNode', () => {
      const element = createElement('div', null,
        createElement('h1', null, 'Title'),
        createElement('p', null, 'Paragraph')
      );
      const vnode = reactElementToVNode(element);
      const visitedTypes: (string | ComponentType<any>)[] = [];

      walkVNodeTree(vnode, (node) => {
        visitedTypes.push(node.type);
      });

      expect(visitedTypes).toEqual(['div', 'h1', 'TEXT_ELEMENT', 'p', 'TEXT_ELEMENT']);
    });

    test('getVNodeDepth calculates correct depth', () => {
      const element = createElement('div', null,
        createElement('section', null,
          createElement('p', null, 'Deep paragraph')
        )
      );
      const vnode = reactElementToVNode(element);
      const deepestVNode = vnode.children[0].children[0].children[0]; // text node

      expect(getVNodeDepth(vnode)).toBe(0);
      expect(getVNodeDepth(vnode.children[0])).toBe(1);
      expect(getVNodeDepth(vnode.children[0].children[0])).toBe(2);
      expect(getVNodeDepth(deepestVNode)).toBe(3);
    });
  });

  describe('VNode cloning utilities', () => {
    test('cloneVNode creates shallow copy', () => {
      const element = createElement('div', { id: 'original' });
      const vnode = reactElementToVNode(element);
      const cloned = cloneVNode(vnode, { className: 'new-class' });

      expect(cloned).not.toBe(vnode);
      expect(cloned!.type).toBe('div');
      expect(cloned!.props.id).toBe('original');
      expect(cloned!.props.className).toBe('new-class');
    });

    test('deepCloneVNode creates deep copy', () => {
      const element = createElement('div', null,
        createElement('h1', null, 'Title')
      );
      const vnode = reactElementToVNode(element);
      const cloned = deepCloneVNode(vnode);

      expect(cloned).not.toBe(vnode);
      expect(cloned!.children[0]).not.toBe(vnode.children[0]);
      expect(cloned!.type).toBe(vnode.type);
      expect(cloned!.children[0].type).toBe(vnode.children[0].type);
      expect(cloned!.children[0].parent).toBe(cloned);
    });

    test('cloneVNode returns null for null input', () => {
      const cloned = cloneVNode(null);
      expect(cloned).toBe(null);
    });

    test('deepCloneVNode returns null for null input', () => {
      const cloned = deepCloneVNode(null);
      expect(cloned).toBe(null);
    });
  });

  describe('isSameVNodeType utility', () => {
    test('returns true for same type and key', () => {
      const vnode1 = new VNodeImpl('div', {}, 'test');
      const vnode2 = new VNodeImpl('div', {}, 'test');

      expect(isSameVNodeType(vnode1, vnode2)).toBe(true);
    });

    test('returns true for same type with no keys', () => {
      const vnode1 = new VNodeImpl('div');
      const vnode2 = new VNodeImpl('div');

      expect(isSameVNodeType(vnode1, vnode2)).toBe(true);
    });

    test('returns false for different types', () => {
      const vnode1 = new VNodeImpl('div');
      const vnode2 = new VNodeImpl('span');

      expect(isSameVNodeType(vnode1, vnode2)).toBe(false);
    });

    test('returns false for different keys', () => {
      const vnode1 = new VNodeImpl('div', {}, 'key1');
      const vnode2 = new VNodeImpl('div', {}, 'key2');

      expect(isSameVNodeType(vnode1, vnode2)).toBe(false);
    });

    test('returns false for null inputs', () => {
      const vnode = new VNodeImpl('div');

      expect(isSameVNodeType(vnode, null)).toBe(false);
      expect(isSameVNodeType(null, vnode)).toBe(false);
      expect(isSameVNodeType(null, null)).toBe(false);
    });
  });

  describe('factory functions', () => {
    test('createTextVNode creates text VNode', () => {
      const textVNode = createTextVNode('Hello World');

      expect(textVNode.isTextElement()).toBe(true);
      expect(textVNode.props.nodeValue).toBe('Hello World');
    });

    test('createTextVNode handles number input', () => {
      const textVNode = createTextVNode(42);

      expect(textVNode.isTextElement()).toBe(true);
      expect(textVNode.props.nodeValue).toBe('42');
    });

    test('createElementVNode creates element VNode', () => {
      const child1 = createTextVNode('Hello');
      const child2 = createTextVNode('World');
      const elementVNode = createElementVNode('div', { id: 'test' }, child1, child2);

      expect(elementVNode.isElement()).toBe(true);
      expect(elementVNode.type).toBe('div');
      expect(elementVNode.props.id).toBe('test');
      expect(elementVNode.children).toHaveLength(2);
      expect(elementVNode.children[0].parent).toBe(elementVNode);
      expect(elementVNode.children[1].parent).toBe(elementVNode);
    });
  });

  describe('tree navigation utilities', () => {
    let rootVNode: VNode;

    beforeEach(() => {
      const element = createElement('div', null,
        createElement('h1', { key: 'title' }, 'Title'),
        createElement('section', null,
          createElement('p', null, 'Paragraph'),
          createElement('span', null, 'Span')
        ),
        createElement('footer', null, 'Footer')
      );
      rootVNode = reactElementToVNode(element);
    });

    test('hasChildren returns correct boolean', () => {
      expect(hasChildren(rootVNode)).toBe(true);
      expect(hasChildren(rootVNode.children[0])).toBe(true); // h1 has text child
      expect(hasChildren(new VNodeImpl('div'))).toBe(false);
    });

    test('getFirstChild returns first child', () => {
      const firstChild = getFirstChild(rootVNode);
      expect(firstChild).toBeTruthy();
      expect(firstChild!.type).toBe('h1');
    });

    test('getFirstChild returns null for childless node', () => {
      const emptyVNode = new VNodeImpl('div');
      expect(getFirstChild(emptyVNode)).toBeNull();
    });

    test('getLastChild returns last child', () => {
      const lastChild = getLastChild(rootVNode);
      expect(lastChild).toBeTruthy();
      expect(lastChild!.type).toBe('footer');
    });

    test('getLastChild returns null for childless node', () => {
      const emptyVNode = new VNodeImpl('div');
      expect(getLastChild(emptyVNode)).toBeNull();
    });

    test('getSiblings returns all siblings', () => {
      const h1 = rootVNode.children[0];
      const siblings = getSiblings(h1);

      expect(siblings).toHaveLength(2);
      expect(siblings[0].type).toBe('section');
      expect(siblings[1].type).toBe('footer');
    });

    test('getSiblings returns empty array for root node', () => {
      const siblings = getSiblings(rootVNode);
      expect(siblings).toEqual([]);
    });

    test('getNextSibling returns next sibling', () => {
      const h1 = rootVNode.children[0];
      const nextSibling = getNextSibling(h1);

      expect(nextSibling).toBeTruthy();
      expect(nextSibling!.type).toBe('section');
    });

    test('getNextSibling returns null for last child', () => {
      const footer = rootVNode.children[2];
      const nextSibling = getNextSibling(footer);

      expect(nextSibling).toBeNull();
    });

    test('getPreviousSibling returns previous sibling', () => {
      const section = rootVNode.children[1];
      const prevSibling = getPreviousSibling(section);

      expect(prevSibling).toBeTruthy();
      expect(prevSibling!.type).toBe('h1');
    });

    test('getPreviousSibling returns null for first child', () => {
      const h1 = rootVNode.children[0];
      const prevSibling = getPreviousSibling(h1);

      expect(prevSibling).toBeNull();
    });
  });

  describe('vnodeToString debugging utility', () => {
    test('converts text element to string', () => {
      const textVNode = createTextVNode('Hello World');
      const result = vnodeToString(textVNode);

      expect(result).toBe('"Hello World"');
    });

    test('converts simple element to string', () => {
      const vnode = new VNodeImpl('div', { id: 'test' });
      const result = vnodeToString(vnode);

      expect(result).toBe('<div id="test" />');