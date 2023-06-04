import { Block } from '../../core';
import template from './button.hbs';
import * as styles from './button.module.scss';

interface ButtonProps {
  type?: string;
  label: string;
  isLogout?: boolean;
  events?: {
    click: (e: Event) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
