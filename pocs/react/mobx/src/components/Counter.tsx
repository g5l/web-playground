import { observer } from 'mobx-react-lite';
import { useStores } from '@lib/StoreContext';

export const Counter = observer(function Counter() {
  const { counter } = useStores();

  return (
    <div className="row" style={{ gap: 12 }}>
      <button onClick={counter.decrement} className="ghost">-1</button>
      <strong style={{ minWidth: 40, textAlign: 'center' }}>{counter.count}</strong>
      <button onClick={counter.increment}>+1</button>
      <button onClick={counter.reset} className="ghost">Reset</button>
      <span className="spacer" />
      <span className="tag">double: {counter.double}</span>
    </div>
  );
});

