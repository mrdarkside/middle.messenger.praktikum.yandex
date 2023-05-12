import Block from '../../core/Block';
import template from './settings.hbs';
import * as styles from './settings.module.scss';
import ProfileField from '../../components/ProfileField';
import Button from '../../components/Button';
import { submitForm } from '../../utils/Validation';
import avatarPlaceholder from '../../assets/img/profile_pic.png';
import withStore from '../../hocs/withStore';
import Link from '../../components/Link';
import profileController from '../../controllers/ProfileController';
import { IProfileData } from '../../types';

interface SettingsPageProps {
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

class SettingsPageBase extends Block<SettingsPageProps> {
  constructor(props: SettingsPageProps) {
    super({ ...props });
  }

  init() {
    this.children.back_button = new Link({
      to: '/profile',
      isBackIcon: true,
    });
    this.children.field_email = new ProfileField({
      name: 'email',
      type: 'email',
      label: 'Почта',
      value: this.props.data.email,
    });
    this.children.field_login = new ProfileField({
      name: 'login',
      type: 'text',
      label: 'Логин',
      value: this.props.data.login,
    });
    this.children.field_first_name = new ProfileField({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      value: this.props.data.first_name,
    });
    this.children.field_second_name = new ProfileField({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      value: this.props.data.second_name,
    });
    this.children.field_display_name = new ProfileField({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      value: this.props.data.display_name || this.props.data.first_name,
    });
    this.children.field_phone = new ProfileField({
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      value: this.props.data.phone,
    });
    this.children.button = new Button({
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: (e) => this.onSubmit(e!),
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const data = submitForm(e, 'form', styles) as unknown as IProfileData;
    profileController.updateProfile(data);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
      avatarPlaceholder,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const SettingsPage = withUser(SettingsPageBase as typeof Block);

export default SettingsPage;
