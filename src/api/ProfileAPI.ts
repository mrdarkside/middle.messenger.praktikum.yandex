import BaseAPI from './BaseAPI';
import { IProfileData, IPasswordData } from '../types';

export default class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  update(profile: IProfileData): Promise<string> {
    return this.http.put('/profile', profile);
  }

  changePassword(data: IPasswordData): Promise<string> {
    return this.http.put('/password', data);
  }

  changeAvatar(data: FormData): Promise<string> {
    return this.http.put('/profile/avatar', data, { 'Content-Type': 'multipart/form-data' });
  }

  // mute abstract CRUD methods
  create = undefined;
  delete = undefined;
  read = undefined;
}
