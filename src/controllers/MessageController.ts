import { store } from '../core';
import { WSTransport } from '../utils';
import { WSTransportEvents, IMessage, StoreEvents } from '../types';

class MessageController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const userId = store.getState().user.data?.id;

    const wsTransport = new WSTransport(`${userId}/${id}/${token}`);

    this.sockets.set(id, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    let messagesToAdd: IMessage[] = [];
    const userId = store.getState().user.data?.id;

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
      messagesToAdd.forEach((message) => {
        if (message.user_id === userId) {
          message.mine = true;
        }
      });
    } else {
      if (messages.user_id === userId) {
        messages.mine = true;
      }
      messagesToAdd.push(messages);
    }

    const currentMessages = store.getState().messages[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];
    messagesToAdd = messagesToAdd.filter((message) => message.type === 'message');
    store.setState(`messages.${id}`, messagesToAdd);
    store.emit(StoreEvents.Updated, store.getState());
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: 'get old', content: '0' });
  }
  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message: IMessage | IMessage[]) =>
      this.onMessage(id, message),
    );
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

export const messageController = new MessageController();
