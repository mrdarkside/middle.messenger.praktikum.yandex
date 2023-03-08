import Block from '../../utils/Block';
import template from './messenger.hbs';
import styles from './messenger.module.scss';

import Nav from '../../components/Nav';
import ChatList from '../../components/chatList';

export default class Messenger extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.nav = new Nav();
    this.children.chatList = new ChatList();
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
