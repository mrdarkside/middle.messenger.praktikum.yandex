import { IState } from '../types';
import EventBus from './EventBus';
import { set } from '../utils/helpers';

const initialState: IState = {
  user: {
    data: null,
    isLoading: false,
    hasError: false,
  },
  chats: [],
  activeChatId: null,
};

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  #state: IState = initialState;

  public setState(keypath: string, value: unknown) {
    set(this.#state, keypath, value);
    this.emit(StoreEvents.Updated, this.getState());
    console.log('store updated', this.getState());
  }

  public getState() {
    return this.#state;
  }
}

const store = new Store();

export default store;
