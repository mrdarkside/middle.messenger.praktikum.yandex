import { ChatAPI } from '../api';
import { store } from '../core';
import { IChat, StoreEvents } from '../types';
import { messageController } from './MessageController';

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async createChat(chatTitle: string) {
    try {
      await this.api.create(chatTitle);
      await this.getChats();
    } catch (e) {
      console.error(e);
    }
  }

  async setActiveChat(chatId: number | null) {
    const currentChatId = store.getState().activeChatId;
    if (chatId === null || chatId === currentChatId) {
      store.setState('activeChatId', null);
      return;
    }
    store.setState('activeChatId', chatId);
  }

  async deleteChat(chatId: string) {
    await this.api.delete(chatId);
    await this.getChats();
    store.emit(StoreEvents.Updated, store.getState());
  }

  async getChats(): Promise<void> {
    try {
      const chats = (await this.api.read()) as unknown as IChat[];
      store.setState('chats', chats);
      chats.forEach(({ id }) => this.connectWithChat(id));
    } catch (e) {
      console.error(e);
    }
  }

  async getChatUsers(chatId: string) {
    return this.api.getChatUsers(chatId);
  }

  async addUserToChat(chatId: number, userId: number) {
    return this.api.addUserToChat(chatId, userId);
  }

  async removeUserFromChat(chatId: number, userId: number) {
    return this.api.removeUserFromChat(chatId, userId);
  }

  private async connectWithChat(chatId: number): Promise<void> {
    try {
      const token = await this.getToken(chatId);
      await messageController.connect(chatId, token);
    } catch (e) {
      console.error(`Can't connect with chat id=${chatId}: `, e);
    }
  }

  async getToken(chatId: number): Promise<string> {
    try {
      return await this.api.getToken(chatId);
    } catch (e) {
      console.error(`Can't get token for chat id=${chatId}: `, e);
      throw e;
    }
  }
}

export const chatController = new ChatController();
