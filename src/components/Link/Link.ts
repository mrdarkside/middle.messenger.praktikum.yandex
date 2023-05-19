import { Block } from '../../core';
import template from './link.hbs';
import * as styles from './link.module.scss';

import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  isLogin?: boolean;
  isProfile?: boolean;
  isBackIcon?: boolean;
  href?: string;
  events?: {
    click: (e: Event) => void;
  };
}

class LinkClass extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => this.navigate(e),
      },
    });
  }

  navigate(e: Event) {
    e.preventDefault();
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(LinkClass);
