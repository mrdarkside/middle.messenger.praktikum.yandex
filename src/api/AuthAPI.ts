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

  public async getUser(): Promise<IUser> {
    try {
      const user = (await this.http.get('/user')) as IUser;
      return user;
    } catch (error) {
      console.error('Error fetching user', error);
      throw error;
    }
  }

  public logout() {
    return this.http.post('/logout');
  }
}
