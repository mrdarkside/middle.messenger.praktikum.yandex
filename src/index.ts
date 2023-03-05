import SignInPage from './pages/SignIn';
import Error404 from './pages/404';
import Error500 from './pages/500';
import Profile from './pages/Profile';

// eslint-disable-next-line import/prefer-default-export
export const ROUTES: Record<string, any> = {
  home: SignInPage,
  err404: Error404,
  err500: Error500,
  profile: Profile,
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
  render(ROUTES.home);
});
