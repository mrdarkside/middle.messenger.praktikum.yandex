import { Block } from '../../core';
import template from './popup-input.hbs';
import styles from './popup-input.module.scss';

import { Button, LoginField } from '..';

interface PopupInputProps {
  id: string;
  title: string;
  formId: string;
  label: string;
  buttonText: string;
  value?: string;
  onSubmit: (e: Event) => void;
}

export class PopupInput extends Block<PopupInputProps> {
  constructor(props: PopupInputProps) {
    super({ ...props });
  }

  init() {
    this.children.input = new LoginField({
      type: 'text',
      label: this.props.label,
      placeholder: ' ',
      name: 'title',
      value: this.props.value,
    });
    this.children.addChatButton = new Button({
      label: this.props.buttonText,
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e),
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.props.onSubmit(e);
    this.makeNotActive();
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
