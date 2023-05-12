import Block from '../../core/Block';
import Link from '../Link';
import template from './error.hbs';
import * as styles from './error.module.scss';

interface ErrorProps {
  code: number;
  message: string;
}

export default class Error extends Block<ErrorProps> {
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
