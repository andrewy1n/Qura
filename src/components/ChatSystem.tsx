import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useChat } from '../hooks/useChat';

const ChatSystem = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSend = () => {
    setInput('Ai is typing...');
    sendMessage(input);
    setInput('');
  };

  return (
    <View>
      {messages.filter(msg => msg.role === 'user' || msg.role === 'assistant' && msg.content != null).map((msg, index) => (
        <Text key={index} style={{ color: msg.role === 'user' ? 'blue' : 'green' }}>
            {msg.role}: {msg.content}
        </Text>
        ))}
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default ChatSystem;