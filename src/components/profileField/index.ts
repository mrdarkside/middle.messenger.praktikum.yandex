import Block from '../../utils/Block';
import template from './profileField.hbs';
import styles from './profileField.module.scss';
import { validateInput, InputName } from '../../utils/Validation';

import Input from '../Input';

interface ProfileFieldProps {
  name: InputName;
  type: string;
  label: string;
  placeholder: string;
  readonly?: boolean;
}

export default class ProfileField extends Block<ProfileFieldProps> {
  constructor(props: ProfileFieldProps) {
    super({ ...props });
  }

  protected init(): void {
    this.children.input = new Input({
      type: this.props.type,
      label: this.props.label,
      placeholder: this.props.placeholder,
      name: this.props.name,
      style: styles.input,
      readonly: this.props.readonly,
      events: {
        focus: (e: Event) => this.onFocus(e),
        blur: (e: Event) => this.onBlur(e),
      },
    });
  }

  onFocus(e: Event) {
    const input = e.target as HTMLInputElement;
    const error = input.parentElement!.children[2] as HTMLElement;

    if (input.readOnly) return;

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
    } else {
      input.classList.remove(styles.input_error);
      error.innerText = '';
    }
  }

  onBlur(e: Event) {
    const input = e.target as HTMLInputElement;
    const error = input.parentElement!.children[2] as HTMLElement;

    if (input.readOnly) return;

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
    return this.compile(template, { ...this.props, styles });
  }
}
