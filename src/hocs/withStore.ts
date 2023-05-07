import store from '../core/Store';
import { IState, StoreEvents } from '../types';
import Block from '../core/Block';

const withStore =
  (mapStateToProps: (state: IState) => Record<string, unknown>) => (Component: typeof Block) =>
    class WithStoreComponent extends Component {
      constructor(props: Record<string, unknown>) {
        const mappedState = mapStateToProps(store.getState());

        super({ ...props, ...mappedState });

        store.on(StoreEvents.Updated, () => {
          const newMappedState = mapStateToProps(store.getState());

          this.setProps(newMappedState);
        });
      }
    };

export default withStore;
