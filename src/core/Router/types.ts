import { Block } from '../Block';

export interface BlockConstructable<P extends Record<string, unknown> = any> {
  new (props: P): Block<P>;
}
