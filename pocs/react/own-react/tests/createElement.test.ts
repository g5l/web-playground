import { createElement } from '../src/createElement';

describe('createElement', () => {
  test('creates element with just type', () => {
    const element = createElement('div', null);

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
    const element = createElement('h1', null, 'Hello World');

    expect(element.type).toBe('h1');
    expect(element.props.children).toHaveLength(1);
    expect(element.props.children[0].type).toBe('TEXT_ELEMENT');
    expect(element.props.children[0].props.nodeValue).toBe('Hello World');
  });

  test('creates element with number children', () => {
    const element = createElement('span', null, 42);

    expect(element.props.children[0].type).toBe('TEXT_ELEMENT');
    expect(element.props.children[0].props.nodeValue).toBe('42');
  });

  test('creates element with multiple children', () => {
    const element = createElement('div', null, 'Hello', ' ', 'World');

    expect(element.props.children).toHaveLength(3);
    expect(element.props.children[0].props.nodeValue).toBe('Hello');
    expect(element.props.children[1].props.nodeValue).toBe(' ');
    expect(element.props.children[2].props.nodeValue).toBe('World');
  });

  test('creates element with nested elements', () => {
    const childElement = createElement('span', null, 'Child');
    const element = createElement('div', null, childElement);

    expect(element.props.children).toHaveLength(1);
    expect(element.props.children[0]).toBe(childElement);
    expect(element.props.children[0].type).toBe('span');
  });

  test('creates complex nested structure', () => {
    const element = createElement('div', { id: 'container' },
      createElement('h1', null, 'Title'),
      createElement('p', null, 'This is a paragraph with ',
        createElement('strong', null, 'bold text')
      )
    );

    expect(element.type).toBe('div');
    expect(element.props.id).toBe('container');
    expect(element.props.children).toHaveLength(2);

    // Check h1
    expect(element.props.children[0].type).toBe('h1');
    expect(element.props.children[0].props.children[0].props.nodeValue).toBe('Title');

    // Check p with nested strong
    expect(element.props.children[1].type).toBe('p');
    expect(element.props.children[1].props.children).toHaveLength(2);
    expect(element.props.children[1].props.children[1].type).toBe('strong');
  });

  test('filters out null and undefined children', () => {
    const element = createElement('div', null, 'Hello', null, undefined, 'World');

    expect(element.props.children).toHaveLength(2);
    expect(element.props.children[0].props.nodeValue).toBe('Hello');
    expect(element.props.children[1].props.nodeValue).toBe('World');
  });

  test('handles empty props correctly', () => {
    const element = createElement('div', null, 'content');

    expect(element.props.children).toHaveLength(1);
    expect(Object.keys(element.props).length).toBe(1); // Only children
  });

  test('handles function components', () => {
    const MyComponent = () => createElement('div', null, 'Component content');
    const element = createElement(MyComponent, { prop: 'value' });

    expect(element.type).toBe(MyComponent);
    expect(element.props.prop).toBe('value');
  });
});
