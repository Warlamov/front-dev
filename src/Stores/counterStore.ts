import { makeAutoObservable } from 'mobx';

class CounterStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public count = 0;

  public inc() {
    this.count++;
  }
}

export default new CounterStore();
