import Block from '../../core/Block';
import template from './password.hbs';
import * as styles from './password.module.scss';
import ProfileField from '../../components/ProfileField';
import Button from '../../components/Button';
import { submitForm } from '../../utils/Validation';
import avatarPlaceholder from '../../img/profile_pic.png';
import Link from '../../components/Link';
import withStore from '../../hocs/withStore';

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
      name: 'old_password',
      type: 'password',
      label: 'Старый пароль',
      placeholder: '•••••••••',
      value: '',
    });
    this.children.password = new ProfileField({
      name: 'password',
      type: 'password',
      label: 'Новый пароль',
      placeholder: '•••••••••',
      value: '',
    });
    this.children.confirm_password = new ProfileField({
      name: 'confirm_password',
      type: 'password',
      label: 'Повторите новый пароль',
      placeholder: '•••••••••',
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
    submitForm(e, styles);
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
