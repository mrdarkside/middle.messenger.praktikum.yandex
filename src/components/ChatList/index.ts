import Block from '../../core/Block';
import template from './chat-list.hbs';
import * as styles from './chat-list.module.scss';

import Chat from '../Chat';
import Input from '../Input';

import { submitByEnter } from '../../utils/Validation';

import arrow from '../../assets/img/arrow.png';
import chatavatar from '../../assets/img/chatavatar.png';
import Link from '../Link';
import Button from '../Button';

interface ChatListProps {
  chatList: any[];
}
export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  protected init(): void {
    this.children.addChat = new Button({
      label: 'Создать чат',
    });
    this.children.profileLink = new Link({
      isProfile: true,
      label: 'Профиль',
      to: '/profile',
    });
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
  }

  onSubmit(e: KeyboardEvent): void {
    submitByEnter(e);
  }

  render() {
    return this.compile(template, { ...this.props, styles, arrow });
  }
}
