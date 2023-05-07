import Block from '../../core/Block';
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

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
