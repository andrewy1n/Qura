import { useState, useCallback } from 'react';
import { callGPT } from '../services/openaiService';
import { callTool } from '../utils/toolCalling';

type Message = {
    role: string;
    content: string;
    tool_call_id?: string;
};

type ToolCall = {
    id: string;
    function: {
        name: string;
        arguments: string;
    };
};

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = useCallback((newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
    }, []);

    const executeToolCalls = async (toolCalls: ToolCall[]) => {
        let returnMessages: Message[] = [];
        for (const tool of toolCalls) {
        const { id, function: func } = tool;
        const args = JSON.parse(func.arguments);
        const result = await callTool(func.name, args);

        addMessage({
            role: 'tool',
            content: result,
            tool_call_id: id,
        });
        returnMessages.push({
            role: 'tool',
            content: result,
            tool_call_id: id,
        });

        console.log(`Tool call ${id} function ${func.name} executed with result.`);
        }
        return returnMessages;
    };

    const sendMessage = async (userMessage: string) => {
        console.log('User message:', userMessage);

        let currentMessages = [...messages, { role: 'user', content: userMessage }];
        console.log('Current history:', currentMessages);

        let aiMessage = await callGPT(currentMessages);
        currentMessages = [...currentMessages, aiMessage as Message];

        console.log('AI response:', aiMessage);

        while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
            console.log('Executing tool calls:', aiMessage.tool_calls);
            const ret = await executeToolCalls(aiMessage.tool_calls);
            currentMessages = [...currentMessages, ...ret];
            aiMessage = await callGPT(currentMessages);
            console.log('AI response:', aiMessage);
            console.log('New history:', currentMessages);
        }

        if (aiMessage.content) {
            currentMessages = [...currentMessages, aiMessage as Message];
            setMessages(currentMessages);
            return aiMessage.content;
        } else {
            setMessages(currentMessages);
            console.error('No response from GPT');
            return 'Sorry, I did not understand that';
        }
    };

    return { messages, sendMessage, addMessage };
};