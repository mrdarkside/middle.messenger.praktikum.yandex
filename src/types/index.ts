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
}

export enum StoreEvents {
  Updated = 'updated',
}

export interface IState {
  user: {
    data: IUser | null;
    isLoading: boolean;
    hasError: boolean;
  };
  chats: any[];
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
