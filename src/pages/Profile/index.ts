import Block from '../../core/Block';
import template from './profile.hbs';
import * as styles from './profile.module.scss';
import icon from '../../assets/img/back.png';
import avatarPlaceholder from '../../assets/img/profile_pic.png';
import Button from '../../components/Button';

import ProfileField from '../../components/ProfileField';
import Link from '../../components/Link';
import withStore from '../../hocs/withStore';
import authController from '../../controllers/AuthController';

interface ProfilePageProps {
  icon: ImageBitmap;
  avatarPlaceholder: ImageBitmap;
  data: {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
  };
  isLoading: boolean;
  hasError: boolean;
}

class ProfilePageBase extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super({ ...props });
  }

  init() {
    this.children.field_email = new ProfileField({
      name: 'email',
      type: 'email',
      label: 'Почта',
      placeholder: this.props.data.email,
      readonly: true,
    });
    this.children.field_login = new ProfileField({
      name: 'login',
      type: 'text',
      label: 'Логин',
      placeholder: this.props.data.login,
      readonly: true,
    });
    this.children.field_first_name = new ProfileField({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      placeholder: this.props.data.first_name,
      readonly: true,
    });
    this.children.field_second_name = new ProfileField({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      placeholder: this.props.data.second_name,
      readonly: true,
    });
    this.children.field_display_name = new ProfileField({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      placeholder: this.props.data.display_name || 'не выбрано',
      readonly: true,
    });
    this.children.field_phone = new ProfileField({
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      placeholder: this.props.data.phone,
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

const withUser = withStore((state) => ({ ...state.user }));

const ProfilePage = withUser(ProfilePageBase as typeof Block);

export default ProfilePage;
