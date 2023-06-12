import { expect } from 'chai';
import sinon from 'sinon';
import { LinkClass } from './Link';
import { Router } from '../../core/Router/Router';
import { Routes } from '../../types';

describe('Link component', () => {
  const to = Routes.Index;
  const label = 'Home';
  const callback = sinon.stub();
  const router = { go: callback } as unknown as Router;

  beforeEach(() => {
    callback.reset();
  });

  it('should render', () => {
    // eslint-disable-next-line no-new
    new LinkClass({ to, label, router: {} as Router });
  });

  it('should render passed label', () => {
    const link = new LinkClass({ to: Routes.Index, label, router });

    expect(link.element?.textContent).to.include(label);
  });

  it('should call router.go with passed route on click', () => {
    const link = new LinkClass({
      to: Routes.Index,
      label,
      router: { go: callback } as unknown as Router,
    });

    link.element?.click();

    expect(callback.calledWith(Routes.Index)).to.eq(true);
  });
});
