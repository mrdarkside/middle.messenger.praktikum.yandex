/* eslint-disable @typescript-eslint/indent */
import { store, Block } from '../core';
import { IState, StoreEvents } from '../types';
import { isEqual } from '../utils';

export const withStore = (mapStateToProps: (state: IState) => any) => (Component: typeof Block) => {
  let mappedState: any;
  return class WithStoreComponent extends Component {
    constructor(props: any) {
      mappedState = mapStateToProps(store.getState());

      super({ ...props, ...mappedState });

      store.on(StoreEvents.Updated, (newState) => {
        const newMappedState = mapStateToProps(newState);

        if (isEqual(mappedState, newMappedState)) return;

        mappedState = { ...newMappedState };
        this.setProps({ ...this.props, ...mappedState });
      });
    }
  };
};
