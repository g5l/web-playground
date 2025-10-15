import Vibe from '../vibe';

function CounterCE() {
  const [state, setState] = Vibe.useState(1);
  return Vibe.createElement(
    'h1',
    {onClick: () => setState((c) => c + 1)},
    'Count: ',
    state
  );
}

const element = Vibe.createElement(CounterCE, {});
const container = document.getElementById('createElement');
Vibe.render(element, container);

