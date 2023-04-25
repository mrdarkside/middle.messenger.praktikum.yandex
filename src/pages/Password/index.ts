import Block from '../../utils/Block';
import template from './password.hbs';
import * as styles from './password.module.scss';

import ProfileField from '../../components/ProfileField';
import Button from '../../components/Button';

import { formSubmit } from '../../utils/Validation';

import icon from '../../img/back.png';
import avatar from '../../img/profile_pic.png';

interface PasswordProps {
  icon: ImageBitmap;
  avatar: ImageBitmap;
}

export default class Password extends Block<PasswordProps> {
  constructor(props: PasswordProps) {
    super({ ...props });
  }

  init() {
    this.children.old_password = new ProfileField({
      name: 'old_password',
      type: 'password',
      label: 'Старый пароль',
      placeholder: '•••••••••',
      readonly: false,
    });
    this.children.password = new ProfileField({
      name: 'password',
      type: 'password',
      label: 'Новый пароль',
      placeholder: '•••••••••',
      readonly: false,
    });
    this.children.confirm_password = new ProfileField({
      name: 'confirm_password',
      type: 'password',
      label: 'Повторите новый пароль',
      placeholder: '•••••••••',
      readonly: false,
    });
    this.children.button = new Button({
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e!),
      },
    });
  }

  onSubmit(e: Event) {
    formSubmit(e, styles);
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    return this.compile(template, { ...this.props, styles, icon, avatar });
  }
}
