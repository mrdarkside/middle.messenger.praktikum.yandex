import Block from '../../core/Block';
import template from './input.hbs';
import * as styles from './input.module.scss';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  readonly?: boolean;
  style: string;
  events?: {
    focus?: (e: Event) => void;
    blur?: (e: Event) => void;
    keydown?: (e: KeyboardEvent) => void;
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
