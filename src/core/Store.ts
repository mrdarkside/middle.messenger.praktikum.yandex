import { IState, StoreEvents } from '../types';
import EventBus from './EventBus';
import { set } from '../utils/helpers';

class Store extends EventBus {
  #state: IState = { user: {} };

  public set(keypath: string, value: unknown) {
    set(this.#state, keypath, value);

    this.emit(StoreEvents.Updated, this.#state);
  }

  public getState() {
    return this.#state;
  }
}

const store = new Store();

export default store;
