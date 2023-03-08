import Block from '../../utils/Block';
import template from './500.hbs';
import Nav from '../../components/Nav';
import Error from '../../components/Error';

export default class Error500 extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.nav = new Nav();
    this.children.error = new Error({
      code: 500,
      message: 'Мы уже фиксим',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
