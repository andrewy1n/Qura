import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Message } from '../types/Chat';

interface ChatContextType {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    addMessage: (newMessage: Message) => void;
    isWaiting: boolean;
    setIsWaiting: (isWaiting: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const initialMessage: Message = {
    role: 'tool',
    content:
        'Hello! I’ve curated some inquiries for you based on your medication list! Please feel free to check them out below!',
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [isWaiting, setIsWaiting] = useState(false);

    const addMessage = useCallback((newMessage: Message) => {
        setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                addMessage,
                isWaiting,
                setIsWaiting,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useContext must be used within an ChatsProvider');
    }
    return context;
};
