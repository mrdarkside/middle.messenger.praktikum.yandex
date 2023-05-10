import Router from './core/Router';
import authController from './controllers/AuthController';

import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ProfilePage from './pages/Profile';
import MessengerPage from './pages/Messenger';
import store from './core/Store';

enum Routes {
  Index = '/',
  Login = '/sign-in',
  Register = '/sign-up',
  Profile = '/profile',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, SignInPage)
    .use(Routes.Login, SignInPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, MessengerPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Login:
    case Routes.Register:
      isProtectedRoute = false;
      break;
    default:
      isProtectedRoute = true;
      break;
  }

  try {
    await authController.fetchUser();
    if (store.getState().user.hasError) {
      throw new Error('user has error');
    }
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    console.log(e);

    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
