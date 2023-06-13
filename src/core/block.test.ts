// eslint-disable-next-line max-classes-per-file
import type { SinonFakeTimers } from 'sinon';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import type { Block as BlockType } from './Block';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { Block: BLock } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { Block: typeof BlockType };

describe('Block', () => {
  let timers: SinonFakeTimers | null = null;
  const fakeMethods = {
    render: sinon.fake(),
    init: sinon.fake(),
    mounted: sinon.fake(),
    updated: sinon.fake(),
  };

  beforeEach(() => {
    timers = sinon.useFakeTimers();
  });

  afterEach(() => {
    timers?.restore();
    Object.values(fakeMethods).forEach((fakeMethod) => {
      fakeMethod.resetHistory();
    });
  });

  class MockEventBusComponent extends BLock {
    constructor(props) {
      super({ ...props });
    }
  }

  it('should fire init event on initialization', () => {
    // eslint-disable-next-line no-new
    new MockEventBusComponent({});

    expect(eventBusMock.emit.calledWith('init')).equal(true);
  });
  it('should fire component-did-mount event on dispatchComponentDidMount', () => {
    const cmp = new MockEventBusComponent({});
    cmp.dispatchComponentDidMount();
    expect(eventBusMock.emit.calledWith('flow:component-did-mount')).equal(true);
  });
  it('should fire component-did-update event on set props', () => {
    const cmp = new MockEventBusComponent({ test: 123 });
    cmp.setProps({ test: 321 });
    expect(eventBusMock.emit.calledWith('flow:component-did-update')).equal(true);
  });
  it('should set props on setProps', () => {
    const newPropsValue = 321;
    const cmp = new MockEventBusComponent({ test: 123 });
    cmp.setProps({ test: newPropsValue });
    // @ts-ignore
    expect(cmp.props.test).equal(newPropsValue);
  });
});
