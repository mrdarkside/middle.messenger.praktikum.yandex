import { Block } from '../../core/Block';
import template from './top-bar.hbs';

interface TopBarProps {
  name: string;
}

export class TopBar extends Block<TopBarProps> {
  constructor(props: TopBarProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
