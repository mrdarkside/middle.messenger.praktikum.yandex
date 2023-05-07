import AuthAPI, { SigninData, SignupData } from '../api/AuthAPI';
import router from '../core/Router';
import store from '../core/Store';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go('/messenger');
    } catch (e: any) {
      console.error('Signin error', e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/messenger');
    } catch (e: any) {
      console.error('Signup error', e);
    }
  }

  async fetchUser() {
    try {
      store.set('isLoading', true);
      const user = await this.api.getUser();

      store.set('user.data', user);
      store.set('isLoading', false);
    } catch (e: any) {
      store.set('user.hasError', true);
      console.error('Fetch user error', e);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      store.set('user', null);

      router.go('/');
    } catch (e: any) {
      console.error('Logout error', e);
    }
  }
}
const authController = new AuthController();
export default authController;
