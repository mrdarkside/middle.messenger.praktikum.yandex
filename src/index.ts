import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Error404 from './pages/404';
import Error500 from './pages/500';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Password from './pages/Password';
import Messenger from './pages/Messenger';
import OpenChat from './pages/OpenChat';

// eslint-disable-next-line import/prefer-default-export
export const ROUTES: Record<string, any> = {
  home: SignInPage,
  signup: SignUpPage,
  err404: Error404,
  err500: Error500,
  profile: Profile,
  settings: Settings,
  password: Password,
  messenger: Messenger,
  openchat: OpenChat,
};

function render(Page: any) {
  const root = document.querySelector('#app');

  const content = new Page();

  root?.appendChild(content.getContent()!);
}

// @ts-ignore
window.goToPage = (path: string) => {
  const root = document.querySelector('#app');
  root?.removeChild(root.firstElementChild!);

  render(ROUTES[path]);
};

window.addEventListener('DOMContentLoaded', () => {
  render(ROUTES.openchat);
});
