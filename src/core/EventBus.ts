type Callback = (...args: any[]) => void;

export default class EventBus {
  #listeners: Record<string, Callback[]> = {};

  public on(event: string, callback: Callback): void {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push(callback);
  }

  public off(event: string, callback: Callback): void {
    if (!this.#listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.#listeners[event] = this.#listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  public emit(event: string, ...args: any[]): void {
    if (!this.#listeners[event]) {
      return;
    }
    this.#listeners[event].forEach((listener) => listener(...args));
  }
}
