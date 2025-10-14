import Vibe from './vibe';

function Counter() {
  const [state, setState] = Vibe.useState(1);
  return Vibe.createElement(
    'h1',
    { onClick: () => setState((c: number) => c + 1) },
    'Count: ',
    state
  );
}

const element = Vibe.createElement(Counter, {});
const container = document.getElementById('root');
if (container) {
  Vibe.render(element, container);
}

