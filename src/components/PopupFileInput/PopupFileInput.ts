import { Block } from '../../core';
import template from './popup-file-input.hbs';
import styles from './popup-file-input.module.scss';

import { Button, FileInput } from '..';

interface PopupFileInputProps {
  id?: string;
  title: string;
  inputId: string;
  formId: string;
  buttonText: string;
  onSubmit: (e: Event) => boolean;
}

export class PopupFileInput extends Block<PopupFileInputProps> {
  constructor(props: PopupFileInputProps) {
    super({ ...props });
  }

  init() {
    this.children.input = new FileInput({
      name: 'avatar',
      id: this.props.inputId,
      label: 'Выбрать файл на компьютере',
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
    const uploaded = this.props.onSubmit(e);
    if (uploaded) this.makeNotActive();
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
