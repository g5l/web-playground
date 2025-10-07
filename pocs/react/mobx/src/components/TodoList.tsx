import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@lib/StoreContext';

export const TodoList = observer(function TodoList() {
  const { todos } = useStores();
  const [title, setTitle] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    todos.addTodo(title);
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={submit} className="row" style={{ gap: 8, marginBottom: 12 }}>
        <input
          value={title}
          placeholder="Add a new todo"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <button type="submit">Add</button>
      </form>

      <div className="row" style={{ gap: 12, marginBottom: 10 }}>
        <span className="tag">remaining: {todos.remaining}</span>
        <span className="tag">completed: {todos.completed}</span>
      </div>

      <ul>
        {todos.todos.map((t) => (
          <li key={t.id}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={t.done} onChange={() => todos.toggleTodo(t.id)} />
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
            </label>
            <button onClick={() => todos.removeTodo(t.id)} className="ghost">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

