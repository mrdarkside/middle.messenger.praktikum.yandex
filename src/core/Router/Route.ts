import { Block } from '../Block';
import { BlockConstructable } from './types';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`Cannot find ${query}`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

export class Route {
  #block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly BlockClass: BlockConstructable,
    private readonly query: string,
  ) {}

  leave() {
    this.#block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.#block) {
      this.#block = new this.BlockClass({});

      render(this.query, this.#block);
    }
  }
}
