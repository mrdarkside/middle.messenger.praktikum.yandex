import { Block, store } from '../../core';
import template from './messenger.hbs';
import * as styles from './messenger.module.scss';

import { ChatList, RoundButton, Input, PopupInput, MenuButton, MenuPopup } from '../../components';
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
    this.children.addUser = new PopupInput({
      id: 'addUser',
      title: 'Добавить пользователя по ID',
      formId: 'addUserForm',
      label: 'ID пользователя',
      buttonText: 'Добавить',
      onSubmit: (e: Event) => this.onAddUserSubmit(e),
    });
    this.children.deleteUser = new PopupInput({
      id: 'deleteUser',
      title: 'Удалить пользователя по ID',
      formId: 'deleteUserForm',
      label: 'ID пользователя',
      buttonText: 'Удалить',
      onSubmit: (e: Event) => this.onDeleteUserSubmit(e),
    });
    this.children.input = new Input({
      name: 'message',
      type: 'text',
      placeholder: '',
      style: styles.message,
      events: {
        keydown: (e) => this.onEnterMsgSubmit(e),
      },
    });
    this.children.round_button = new RoundButton({
      type: 'submit',
      events: {
        click: (e) => this.onButtonMsgSubmit(e),
      },
    });
    this.children.menuButton = new MenuButton({
      events: {
        click: (e) => this.onOpenMenu(e),
      },
    });
    this.children.menuPopup = new MenuPopup({
      id: 'menu',
      events: {
        click: (e) => this.onMenuClick(e),
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

  onOpenMenu(e: Event): void {
    e.preventDefault();
    document.querySelector('#menu')?.toggleAttribute('active');
  }

  onMenuClick(e: Event): void {
    e.preventDefault();

    const popup = document.querySelector('#menu');
    if (e.target !== popup) {
      popup?.removeAttribute('active');
    }

    const el = e.target as HTMLElement;
    switch (el.id) {
      case 'add':
        this.addUser(e, 'addUser');
        break;
      case 'delete':
        this.deleteUser(e, 'deleteUser');
        break;
      case 'deleteChat':
        chatController.deleteChat(this.props.activeChatId);
        break;
      default:
        break;
    }
  }

  addUser(e: Event, id: string): void {
    this.onOpenModal(e, id);
  }

  deleteUser(e: Event, id: string): void {
    this.onOpenModal(e, id);
  }

  onChatClick(e: Event): void {
    e.preventDefault();
    const chat = (e.target as HTMLElement)?.closest('article');
    if (chat && chat.dataset.id) {
      chatController.setActiveChat(Number(chat.dataset.id));
    }
  }

  onEnterMsgSubmit(e: KeyboardEvent): void {
    const { value } = submitByEnter(e);
    if (value) {
      messageController.sendMessage(this.props.activeChatId, value);
    }
  }

  onButtonMsgSubmit(e: Event): void {
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

  onOpenModal(e: Event, id: string): void {
    e.preventDefault();

    const el = document.getElementById(`${id}`);

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

  onAddUserSubmit(e: Event): void {
    const { title } = submitForm(e, 'addUserForm', styles);
    console.log(title);

    if (title) {
      chatController.addUserToChat(this.props.activeChatId, +title);
    }
  }

  onDeleteUserSubmit(e: Event): void {
    const { title } = submitForm(e, 'deleteUserForm', styles);

    if (title) {
      chatController.removeUserFromChat(this.props.activeChatId, +title);
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
