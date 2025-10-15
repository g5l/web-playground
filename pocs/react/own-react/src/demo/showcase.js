import Vibe from '../vibe';
import { Counter } from './CounterComponent';
import { ReducerCounter } from './ReducerCounter';

function Showcase() {
  return (
    <div>
      <h2>Showcase</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div>
          <h3>useState Counter</h3>
          <Counter />
        </div>
        <div>
          <h3>useReducer Counter</h3>
          <ReducerCounter />
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('showcase');
if (container) {
  Vibe.render(<Showcase />, container);
}

