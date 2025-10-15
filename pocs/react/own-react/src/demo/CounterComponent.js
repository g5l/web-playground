import Vibe from '../vibe';

export function Counter() {
  const [state, setState] = Vibe.useState(1);
  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  );
}

