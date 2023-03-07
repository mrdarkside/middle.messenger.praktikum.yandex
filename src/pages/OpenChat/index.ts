import Block from '../../utils/Block';
import template from './openchat.hbs';
import styles from './openchat.module.scss';

import Nav from '../../components/nav';
import ChatList from '../../components/ChatList';

import avatar from '../../img/chatavatar.png';
import menu from '../../img/menu.png';
import clip from '../../img/clip.png';
import forward from '../../img/forward.png';

export default class OpenChat extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.nav = new Nav();
    this.children.chatList = new ChatList();
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
      avatar,
      menu,
      clip,
      forward,
    });
  }
}
