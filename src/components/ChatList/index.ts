import Block from '../../utils/Block';
import template from './chat-list.hbs';
import styles from './chat-list.module.scss';

import Chat from '../chat';
import Input from '../input';

import { submitByEnter } from '../../utils/Validation';

import arrow from '../../img/arrow.png';
import chatavatar from '../../img/chatavatar.png';

export default class ChatList extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.search = new Input({
      type: 'text',
      name: 'search',
      placeholder: '',
      style: styles.input,
      events: {
        keydown: (e) => this.onSubmit(e),
      },
    });
    this.children.chat = new Chat({
      name: 'Андрей',
      text: 'Изображение',
      time: '10:49',
      unread: 2,
      chatavatar,
    });
    this.children.chat1 = new Chat({
      name: 'Киноклуб',
      text: 'Стикер',
      time: '12:00',
      chatavatar,
    });
    this.children.chat2 = new Chat({
      name: 'Илья',
      text: 'Друзья, у меня для вас особенный выпуск новостей!...',
      time: '10:49',
      unread: 4,
      chatavatar,
    });
    this.children.chat3 = new Chat({
      name: 'тет-а-теты',
      text: 'И Human Interface Guidelines и Material Design рекомендуют...',
      time: '10:49',
      chatavatar,
    });
    this.children.chat4 = new Chat({
      name: 'Design Destroyer',
      text: 'В 2008 году художник Jon Rafman  начал собирать...',
      time: '10:49',
      chatavatar,
    });
    this.children.chat5 = new Chat({
      name: 'Day.',
      text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
      time: '10:49',
      chatavatar,
    });
  }

  onSubmit(e: KeyboardEvent): void {
    submitByEnter(e);
  }

  render() {
    return this.compile(template, { ...this.props, styles, arrow });
  }
}
