import { Block } from '../../core';
import template from './chat.hbs';
import * as styles from './chat.module.scss';

interface ChatProps {
  id: number;
  title: string;
  avatar: string | ImageBitmap;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  } | null;
}

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
