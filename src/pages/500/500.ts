import { Block } from '../../core';
import template from './500.hbs';

import { Error } from '../../components';

export class Error500 extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.error = new Error({
      code: 500,
      message: 'Мы уже фиксим',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
