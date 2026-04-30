import { Chat, Message } from '@/types';
import { mockChats, mockMessages } from '@/data/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const messageService = {
  async getChats(userId: string): Promise<Chat[]> {
    await delay(300);
    return mockChats.filter(c => c.participants.some(p => p.id === userId));
  },

  async getMessages(chatId: string): Promise<Message[]> {
    await delay(300);
    return mockMessages.filter(m => m.chatId === chatId);
  },

  async sendMessage(chatId: string, senderId: string, senderName: string, content: string): Promise<Message> {
    await delay(300);
    return {
      id: `m-${Date.now()}`,
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
      chatId,
    };
  },
};
