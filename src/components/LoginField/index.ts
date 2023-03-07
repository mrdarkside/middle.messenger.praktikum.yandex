import Block from '../../utils/Block';
import template from './loginField.hbs';
import styles from './loginField.module.scss';
import { validateInput, InputName } from '../../utils/Validation';

import Input from '../Input';

interface LoginFiledProps {
  type: string;
  label: string;
  placeholder: string;
  name: InputName;
}

export default class LoginField extends Block<LoginFiledProps> {
  constructor(props: LoginFiledProps) {
    super({ ...props });
  }

  protected init(): void {
    this.children.input = new Input({
      type: this.props.type,
      label: this.props.label,
      placeholder: this.props.placeholder,
      name: this.props.name,
      style: styles.input,
      events: {
        focus: (e: Event) => this.onFocus(e),
        blur: (e: Event) => this.onBlur(e),
      },
    });
  }

  onFocus(e: Event) {
    const input = e.target as HTMLInputElement;
    const error = input.parentElement!.children[2] as HTMLElement;

    input.classList.remove(styles.input_error);
    error.innerText = '';

    if (input.value === '') {
      input.classList.add(styles.input_error);
      error.innerText = 'Поле не должно быть пустым';
      return;
    }

    if (!validateInput(input.name as InputName, input.value)) {
      input.classList.add(styles.input_error);
      error.innerText = 'Неверное значение';
    }
  }

  onBlur(e: Event) {
    const input = e.target as HTMLInputElement;
    const error = input.parentElement!.children[2] as HTMLElement;

    input.classList.remove(styles.input_error);
    error.innerText = '';

    if (input.value === '') {
      input.classList.add(styles.input_error);
      error.innerText = 'Поле не должно быть пустым';
      return;
    }

    if (!validateInput(input.name as InputName, input.value)) {
      input.classList.add(styles.input_error);
      error.innerText = 'Неверное значение';
    }
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
    });
  }
}
