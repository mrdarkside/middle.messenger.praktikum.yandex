import { Block } from '../../core';
import template from './file-input.hbs';
import styles from './file-input.module.scss';

interface FileInputProps {
  name: string;
  id: string;
  label: string;
}
export class FileInput extends Block<FileInputProps> {
  constructor(props: FileInputProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
