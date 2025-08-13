import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: number;
  isMine?: boolean;
  attachment?: {
    name: string;
    type: string;
    url: string;
  };
}

interface ChatContextType {
  chatList: User[];
  currentChatId: string | null;
  messages: Message[];
  setCurrentChat: (id: string) => void;
  sendMessage: (
    text: string,
    attachment?: { name: string; type: string; url: string }
  ) => void;
  addChatUser: (user: User) => void;
  removeChatUser: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatList, setChatList] = useState<User[]>([
    { id: 'u1', name: 'Alice' },
    { id: 'u2', name: 'Bob' },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const currentUserId = 'me';

  const setCurrentChat = (id: string) => {
    setCurrentChatId(id);
  };

  const addChatUser = (user: User) => {
    setChatList((prev) => {
      if (prev.find((u) => u.id === user.id)) return prev;
      return [...prev, user];
    });
  };
  const sendMessage = (
    text: string,
    attachment?: { name: string; type: string; url: string }
  ) => {
    if (!currentChatId || (!text.trim() && !attachment)) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      chatId: currentChatId,
      text,
      senderId: currentUserId,
      isMine: true,
      timestamp: Date.now(),
      attachment,
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const replyMessage: Message = {
        id: crypto.randomUUID(),
        chatId: currentChatId,
        text: 'Hello, Nice to meet you 👋',
        senderId: 'bot',
        isMine: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1500);
  };
  const removeChatUser = (id: string) => {
    setChatList((prev) => prev.filter((u) => u.id !== id));
    setMessages((prev) => prev.filter((msg) => msg.chatId !== id));
    if (currentChatId === id) {
      setCurrentChatId(null);
    }
  };
  return (
    <ChatContext.Provider
      value={{
        chatList,
        currentChatId,
        messages,
        setCurrentChat,
        sendMessage,
        addChatUser,
        removeChatUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
