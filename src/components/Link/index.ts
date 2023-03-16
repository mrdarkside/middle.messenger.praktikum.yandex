import Block from '../../utils/Block';
import template from './link.hbs';
import * as styles from './link.module.scss';

interface LinkProps {
  href: string;
  label: string;
  isWarning?: boolean;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
