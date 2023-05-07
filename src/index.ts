import Router from './core/Router';
import authController from './controllers/AuthController';

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

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, SignInPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, MessengerPage);

  let isProtectedRoute = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await authController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (_) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
