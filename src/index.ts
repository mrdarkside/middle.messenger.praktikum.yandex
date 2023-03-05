import SignInPage from './pages/SignIn';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const homePage = new SignInPage();

  root?.append(homePage.getContent()!);
});
