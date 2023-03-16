import Block from '../../utils/Block';
import template from './messenger.hbs';
import * as styles from './messenger.module.scss';

import Nav from '../../components/nav';
import ChatList from '../../components/ChatList';

export default class MessengerPage extends Block {
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
