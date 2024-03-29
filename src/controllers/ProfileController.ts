import { ProfileAPI } from '../api';
import { store } from '../core';
import { IPasswordData, IProfileData } from '../types';

class ProfileController {
  private api: ProfileAPI;

  constructor() {
    this.api = new ProfileAPI();
  }

  async updateProfile(profile: IProfileData) {
    await this.api.update(profile);
    store.getState();
  }

  async changePassword(data: IPasswordData) {
    await this.api.changePassword(data);
  }

  async changeAvatar(data: FormData) {
    const userData = await this.api.changeAvatar(data);
    store.setState('user.data', userData);
  }
}

export const profileController = new ProfileController();
