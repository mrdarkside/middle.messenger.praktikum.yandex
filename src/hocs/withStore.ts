/* eslint-disable @typescript-eslint/indent */
import store, { StoreEvents } from '../core/Store';
import { IState } from '../types';
import Block from '../core/Block';
import { isEqual } from '../utils/helpers';

const withStore = (mapStateToProps: (state: IState) => any) => (Component: typeof Block) => {
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

export default withStore;
