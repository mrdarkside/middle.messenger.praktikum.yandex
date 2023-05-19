import { Block, store } from '../../core';
import template from './openchat.hbs';
import * as styles from './messenger.module.scss';

import { ChatList, RoundButton, Input, PopupInput } from '../../components';
import { submitByEnter, submitButton, submitForm } from '../../utils';
import { chatController } from '../../controllers';
import { withStore } from '../../hocs';

import avatar from '../../assets/img/chatavatar.png';
import menu from '../../assets/img/menu.png';
import clip from '../../assets/img/clip.png';
import forward from '../../assets/img/forward.png';

class MessengerPageBase extends Block {
  constructor(props: any) {
    super({ ...props });
    chatController.getChats();
  }

  protected init(): void {
    this.children.chatList = new ChatList({
      chatList: this.props.chats,
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
    this.children.addChatPopup = new PopupInput({
      title: 'Создать новый чат',
      formId: 'addChatForm',
      onSubmit: (e) => this.onAddChatSubmit(e),
    });
  }

  onEnterSubmit(e: KeyboardEvent): void {
    submitByEnter(e);
  }

  onSubmit(e: Event): void {
    submitButton(e);
  }

  onAddChatSubmit(e: Event): void {
    const { title } = submitForm(e, 'addChatForm', styles);
    console.log(title);
    console.log(this.props);

    if (title) {
      chatController.createChat(title);
    }
    store.getState();
    this.setProps(store.getState());
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

const withChats = withStore((state) => ({
  chatList: state.chats,
  activeChatId: state.activeChatId,
}));

export const MessengerPage = withChats(MessengerPageBase);
