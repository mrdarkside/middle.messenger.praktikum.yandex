import { IUser } from '../types';
import BaseAPI from './BaseAPI';

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

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: ISignupData) {
    return this.http.post('/signup', data);
  }

  signin(data: ISigninData) {
    return this.http.post('/signin', data);
  }

  getUser() {
    return this.http.get<IUser>('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  // mute abstract CRUD methods
  create = undefined;
  delete = undefined;
  read = undefined;
  update = undefined;
}
