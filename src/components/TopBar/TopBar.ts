import { Block } from '../../core/Block';
import template from './top-bar.hbs';
import * as styles from './top-bar.module.scss';

interface TopBarProps {
  name: string;
}

export class TopBar extends Block<TopBarProps> {
  constructor(props: TopBarProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
