import Block from '../../utils/Block';
import template from './input.hbs';
import styles from './input.module.scss';

interface InputProps {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  events?: {
    focus: () => void;
    blur: () => void;
    input: () => void;
  };
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
