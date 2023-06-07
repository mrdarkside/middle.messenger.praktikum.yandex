import { EventBus } from '../core';
import { WSTransportEvents } from '../types';

export class WSTransport extends EventBus {
  static API_URL = 'wss://ya-praktikum.tech/ws/chats/';

  private url: string;

  private socket: WebSocket | null = null;

  constructor(endpoint: string) {
    super();
    this.url = `${WSTransport.API_URL}${endpoint}`;
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Can't send message because socket is close");
    }
    this.socket.send(JSON.stringify(data));
  }

  public close() {
    this.socket?.close();
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener('message', (message) => {
      this.emit(WSTransportEvents.Message, JSON.parse(message.data));
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e);
    });
  }
}
