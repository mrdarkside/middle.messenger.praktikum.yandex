import Block from '../../utils/Block';
import template from './signup.hbs';
import styles from './signup.module.scss';

import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Link from '../../components/Link';
import LoginField from '../../components/LoginField';

import { formSubmit } from '../../utils/Validation';

export default class SignUpPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.nav = new Nav();
    this.children.email = new LoginField({
      type: 'email',
      label: 'Почта',
      placeholder: ' ',
      name: 'email',
    });
    this.children.login = new LoginField({
      type: 'text',
      label: 'Логин',
      placeholder: ' ',
      name: 'login',
    });
    this.children.first_name = new LoginField({
      type: 'text',
      label: 'Имя',
      placeholder: ' ',
      name: 'first_name',
    });
    this.children.second_name = new LoginField({
      type: 'text',
      label: 'Фамилия',
      placeholder: ' ',
      name: 'second_name',
    });
    this.children.phone = new LoginField({
      type: 'phone',
      label: 'Телефон',
      placeholder: ' ',
      name: 'phone',
    });
    this.children.password = new LoginField({
      type: 'password',
      label: 'Пароль',
      placeholder: ' ',
      name: 'password',
    });
    this.children.confirm_password = new LoginField({
      type: 'password',
      label: 'Пароль(еще раз)',
      placeholder: ' ',
      name: 'confirm_password',
    });
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e!),
      },
    });
    this.children.link = new Link({
      label: 'Уже есть аккаунт?',
      href: '#',
    });
  }

  onSubmit(e: Event) {
    formSubmit(e, styles);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  onButtonClick() {
    console.log('button clicked');
  }
}
