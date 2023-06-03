import { AuthAPI } from '../api';
import { ISigninData, ISignupData } from '../types';
import { store, router } from '../core';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: ISigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go('/profile');
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
        // router.go('/');
        throw new Error('Cookie is not valid');
        store.setState('user.hasError', true);
        return;
      }

      store.setState('user.data', user);
      store.setState('user.isLoading', false);
      store.setState('user.hasError', false);
    } catch (e) {
      store.setState('user.data', null);
      store.setState('user.isLoading', false);
      store.setState('user.hasError', true);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      store.setState('user', null);

      router.go('/');
    } catch (e: any) {
      console.error('Logout error', e);
    }
  }
}
export const authController = new AuthController();
