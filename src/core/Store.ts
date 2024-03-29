import { IState, StoreEvents } from '../types';
import { EventBus } from './EventBus';
import { set } from '../utils';

const initialState: IState = {
  user: {
    data: null,
    isLoading: false,
    hasError: false,
  },
  chats: [],
  activeChatId: null,
  messages: {},
};

class Store extends EventBus {
  #state: IState = initialState;

  public setState(keypath: string, value: unknown) {
    set(this.#state, keypath, value);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.#state;
  }
}

export const store = new Store();
