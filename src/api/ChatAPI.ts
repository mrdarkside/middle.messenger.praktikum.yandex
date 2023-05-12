import BaseAPI from './BaseAPI';
import { IProfileData } from '../types';

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChatUsers(chatId: string): Promise<IProfileData[]> {
    return this.http.get(`/${chatId}/users`);
  }

  addUserToChat(chatId: number, userId: number): Promise<string> {
    return this.http.put('/users', { users: [userId], chatId });
  }

  removeUserFromChat(chatId: number, userId: number): Promise<string> {
    return this.http.delete('/users', { users: [userId], chatId });
  }

  create(chatTitle: string): Promise<string> {
    return this.http.post('', { title: chatTitle });
  }

  read(): Promise<string> {
    return this.http.get('');
  }

  delete(chatId: string): Promise<string> {
    return this.http.delete('', { chatId });
  }
  // mute abstract CRUD methods
  update = undefined;
}
