import Block from '../../core/Block';
import template from './signIn.hbs';
import * as styles from './signIn.module.scss';

import Button from '../../components/Button';
import LoginField from '../../components/LoginField';

import { submitForm } from '../../utils/Validation';
import Link from '../../components/Link';
import authController from '../../controllers/AuthController';

export default class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.input_login = new LoginField({
      type: 'text',
      label: 'Логин',
      placeholder: ' ',
      name: 'login',
    });
    this.children.input_password = new LoginField({
      type: 'password',
      label: 'Пароль',
      placeholder: ' ',
      name: 'password',
    });
    this.children.button = new Button({
      label: 'Авторизоваться',
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e),
      },
    });
    this.children.link = new Link({
      isLogin: true,
      to: '/sign-up',
      label: 'Нет аккаунта?',
    });
  }

  onSubmit(e: Event) {
    const { login, password } = submitForm(e, styles);

    if (login && password) {
      authController.signin({ login, password });
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
