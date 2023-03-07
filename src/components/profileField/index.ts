import Block from '../../utils/Block';
import template from './profileField.hbs';
import styles from './profileField.module.scss';
import { InputName, checkOnBlur } from '../../utils/Validation';

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
    checkOnBlur(e, styles);
  }

  onBlur(e: Event) {
    checkOnBlur(e, styles);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
