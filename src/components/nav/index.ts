import Block from '../../utils/Block';
import template from './nav.hbs';
import styles from './nav.module.scss';

export default class Nav extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
