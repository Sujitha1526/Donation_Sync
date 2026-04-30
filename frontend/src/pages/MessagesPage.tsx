import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockChats, mockMessages } from '@/data/mockData';
import ChatPanel from '@/components/ChatPanel';
import { Message } from '@/types';

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  if (!user) return null;

  const userChats = mockChats.filter(c => c.participants.some(p => p.id === user.id));
  const chatMessages = messages.filter(m => m.chatId === selectedChat);

  const handleSend = (content: string) => {
    if (!selectedChat) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      content,
      timestamp: new Date().toISOString(),
      chatId: selectedChat,
    };
    setMessages(prev => [...prev, newMsg]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">Chat with donors, organizations, and volunteers</p>
      </div>
      <ChatPanel
        chats={userChats}
        messages={chatMessages}
        currentUserId={user.id}
        selectedChatId={selectedChat}
        onSelectChat={setSelectedChat}
        onSendMessage={handleSend}
      />
    </div>
  );
}
