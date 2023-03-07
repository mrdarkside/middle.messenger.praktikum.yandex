import Block from '../../utils/Block';
import template from './loginField.hbs';
import styles from './loginField.module.scss';
import { InputName, checkOnBlur } from '../../utils/Validation';

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
    checkOnBlur(e, styles);
  }

  onBlur(e: Event) {
    checkOnBlur(e, styles);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
    });
  }
}
