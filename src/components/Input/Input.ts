import { Block } from '../../core';
import template from './input.hbs';

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  readonly?: boolean;
  style: string;
  value?: string;
  events?: {
    focus?: (e: Event) => void;
    blur?: (e: Event) => void;
    keydown?: (e: KeyboardEvent) => void;
  };
}
export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
