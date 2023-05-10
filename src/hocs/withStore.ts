/* eslint-disable @typescript-eslint/indent */
import store from '../core/Store';
import { IState, StoreEvents } from '../types';
import Block from '../core/Block';
import { isEqual } from '../utils/helpers';

const withStore =
  <P extends object>(mapStateToProps: (state: Partial<IState>) => P) =>
  (Component: typeof Block<P>) => {
    let mappedState: P;
    return class WithStoreComponent extends Component {
      constructor(props: P) {
        mappedState = mapStateToProps(store.getState());
        console.log(store.getState());

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
