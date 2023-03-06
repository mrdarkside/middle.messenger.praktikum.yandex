import Block from '../../utils/Block';
import template from './chat.hbs';
import styles from './chat.module.scss';

interface ChatProps {
  chatavatar: ImageBitmap;
  name: string;
  text: string;
  time: string;
  unread?: number;
}

export default class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
