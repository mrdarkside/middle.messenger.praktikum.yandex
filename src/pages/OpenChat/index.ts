import Block from '../../utils/Block';
import template from './openchat.hbs';
import * as styles from './openchat.module.scss';

import Nav from '../../components/nav';
import ChatList from '../../components/chatList';
import RoundButton from '../../components/roundButton';

import { submitByEnter, buttonSubmit } from '../../utils/Validation';

import avatar from '../../img/chatavatar.png';
import menu from '../../img/menu.png';
import clip from '../../img/clip.png';
import forward from '../../img/forward.png';
import Input from '../../components/input';
import hasselblad from '../../img/hasselblad.png';

export default class OpenChat extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.nav = new Nav();
    this.children.chatList = new ChatList();
    this.children.input = new Input({
      name: 'message',
      type: 'text',
      placeholder: '',
      style: styles.message,
      events: {
        keydown: (e) => this.onEnterSubmit(e),
      },
    });
    this.children.round_button = new RoundButton({
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e),
      },
    });
  }

  onEnterSubmit(e: KeyboardEvent): void {
    submitByEnter(e);
  }

  onSubmit(e: Event): void {
    buttonSubmit(e);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
      avatar,
      menu,
      clip,
      forward,
      hasselblad,
    });
  }
}
