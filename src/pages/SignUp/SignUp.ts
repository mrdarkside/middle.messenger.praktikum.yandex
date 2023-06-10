import { Block } from '../../core';
import template from './signup.hbs';
import styles from './signup.module.scss';

import { Button, Link, LoginField } from '../../components';
import { submitForm } from '../../utils';
import { authController } from '../../controllers';
import { ISignupData, Routes } from '../../types';

export class SignUpPage extends Block {
  constructor() {
    super({});
  }

  init() {
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
      name: 'confirmPassword',
    });
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e!),
      },
    });
    this.children.link = new Link({
      isLogin: true,
      to: Routes.Index,
      label: 'Уже есть аккаунт?',
    });
  }
  onSubmit(e: Event) {
    const data = submitForm(e, 'form', styles);
    authController.signup(data as unknown as ISignupData);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
