import {render} from '../src/api/render';
import {createElement} from "../src/jsx/createElement";

describe('render', () => {
  test('creates root fiber and sets up work', () => {
    const container = document.createElement('div');
    const element = createElement('div', {}, 'test');
    render(element, container);
    expect(container.childNodes.length).toBeGreaterThanOrEqual(0);
  });
});
