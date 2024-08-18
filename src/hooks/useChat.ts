import { useState, useCallback } from 'react';
import { callTool } from '../util/Services/CallTool';
import { callGPT } from '../util/LLM';
import { Message, ToolCall } from '../types/Chat';
import { initialMessage, useChatContext } from '../context/ChatMessagesContext';

export const useChat = () => {
    const { messages, setMessages, addMessage, setIsWaiting } = useChatContext();

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
        setIsWaiting(true);
        console.log('User message:', userMessage);

        let currentMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(currentMessages);

        console.log('Current history:', currentMessages);

        let aiMessage = await callGPT(currentMessages);
        currentMessages = [...currentMessages, aiMessage as Message];

        while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
            console.log('Executing tool calls:', aiMessage.tool_calls);
            const toolMessages = await executeToolCalls(aiMessage.tool_calls);

            if (!toolMessages) {
                break;
            }

            console.log([...currentMessages, ...toolMessages]);

            aiMessage = await callGPT([...currentMessages, ...toolMessages]);
            console.log('AI response:', aiMessage);
            currentMessages = [...currentMessages, ...toolMessages, aiMessage as Message];
        }

        if (!aiMessage.content) {
            aiMessage.content = 'Sorry, I did not understand that';
            console.error('No response from GPT');
        }

        addMessage(aiMessage as Message);
        setIsWaiting(false);
    };

    const resetMessages = () => {
        setMessages([initialMessage]);
    };

    return { messages, sendMessage, addMessage, resetMessages };
};
