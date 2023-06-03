import { Block } from '../../core';
import template from './round-button.hbs';

interface RoundButtonProps {
  type?: string;
  label?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class RoundButton extends Block<RoundButtonProps> {
  constructor(props: RoundButtonProps) {
    super({ type: 'button', ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
