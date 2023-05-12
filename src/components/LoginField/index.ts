import Block from '../../core/Block';
import template from './login-field.hbs';
import * as styles from './login-field.module.scss';
import { InputName, checkOnBlur } from '../../utils/Validation';

import Input from '../Input';
import authController from '../../controllers/AuthController';

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
    authController.fetchUser();
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
