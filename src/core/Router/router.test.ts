import sinon from 'sinon';
import { expect } from 'chai';
import { router } from './Router';
import { BlockConstructable } from './types';
import { Routes } from '../../types';

describe('Router', () => {
  const originalBack = global.window.history.back;
  const originalForward = global.window.history.forward;

  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
    global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  beforeEach(() => {
    router.use(Routes.Index, BlockMock);
    router.use(Routes.Login, BlockMock);

    router.start();
  });

  after(() => {
    global.window.history.back = originalBack;
    global.window.history.forward = originalForward;
  });

  it('use() should return router instance', () => {
    const result = router.use(Routes.Index, BlockMock);

    expect(result).to.eq(router);
  });

  it('should render a page on history back action', () => {
    router.back();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('should render a page on history forward action', () => {
    router.forward();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('should change history state', () => {
    router.go(Routes.Login);

    expect(window.history.length).to.eq(2);
  });
});
