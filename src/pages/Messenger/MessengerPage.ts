import { Block, store } from '../../core';
import template from './messenger.hbs';
import * as styles from './messenger.module.scss';

import { ChatList, RoundButton, Input, PopupInput } from '../../components';
import { submitByEnter, submitButton, submitForm, scrollToBottom } from '../../utils';
import { chatController } from '../../controllers';
import { withStore } from '../../hocs';

import avatar from '../../assets/img/chatavatar.png';
import menu from '../../assets/img/menu.png';
import clip from '../../assets/img/clip.png';
import forward from '../../assets/img/forward.png';
import { IChat, IMessage, StoreEvents } from '../../types';
import { messageController } from '../../controllers/MessageController';

class MessengerPageBase extends Block {
  protected currentChat: IChat | null = null;
  protected currentMessages: IMessage[] = [];
  constructor(props: any) {
    super({ ...props });
    chatController.getChats();
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  protected init(): void {
    this.children.chatList = new ChatList({
      chatList: this.props.chats,
      activeChatId: this.props.activeChatId,
      openAddChat: this.onOpenAddChat,
      events: {
        click: (e: Event) => this.onChatClick(e),
      },
    });
    this.children.addChatPopup = new PopupInput({
      id: 'addChat',
      title: 'Создать новый чат',
      formId: 'addChatForm',
      label: 'Имя чата',
      buttonText: 'Создать',
      onSubmit: (e: Event) => this.onAddChatSubmit(e),
    });
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

  protected componentDidUpdate() {
    scrollToBottom(styles.wrapper);
    if (this.props.activeChatId && this.props.chatList.length) {
      this.currentChat = this.props.chatList.find(
        (chat: IChat) => chat.id === this.props.activeChatId,
      );
    }
    if (this.props.activeChatId && this.props.messages) {
      this.currentMessages = this.props.messages[this.props.activeChatId];
    }
    return true;
  }

  onChatClick(e: Event): void {
    e.preventDefault();
    const chat = (e.target as HTMLElement)?.closest('article');
    if (chat && chat.dataset.id) {
      chatController.setActiveChat(Number(chat.dataset.id));
    }
  }

  onEnterSubmit(e: KeyboardEvent): void {
    const { value } = submitByEnter(e);
    if (value) {
      messageController.sendMessage(this.props.activeChatId, value);
    }
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    const { value } = submitButton(e);
    if (value) {
      messageController.sendMessage(this.props.activeChatId, value);
    }
  }

  onOpenAddChat(e: Event): void {
    e.preventDefault();

    const el = document.getElementById('addChat');
    if (el) {
      el.toggleAttribute('active');
      el.addEventListener('click', (ev: MouseEvent) => {
        ev.stopPropagation();
        if (ev.target === el) {
          el.removeAttribute('active');
        }
      });
    }
  }

  onAddChatSubmit(e: Event): void {
    const { title } = submitForm(e, 'addChatForm', styles);

    if (title) {
      chatController.createChat(title);
    }
  }
  render() {
    return this.compile(template, {
      ...this.props,
      styles,
      avatar,
      menu,
      clip,
      forward,
      currentChat: this.currentChat,
      currentMessages: this.currentMessages,
    });
  }
}

const withChats = withStore((state) => ({
  activeChatId: state.activeChatId,
  chatList: state.chats,
  messages: state.messages,
  user: state.user.data,
}));

export const MessengerPage = withChats(MessengerPageBase);
