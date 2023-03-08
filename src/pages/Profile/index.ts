import Block from '../../utils/Block';
import template from './profile.hbs';
import styles from './profile.module.scss';

import Nav from '../../components/Nav';
import ProfileField from '../../components/ProfileField';
import Link from '../../components/Link';

import icon from '../../img/back.png';
import avatar from '../../img/profile_pic.png';

interface ProfileProps {
  icon: ImageBitmap;
  avatar: ImageBitmap;
}

export default class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({ ...props });
  }

  init() {
    this.children.nav = new Nav();
    this.children.field_email = new ProfileField({
      name: 'email',
      type: 'email',
      label: 'Почта',
      placeholder: 'pochta@yandex.ru',
      readonly: true,
    });
    this.children.field_login = new ProfileField({
      name: 'login',
      type: 'text',
      label: 'Логин',
      placeholder: 'ivanivanov',
      readonly: true,
    });
    this.children.field_first_name = new ProfileField({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      placeholder: 'Иван',
      readonly: true,
    });
    this.children.field_second_name = new ProfileField({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      placeholder: 'Иванов',
      readonly: true,
    });
    this.children.field_display_name = new ProfileField({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      placeholder: 'Иван',
      readonly: true,
    });
    this.children.field_phone = new ProfileField({
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      placeholder: '+7(909)967-30-30',
      readonly: true,
    });
    this.children.link_settings = new Link({
      href: '#',
      label: 'Изменить данные',
    });
    this.children.link_password = new Link({
      href: '#',
      label: 'Изменить пароль',
    });
    this.children.link_logout = new Link({
      href: '#',
      label: 'Выйти',
      isWarning: true,
    });
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    return this.compile(template, { ...this.props, styles, icon, avatar });
  }
}
