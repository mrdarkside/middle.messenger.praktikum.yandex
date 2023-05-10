import Block from '../../core/Block';
import template from './profile.hbs';
import * as styles from './profile.module.scss';
import icon from '../../assets/img/back.png';
import avatarPlaceholder from '../../assets/img/profile_pic.png';

import ProfileField from '../../components/ProfileField';
import Link from '../../components/Link';
import withStore from '../../hocs/withStore';
import authController from '../../controllers/AuthController';
import Button from '../../components/Button';

interface ProfilePageProps {
  icon: ImageBitmap;
  avatarPlaceholder: ImageBitmap;
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  isLoading: boolean;
  hasError: boolean;
}

class ProfilePageBase extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super({ ...props });
  }

  init() {
    authController.fetchUser();
    console.log('profile page props', this.props);

    this.children.field_email = new ProfileField({
      name: 'email',
      type: 'email',
      label: 'Почта',
      placeholder: this.props.email,
      readonly: true,
    });
    this.children.field_login = new ProfileField({
      name: 'login',
      type: 'text',
      label: 'Логин',
      placeholder: this.props.login,
      readonly: true,
    });
    this.children.field_first_name = new ProfileField({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      placeholder: this.props.firstName,
      readonly: true,
    });
    this.children.field_second_name = new ProfileField({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      placeholder: this.props.secondName,
      readonly: true,
    });
    this.children.field_display_name = new ProfileField({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      placeholder: this.props.displayName || 'не выбрано',
      readonly: true,
    });
    this.children.field_phone = new ProfileField({
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      placeholder: this.props.phone,
      readonly: true,
    });
    this.children.link_settings = new Link({
      href: '#',
      label: 'Изменить данные',
    });
    this.children.link_password = new Link({
      href: '#',
      label: 'Изменить пароль',
    });
    this.children.link_logout = new Button({
      label: 'Выйти',
      events: {
        click: (e) => this.onLogout(e),
      },
    });
  }

  onLogout = (e: Event) => {
    e.preventDefault();
    console.log('logout');
    authController.logout();
  };

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
      icon,
      avatarPlaceholder,
    });
  }
}

const mapStateToProps = (state: any) => {
  const user = state.user.data;
  const { isLoading, hasError } = state.user;

  return {
    email: user.email,
    login: user.login,
    firstName: user.first_name,
    secondName: user.second_name,
    displayName: user.display_name,
    phone: user.phone,
    isLoading,
    hasError,
  };
};

const ProfilePage = withStore(mapStateToProps)(ProfilePageBase);

export default ProfilePage;
