import { TemplateDelegate } from 'handlebars';
import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

// https://github.com/microsoft/TypeScript/issues/15300
export abstract class Block<P extends Record<string, any> = any> {
  static LIFE_EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);
  #eventBus: () => EventBus;
  protected props: P;
  protected children: Record<string, Block | Block[]>;
  #element: HTMLElement | null = null;

  protected constructor(propsWithChildren: P) {
    const eventBus = new EventBus();

    const { props, children } = this.#getChildrenAndProps(propsWithChildren);

    this.props = this.#makePropsProxy(props);
    this.children = children;

    this.#eventBus = () => eventBus;

    this.#registerLifeEvents(eventBus);
    eventBus.emit(Block.LIFE_EVENTS.INIT);
  }

  #getChildrenAndProps(childrenAndProps: P): {
    props: P;
    children: Record<string, Block | Block[]>;
  } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  #registerLifeEvents(eventBus: EventBus) {
    eventBus.on(Block.LIFE_EVENTS.INIT, this.#init.bind(this));
    eventBus.on(Block.LIFE_EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Block.LIFE_EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Block.LIFE_EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  #addEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this.#element?.addEventListener(eventName, events[eventName]);
    });
  }

  #removeEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this.#element?.removeEventListener(eventName, events[eventName]);
    });
  }

  #init() {
    this.init();

    this.#eventBus().emit(Block.LIFE_EVENTS.FLOW_RENDER);
  }

  protected init() {}

  #componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.#eventBus().emit(Block.LIFE_EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  #componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.#eventBus().emit(Block.LIFE_EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate() {
    return true;
  }

  get element() {
    return this.#element;
  }

  #render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.#element && newElement) {
      this.#removeEvents();
      this.#element.replaceWith(newElement);
    }

    this.#element = newElement;

    this.#addEvents();
    this.dispatchComponentDidMount();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: TemplateDelegate, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  public getContent() {
    return this.element;
  }

  #makePropsProxy(props: P) {
    return new Proxy(props, {
      get: (target: P, prop) => {
        const value = target[prop as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: any, prop, value) => {
        target[prop] = value;

        this.#eventBus().emit(Block.LIFE_EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
  }

  public toggleActive() {
    this.getContent()?.toggleAttribute('active');
  }

  public makeActive() {
    this.getContent()?.setAttribute('active', '');
  }

  public makeNotActive() {
    this.getContent()?.removeAttribute('active');
  }
}
