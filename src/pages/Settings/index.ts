import Block from '../../utils/Block';
import template from './settings.hbs';
import styles from './settings.module.scss';

import Nav from '../../components/nav';
import ProfileField from '../../components/profileField';
import Button from '../../components/button';

import icon from '../../img/back.png';
import avatar from '../../img/profile_pic.png';

interface SettingsProps {
  icon: ImageBitmap;
  avatar: ImageBitmap;
}

export default class Settings extends Block<SettingsProps> {
  constructor(props: SettingsProps) {
    super({ ...props });
  }

  init() {
    this.children.nav = new Nav();
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
    });
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    return this.compile(template, { ...this.props, styles, icon, avatar });
  }
}
