import { makeAutoObservable, runInAction } from 'mobx';
import type { RootStore } from './RootStore';

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export class TodoStore {
  private root: RootStore;
  todos: Todo[] = [];
  loading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this, {}, { autoBind: true });

    // initial todos
    this.todos = [
      { id: crypto.randomUUID(), title: 'Explore MobX docs', done: true },
      { id: crypto.randomUUID(), title: 'Wire a TodoList UI', done: false },
    ];
  }

  get remaining() {
    return this.todos.filter((t) => !t.done).length;
  }

  get completed() {
    return this.todos.filter((t) => t.done).length;
  }

  addTodo(title: string) {
    const text = title.trim();
    if (!text) return;
    this.todos.unshift({ id: crypto.randomUUID(), title: text, done: false });
  }

  toggleTodo(id: string) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.done = !todo.done;
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  async loadExamples() {
    if (this.loading) return;
    this.loading = true;
    try {
      // simulate network latency
      await new Promise((res) => setTimeout(res, 800));
      const incoming: Todo[] = [
        { id: crypto.randomUUID(), title: 'Async item A', done: false },
        { id: crypto.randomUUID(), title: 'Async item B', done: false },
      ];
      runInAction(() => {
        this.todos = [...incoming, ...this.todos];
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

