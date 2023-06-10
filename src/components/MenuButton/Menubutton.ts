import { Block } from '../../core';
import template from './menu-button.hbs';
import styles from './menu-button.module.scss';

interface MenuButtonProps {
  type?: string;
  label?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class MenuButton extends Block<MenuButtonProps> {
  constructor(props: MenuButtonProps) {
    super({ type: 'button', ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
