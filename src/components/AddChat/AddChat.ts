import { Block, store } from '../../core';
import template from './add-chat.hbs';
import styles from './add-chat.module.scss';

import { Button, LoginField } from '..';

interface AddChatProps {
  title: string;
  formId: string;
  addChatPopup: boolean;
  onSubmit: (e: Event) => void;
}

export class AddChat extends Block<AddChatProps> {
  constructor(props: AddChatProps) {
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

  protected componentDidUpdate() {
    if (this.props.addChatPopup) {
      document.addEventListener('keydown', this.handleEscape);
    } else {
      document.removeEventListener('keydown', this.handleEscape);
    }
    return true;
  }

  handleEscape(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === 'Escape') {
      store.setState('addChatPopup', false);
    }
  }
  onSubmit(e: Event) {
    e.preventDefault();
    this.props.onSubmit(e);
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
