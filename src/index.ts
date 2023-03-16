import Router from './utils/Router';

import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ProfilePage from './pages/Profile';
import MessengerPage from './pages/Messenger';

enum Routes {
  Index = '/',
  Register = '/sign-up',
  Profile = '/profile',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');
  router.use(Routes.Index, SignInPage);
  router.use(Routes.Register, SignUpPage);
  router.use(Routes.Profile, ProfilePage);
  router.use(Routes.Messenger, MessengerPage);
  router.start();
  // router.go(Routes.Index);
});
