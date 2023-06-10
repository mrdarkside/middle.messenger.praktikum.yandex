import { Block } from '../../core';
import template from './menu-popup.hbs';
import styles from './menu-popup.module.scss';

interface MenuPopupProps {
  id: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class MenuPopup extends Block<MenuPopupProps> {
  constructor(props: MenuPopupProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
