import Block from '../../core/Block';
import template from './settings.hbs';
import * as styles from './settings.module.scss';

import ProfileField from '../../components/ProfileField';
import Button from '../../components/Button';

import { submitForm } from '../../utils/Validation';

import icon from '../../img/back.png';
import avatar from '../../img/profile_pic.png';

interface SettingsProps {
  icon: ImageBitmap;
  avatar: ImageBitmap;
}

export default class SettingsPage extends Block<SettingsProps> {
  constructor(props: SettingsProps) {
    super({ ...props });
  }

  init() {
    this.children.field_email = new ProfileField({
      name: 'email',
      type: 'email',
      label: 'Почта',
      placeholder: 'pochta@yandex.ru',
      readonly: false,
    });
    this.children.field_login = new ProfileField({
      name: 'login',
      type: 'text',
      label: 'Логин',
      placeholder: 'ivanivanov',
      readonly: false,
    });
    this.children.field_first_name = new ProfileField({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      placeholder: 'Иван',
      readonly: false,
    });
    this.children.field_second_name = new ProfileField({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      placeholder: 'Иванов',
      readonly: false,
    });
    this.children.field_display_name = new ProfileField({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      placeholder: 'Иван',
      readonly: false,
    });
    this.children.field_phone = new ProfileField({
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      placeholder: '+7(909)967-30-30',
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
    submitForm(e, styles);
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    return this.compile(template, { ...this.props, styles, icon, avatar });
  }
}
