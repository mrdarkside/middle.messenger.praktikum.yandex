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
import { Routes } from './types';

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
  const location = window.location.pathname;

  switch (location) {
    case Routes.Index:
    case Routes.Login:
    case Routes.Register:
      isProtectedRoute = false;
      break;
    default:
      isProtectedRoute = true;
      break;
  }

  if (Object.values(Routes).includes(location as Routes & string)) {
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
  } else {
    router.start();
    router.go(Routes.NoPage);
  }
});
