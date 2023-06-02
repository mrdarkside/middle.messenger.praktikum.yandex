import { ChatAPI } from '../api';
import { store } from '../core';
import { IChat } from '../types';
import { messageController } from './MessageController';

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async createChat(chatTitle: string) {
    await this.api.create(chatTitle);
    await this.getChats();
    store.setState('addChatPopup', false);
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
  }

  async getChats() {
    const chats: IChat[] = JSON.parse(await this.api.read());
    store.setState('chats', chats);
    chats.forEach(({ id }) => this.connectWithChat(id));
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
      console.log(`Can't connect with chat id=${chatId}: `, e);
    }
  }

  async getToken(chatId: number): Promise<string> {
    return this.api.getToken(chatId);
  }
}

export const chatController = new ChatController();
