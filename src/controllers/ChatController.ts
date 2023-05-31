import { ChatAPI } from '../api';
import { store } from '../core';

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
    console.log(await store.getState().activeChatId);
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
    const chats = await this.api.read();

    store.setState('chats', JSON.parse(chats));
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
}

export const chatController = new ChatController();
