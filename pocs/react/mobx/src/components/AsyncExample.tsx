import { observer } from 'mobx-react-lite';
import { useStores } from '@lib/StoreContext';

export const AsyncExample = observer(function AsyncExample() {
  const { todos } = useStores();

  return (
    <div className="row" style={{ gap: 8 }}>
      <button onClick={todos.loadExamples} disabled={todos.loading}>
        {todos.loading ? 'Loading…' : 'Load sample todos'}
      </button>
      <span className="tag">total: {todos.todos.length}</span>
    </div>
  );
});

