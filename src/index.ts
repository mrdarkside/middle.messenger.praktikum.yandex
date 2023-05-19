import { store, router } from './core';
import { authController } from './controllers';
import {
  SignInPage,
  SignUpPage,
  ProfilePage,
  SettingsPage,
  PasswordPage,
  MessengerPage,
  Error404,
} from './pages';

enum Routes {
  Index = '/',
  Login = '/sign-in',
  Register = '/sign-up',
  Profile = '/profile',
  Settings = '/settings',
  Password = '/password',
  Messenger = '/messenger',
  NoPage = '/404',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, SignInPage)
    .use(Routes.Login, SignInPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Password, PasswordPage)
    .use(Routes.NoPage, Error404);

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
    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Profile);
    }
  } catch (_) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
