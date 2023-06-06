import { Block } from '../../core';
import template from './settings.hbs';
import * as styles from './settings.module.scss';
import avatarPlaceholder from '../../assets/img/profile_pic.png';

import { ProfileField, Button, Link, PopupFileInput } from '../../components';
import { submitForm } from '../../utils';
import { withStore } from '../../hocs';
import { authController, profileController } from '../../controllers';
import { IProfileData, Routes } from '../../types';

interface SettingsPageProps {
  avatarPlaceholder: ImageBitmap;
  data: {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;
  };
  isLoading: boolean;
  hasError: boolean;
}

class SettingsPageBase extends Block<SettingsPageProps> {
  constructor(props: SettingsPageProps) {
    super({ ...props });
  }

  init() {
    this.children.popup = new PopupFileInput({
      title: 'Загрузите аватар',
      inputId: 'file',
      formId: 'avatar',
      buttonText: 'Поменять',
      onSubmit: this.onAvatarChange,
      id: 'avatar',
    });
    this.children.back_button = new Link({
      to: Routes.Profile,
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

  protected componentDidMount() {
    const avatar = this.element?.querySelector(`.${styles.pic}`);
    avatar?.addEventListener('click', this.onOpenPopup);
  }
  onSubmit(e: Event) {
    e.preventDefault();
    const data = submitForm(e, 'form', styles) as unknown as IProfileData;
    profileController.updateProfile(data);
  }

  onOpenPopup(e: Event): void {
    e.preventDefault();

    const el = document.getElementById('avatar');
    if (el) {
      el.toggleAttribute('active');
      el.addEventListener('click', (ev: MouseEvent) => {
        ev.stopPropagation();
        if (ev.target === el) {
          el.removeAttribute('active');
        }
      });
    }
  }

  onAvatarChange(e: Event): boolean {
    e.preventDefault();
    const input = document.querySelector('#file') as HTMLInputElement;

    const files = input?.files;
    if (!files?.length) {
      return false;
    }
    const formData = new FormData();
    formData.append('avatar', files[0]);
    profileController.changeAvatar(formData).then(() => {
      authController.fetchUser();
    });

    return true;
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

export const SettingsPage = withUser(SettingsPageBase as typeof Block);
