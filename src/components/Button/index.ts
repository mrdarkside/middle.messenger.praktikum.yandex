import Block from '../../core/Block';
import template from './button.hbs';
import * as styles from './button.module.scss';

interface ButtonProps {
  type?: string;
  label: string;
  events?: {
    click: (e: Event) => void;
  };
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
