import Block from '../../core/Block';
import template from './password.hbs';
import * as styles from './password.module.scss';
import ProfileField from '../../components/ProfileField';
import Button from '../../components/Button';
import { submitForm } from '../../utils/Validation';
import avatarPlaceholder from '../../assets/img/profile_pic.png';
import Link from '../../components/Link';
import withStore from '../../hocs/withStore';
import profileController from '../../controllers/ProfileController';
import { IPasswordData } from '../../types';

interface PasswordPageProps {
  avatarPlaceholder: ImageBitmap;
  data: {
    first_name: string;
  };
  isLoading: boolean;
  hasError: boolean;
}

class PasswordPageBase extends Block<PasswordPageProps> {
  constructor(props: PasswordPageProps) {
    super({ ...props });
  }

  init() {
    this.children.back_button = new Link({
      to: '/profile',
      isBackIcon: true,
    });
    this.children.old_password = new ProfileField({
      name: 'oldPassword',
      type: 'password',
      label: 'Старый пароль',
      value: '',
    });
    this.children.password = new ProfileField({
      name: 'newPassword',
      type: 'password',
      label: 'Новый пароль',
      value: '',
    });
    this.children.confirm_password = new ProfileField({
      name: 'confirmPassword',
      type: 'password',
      label: 'Повторите новый пароль',
      value: '',
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
    const data = submitForm(e, styles) as unknown as IPasswordData;
    profileController.changePassword(data);
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

const PasswordPage = withUser(PasswordPageBase as typeof Block);

export default PasswordPage;
