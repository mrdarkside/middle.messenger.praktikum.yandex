import Block from '../../utils/Block';
import template from './profileField.hbs';
import styles from './profileField.module.scss';

interface ProfileFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  readonly?: boolean;
}

export default class ProfileField extends Block<ProfileFieldProps> {
  constructor(props: ProfileFieldProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
