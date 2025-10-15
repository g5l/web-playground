import Vibe from '../vibe';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'add':
      return state + (action.payload ?? 0);
    default:
      return state;
  }
}

export function ReducerCounter() {
  const [state, dispatch] = Vibe.useReducer(reducer, 1);
  return (
    <div>
      <h1>Reducer Count: {state}</h1>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'add', payload: 5 })}>+5</button>
    </div>
  );
}

