import Vibe from './vibe';

const element = Vibe.createElement('div', {id: 'root'}, 'Hello World');
const container = document.getElementById("root");

Vibe.render(element, container);