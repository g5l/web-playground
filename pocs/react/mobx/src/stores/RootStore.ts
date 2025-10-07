eimport { CounterStore } from './counterStore';
import { TodoStore } from './todoStore';

export class RootStore {
  counter: CounterStore;
  todos: TodoStore;

  constructor() {
    this.counter = new CounterStore(this);
    this.todos = new TodoStore(this);
  }
}

export type Stores = RootStore;

