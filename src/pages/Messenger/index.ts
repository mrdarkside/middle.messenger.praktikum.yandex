import Block from '../../core/Block';
import template from './openchat.hbs';
import * as styles from './messenger.module.scss';
import ChatList from '../../components/ChatList';
import RoundButton from '../../components/RoundButton';
import { submitByEnter, buttonSubmit } from '../../utils/Validation';
import avatar from '../../assets/img/chatavatar.png';
import menu from '../../assets/img/menu.png';
import clip from '../../assets/img/clip.png';
import forward from '../../assets/img/forward.png';
import Input from '../../components/Input';
import withStore from '../../hocs/withStore';

class MessengerPageBase extends Block {
  constructor() {
    super({});
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
    });
  }
}

const withChats = withStore((state) => ({
  chatList: state.chats,
  activeChatId: state.activeChatId,
}));

const MessengerPage = withChats(MessengerPageBase);

export default MessengerPage;
