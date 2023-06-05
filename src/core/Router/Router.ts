import { Route } from './Route';
import { BlockConstructable } from './types';

export class Router {
  static #instance: Router;
  #routes: Route[] = [];
  #currentRoute: Route | null = null;
  #history = window.history;

  constructor(private readonly rootQuery: string) {
    if (!Router.#instance) {
      return Router.#instance;
    }

    this.#routes = [];

    Router.#instance = this;
  }

  public use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this.rootQuery);
    this.#routes.push(route);

    return this;
  }

  public go(pathname: string) {
    this.#history.pushState({}, '', pathname);

    this.#onRoute(pathname);
  }

  public back() {
    this.#history.back();
  }

  public forward() {
    this.#history.forward();
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this.#onRoute(target.location.pathname);
    };

    this.#onRoute(window.location.pathname);
  }

  #onRoute(pathname: string) {
    const route = this.#getRoute(pathname);

    if (!route) {
      this.go('/404');
      return;
    }

    if (this.#currentRoute && this.#currentRoute !== route) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;

    route.render();
  }

  #getRoute(pathname: string) {
    return this.#routes.find((route) => route.match(pathname));
  }
}

export const router = new Router('#app');
