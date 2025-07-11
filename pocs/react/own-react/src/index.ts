import { render } from './render';
import { createHelloWorldVNode } from './createElement';

const root = document.getElementById('root');
if (root) {
  render(createHelloWorldVNode(), root);
} else {
  throw new Error('Root container not found');
} 