import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class CounterStore {
  private root: RootStore;
  count = 0;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get double() {
    return this.count * 2;
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  reset() {
    this.count = 0;
  }
}

