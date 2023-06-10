import { Block } from '../../core';
import template from './signIn.hbs';
import styles from './signIn.module.scss';

import { Button, LoginField, Link } from '../../components';
import { submitForm } from '../../utils';
import { authController } from '../../controllers';
import { Routes } from '../../types';

export class SignInPage extends Block {
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
      to: Routes.Register,
      label: 'Нет аккаунта?',
    });
  }

  onSubmit(e: Event) {
    const { login, password } = submitForm(e, 'form', styles);

    if (login && password) {
      authController.signin({ login, password });
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
