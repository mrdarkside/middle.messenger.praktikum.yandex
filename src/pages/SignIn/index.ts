import Block from '../../utils/Block';
import template from './signIn.hbs';
import Nav from '../../components/nav';
import Button from '../../components/button';
import styles from './signIn.module.scss';
import LoginField from '../../components/LoginField';

export default class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.nav = new Nav();
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
        click: (e) => this.onSubmit(e!),
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const login = document.getElementById('login') as HTMLInputElement;
    console.log(login?.value);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
