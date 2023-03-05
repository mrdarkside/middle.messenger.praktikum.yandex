import Block from '../../utils/Block';
import template from './signIn.hbs';
import Button from '../../components/button';
import Input from '../../components/input';
import styles from './signIn.module.scss';

export default class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.input_login = new Input({
      type: 'text',
      label: 'Логин',
      placeholder: ' ',
      name: 'login',
    });
    this.children.input_password = new Input({
      type: 'text',
      label: 'Пароль',
      placeholder: ' ',
      name: 'password',
    });
    this.children.button = new Button({
      label: 'Авторизоваться',
      type: 'submit',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  onButtonClick() {
    console.log('button clicked');
  }
}
