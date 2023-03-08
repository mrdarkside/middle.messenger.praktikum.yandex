import Block from '../../utils/Block';
import template from './404.hbs';
import Nav from '../../components/nav';
import Error from '../../components/error';

export default class Error404 extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.nav = new Nav();
    this.children.error = new Error({
      code: 404,
      message: 'Не туда попали',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
