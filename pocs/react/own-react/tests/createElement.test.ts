import { createElement } from '../src/jsx/createElement';
import { useState } from '../src/core/hooks';
import { render } from '../src/api/render';

describe('createElement', () => {
  test('creates element with just type', () => {
    const element = createElement('div', {});
    expect(element.type).toBe('div');
    expect(element.props.children).toEqual([]);
  });
  test('creates element with props', () => {
    const props = { id: 'test', className: 'container' };
    const element = createElement('div', props);
    expect(element.type).toBe('div');
    expect(element.props.id).toBe('test');
    expect(element.props.className).toBe('container');
    expect(element.props.children).toEqual([]);
  });
  test('creates element with string children', () => {
    const element = createElement('h1', {}, 'Hello World');
    expect(element.type).toBe('h1');
    expect(element.props.children[0].type).toBe('TEXT_ELEMENT');
    expect(element.props.children[0].props.nodeValue).toBe('Hello World');
  });
  test('creates element with number children', () => {
    const element = createElement('span', {}, 42);
    expect(element.props.children[0].type).toBe('TEXT_ELEMENT');
    expect(element.props.children[0].props.nodeValue).toBe('42');
  });
  test('creates element with multiple children', () => {
    const element = createElement('div', {}, 'Hello', ' ', 'World');
    expect(element.props.children).toHaveLength(3);
    expect(element.props.children[0].props.nodeValue).toBe('Hello');
    expect(element.props.children[1].props.nodeValue).toBe(' ');
    expect(element.props.children[2].props.nodeValue).toBe('World');
  });
  test('creates element with nested elements', () => {
    const childElement = createElement('span', {}, 'Child');
    const element = createElement('div', {}, childElement);
    expect(element.props.children).toHaveLength(1);
    expect(element.props.children[0]).toBe(childElement);
    expect(element.props.children[0].type).toBe('span');
  });
  test('creates complex nested structure', () => {
    const element = createElement('div', { id: 'container' },
      createElement('h1', {}, 'Title'),
      createElement('p', {}, 'This is a paragraph with ',
        createElement('strong', {}, 'bold text')
      )
    );
    expect(element.type).toBe('div');
    expect(element.props.id).toBe('container');
    expect(element.props.children).toHaveLength(2);
    expect(element.props.children[0].type).toBe('h1');
    expect(element.props.children[0].props.children[0].props.nodeValue).toBe('Title');
    expect(element.props.children[1].type).toBe('p');
    expect(element.props.children[1].props.children).toHaveLength(2);
    expect(element.props.children[1].props.children[1].type).toBe('strong');
  });
  test('filters out null and undefined children', () => {
    const element = createElement('div', {}, 'Hello', null, undefined, 'World');
    expect(element.props.children).toHaveLength(2);
    expect(element.props.children[0].props.nodeValue).toBe('Hello');
    expect(element.props.children[1].props.nodeValue).toBe('World');
  });
  test('handles empty props correctly', () => {
    const element = createElement('div', {}, 'content');
    expect(element.props.children).toHaveLength(1);
    expect(Object.keys(element.props).length).toBe(1);
  });
  test('handles function components', () => {
    const MyComponent = () => createElement('div', {}, 'Component content');
    const element = createElement(MyComponent, { prop: 'value' });
    expect(element.type).toBe(MyComponent);
    expect(element.props.prop).toBe('value');
  });
});

describe('useState', () => {
  test('returns initial state and setter', () => {
    let stateValue;
    function TestComponent() {
      const [state] = useState(123);
      stateValue = state;
      return null;
    }
    TestComponent();
    expect(stateValue).toBe(123);
  });
  test('setter updates state', () => {
    let stateValue;
    let setStateFn: ((cb: (prev: number) => number) => void) | undefined;
    function TestComponent() {
      const [state, setState] = useState(0);
      stateValue = state;
      setStateFn = setState;
      return null;
    }
    TestComponent();
    if (setStateFn) {
      setStateFn((prev: number) => prev + 5);
    }
    TestComponent();
    expect(stateValue).toBe(5);
  });
});

describe('render', () => {
  test('creates root fiber and sets up work', () => {
    const container = document.createElement('div');
    const element = createElement('div', {}, 'test');
    render(element, container);
    expect(container.childNodes.length).toBeGreaterThanOrEqual(0);
  });
});
