import { useState, useCallback } from 'react';
import { callTool } from '../util/Services/CallTool';
import { callGPT } from '../util/LLM';
import { Message, ToolCall } from '../types/Chat';
import { useChatContext } from '../context/ChatMessagesContext';

export const useChat = () => {
    const initialMessage: Message = {
        role: 'tool',
        content:
            'Hello! I’ve curated some inquiries for you based on your medication list! Please feel free to check them out below!',
    };

    const { messages, setMessages, addMessage } = useChatContext();

    const executeToolCalls = async (toolCalls: ToolCall[]) => {
        let returnMessages: Message[] = [];
        for (const tool of toolCalls) {
            const { id, function: func } = tool;
            const args = JSON.parse(func.arguments);
            const result = await callTool(func.name, args);

            if (!result) return;

            const toolMessage: Message = {
                role: 'tool',
                content: result,
                tool_call_id: id,
            };

            returnMessages.push(toolMessage);

            console.log(`Tool call ${id} function ${func.name} executed with result.`);
        }
        return returnMessages;
    };

    const sendMessage = async (userMessage: string) => {
        console.log('User message:', userMessage);

        let currentMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(currentMessages);

        console.log('Current history:', currentMessages);

        let aiMessage = await callGPT(currentMessages);

        while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
            console.log('Executing tool calls:', aiMessage.tool_calls);
            const toolMessages = await executeToolCalls(aiMessage.tool_calls);

            if (!toolMessages) {
                break;
            }

            console.log([...currentMessages, ...toolMessages]);

            aiMessage = await callGPT([...currentMessages, ...toolMessages]);
            console.log('AI response:', aiMessage);
        }

        if (!aiMessage.content) {
            aiMessage.content = 'Sorry, I did not understand that';
            console.error('No response from GPT');
        }

        addMessage(aiMessage as Message);
    };

    const resetMessages = () => {
        setMessages([initialMessage]);
    };

    return { messages, sendMessage, addMessage, resetMessages };
};
