import { IUser, ISignupData, ISigninData } from '../types';
import BaseAPI from './BaseAPI';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signup(data: ISignupData) {
    return this.http.post('/signup', data);
  }

  public signin(data: ISigninData) {
    return this.http.post('/signin', data);
  }

  public async getUser() {
    try {
      const response = await this.http.get('/user');
      const user = JSON.parse(response as string) as IUser;
      return user;
    } catch (error) {
      console.error('Error fetching user', error);
      throw error;
    }
  }

  public logout() {
    return this.http.post('/logout');
  }

  // mute abstract CRUD methods
  create = undefined;
  delete = undefined;
  read = undefined;
  update = undefined;
}
