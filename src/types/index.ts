export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  display_name: string;
  reason?: string;
}

export interface IChat {
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
  };
}

export interface IState {
  user: {
    data: IUser | null;
    isLoading: boolean;
    hasError: boolean;
  };
  chats: IChat[];
  activeChatId: number | null;
  messages: Record<number, IMessage[]>;
}

export enum StoreEvents {
  Updated = 'updated',
}

export interface ISigninData {
  login: string;
  password: string;
}

export interface ISignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
export interface IProfileData {
  first_name: 'string';
  second_name: 'string';
  display_name: 'string';
  login: 'string';
  email: 'string';
  phone: 'string';
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export enum WSTransportEvents {
  Connected = 'Connected',
  Close = 'Close',
  Error = 'Error',
  Message = 'Message',
}

export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
  mine?: boolean;
}
