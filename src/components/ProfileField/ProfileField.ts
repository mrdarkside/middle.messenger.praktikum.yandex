import { Block } from '../../core';
import template from './profile-field.hbs';
import styles from './profile-field.module.scss';

import { InputName, checkOnBlur } from '../../utils';

import { Input } from '..';

interface ProfileFieldProps {
  name: InputName;
  type: string;
  label: string;
  placeholder?: string;
  value?: string;
  readonly?: boolean;
}

export class ProfileField extends Block<ProfileFieldProps> {
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
      value: this.props.value,
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
