import { Block } from '../../core';
import template from './error.hbs';
import * as styles from './error.module.scss';

import { Link } from '..';

interface ErrorProps {
  code: number;
  message: string;
}

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super({ ...props });
  }

  init() {
    this.children.link = new Link({
      label: 'Вернуться на главную',
      to: '/messenger',
    });
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
