import Block from '../../core/Block';
import template from './popup.hbs';
import styles from './popup.module.scss';

interface PopupProps {
  title: string;
}

export default class Popup extends Block<PopupProps> {
  constructor(props: PopupProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
