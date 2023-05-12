import Block from '../../core/Block';
import Button from '../Button';
import LoginField from '../LoginField';
import template from './popup-input.hbs';
import styles from './popup-input.hbs.module.scss';

interface PopupInputProps {
  title: string;
  formId: string;
  onSubmit: (e: Event) => void;
}

export default class PopupInput extends Block<PopupInputProps> {
  constructor(props: PopupInputProps) {
    super({ ...props });
  }

  init() {
    this.children.input = new LoginField({
      type: 'text',
      label: 'Имя чата',
      placeholder: ' ',
      name: 'title',
    });
    this.children.addChatButton = new Button({
      label: 'Создать',
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e),
      },
    });
  }
  onSubmit(e: Event) {
    e.preventDefault();
    this.props.onSubmit(e);
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
