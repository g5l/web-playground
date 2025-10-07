import { Counter } from '@components/Counter';
import { TodoList } from '@components/TodoList';
import { LocalObservableExample } from '@components/LocalObservableExample';
import { AsyncExample } from '@components/AsyncExample';

export default function App() {
  return (
    <div className="container">
      <h1>React + MobX POC</h1>
      <p className="subtitle">Simple examples showing real usage.</p>

      <section>
        <h2>Counter</h2>
        <Counter />
      </section>

      <section>
        <h2>Todos</h2>
        <TodoList />
      </section>

      <section>
        <h2>Local Observable</h2>
        <LocalObservableExample />
      </section>

      <section>
        <h2>Async Action</h2>
        <AsyncExample />
      </section>
    </div>
  );
}

