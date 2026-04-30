import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Chat, Message } from '@/types';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
  chats: Chat[];
  messages: Message[];
  currentUserId: string;
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onSendMessage: (content: string) => void;
}

export default function ChatPanel({ chats, messages, currentUserId, selectedChatId, onSelectChat, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
      {/* Chat List */}
      <Card className="border-border/50 bg-card md:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-heading">Conversations</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-1 overflow-y-auto">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-colors",
                selectedChatId === chat.id ? "bg-primary/15 border border-primary/30" : "hover:bg-muted"
              )}
            >
              <p className="text-sm font-medium truncate">
                {chat.participants.filter(p => p.id !== currentUserId).map(p => p.name).join(', ')}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
            </button>
          ))}
          {chats.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No conversations yet</p>
          )}
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="border-border/50 bg-card md:col-span-2 flex flex-col">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-sm font-heading">
            {selectedChatId
              ? chats.find(c => c.id === selectedChatId)?.participants.filter(p => p.id !== currentUserId).map(p => p.name).join(', ')
              : 'Select a conversation'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-y-auto space-y-3">
          {selectedChatId ? messages.map(msg => (
            <div key={msg.id} className={cn("flex", msg.senderId === currentUserId ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2",
                msg.senderId === currentUserId
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted rounded-bl-md"
              )}>
                {msg.senderId !== currentUserId && (
                  <p className="text-xs font-medium text-accent mb-1">{msg.senderName}</p>
                )}
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          )) : (
            <p className="text-muted-foreground text-sm text-center py-12">Select a chat to start messaging</p>
          )}
        </CardContent>
        {selectedChatId && (
          <div className="p-3 border-t border-border/50 flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="bg-muted border-border/50"
            />
            <Button size="icon" onClick={handleSend} className="gradient-primary shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
