import AuthAPI from '../api/AuthAPI';
import { ISigninData, ISignupData } from '../types/index';
import router from '../core/Router';
import store from '../core/Store';

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
        throw new Error('Cookie is not valid');
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
const authController = new AuthController();
export default authController;
