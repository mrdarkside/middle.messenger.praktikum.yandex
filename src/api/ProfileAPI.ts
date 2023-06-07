import BaseAPI from './BaseAPI';
import { IProfileData, IPasswordData } from '../types';

export class ProfileAPI extends BaseAPI {
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
    return this.http.put('/profile/avatar', data, {
      multipart: 'form-data',
    });
  }
}
