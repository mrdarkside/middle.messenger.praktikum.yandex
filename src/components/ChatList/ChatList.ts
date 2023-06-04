import { Block } from '../../core';
import template from './chat-list.hbs';
import * as styles from './chat-list.module.scss';

import { Input, Link, Button } from '..';

import { submitByEnter } from '../../utils';

import arrow from '../../assets/img/arrow.png';
import avatarPlaceholder from '../../assets/img/chatavatar.png';
import { withStore } from '../../hocs';
import { IChat } from '../../types';

interface ChatListProps {
  chatList: IChat[];
  activeChatId: string;
  openAddChat: (e: Event) => void;
  events?: {
    click: (e: Event) => void;
  };
}

export class ChatListBase extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  protected init() {
    if (this.props.chatList) {
      this.children.addChat = new Button({
        label: 'Создать чат',
        events: {
          click: (e) => this.props.openAddChat(e),
        },
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
    }
  }

  onSubmit(e: KeyboardEvent): void {
    submitByEnter(e);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
      arrow,
      avatarPlaceholder,
    });
  }
}

const withChats = withStore((state) => ({
  chatList: state.chats,
  activeChatId: state.activeChatId,
}));

export const ChatList = withChats(ChatListBase as typeof Block);
