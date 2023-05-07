import Block from '../../core/Block';
import template from './404.hbs';
import Error from '../../components/Error';

export default class Error404 extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.error = new Error({
      code: 404,
      message: 'Не туда попали',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
