import { AuthAPI } from '../api';
import { ISigninData, ISignupData, Routes } from '../types';
import { store, router } from '../core';
import { messageController } from './MessageController';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: ISigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error('Signin error', e);
    }
  }

  async signup(data: ISignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      store.setState('user.data', data);
      router.go('/profile');
    } catch (e: any) {
      console.error('Signup error', e);
    }
  }

  async fetchUser() {
    try {
      store.setState('user.isLoading', true);
      const user = await this.api.getUser();

      if (user.reason === 'Cookie is not valid') {
        store.setState('user.hasError', true);
        throw new Error('Cookie is not valid');
      }

      store.setState('user.data', user);
      store.setState('user.hasError', false);
    } catch (e) {
      store.setState('user.data', null);
      store.setState('user.hasError', true);
    } finally {
      store.setState('user.isLoading', false);
    }
  }

  async logout() {
    try {
      router.go(Routes.Index);

      await this.api.logout();

      messageController.closeAll();

      store.setState('user', null);
    } catch (e: any) {
      console.error('Logout error', e);
    }
  }
}
export const authController = new AuthController();
