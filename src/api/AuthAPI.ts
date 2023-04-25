import BaseAPI from './BaseAPI';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  getUser() {
    return this.http.get<User>('/user');
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
