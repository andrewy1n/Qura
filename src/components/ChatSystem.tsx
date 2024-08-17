import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Keyboard, Platform } from 'react-native';
import SendIcon from '@/assets/images/SendIcon.svg';
import Dr from '@/assets/images/Dr.svg';
import { useChat } from '../hooks/useChat';

export default function ChatSystem() {
    const { messages, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSend = () => {
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: false });
            requestAnimationFrame(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            });
        }
    }, [messages]);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.echoMessage]}>
                        {item.role !== 'user' && (
                            <View style={styles.avatarContainer}>
                                <Dr width={30} height={30} />
                            </View>
                        )}
                        <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.echoBubble]}>
                            <Text style={styles.messageText}>{item.content}</Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.messagesList}
                ref={flatListRef}
                onContentSizeChange={() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }}
            />
            <View style={[styles.inputContainer, { marginBottom: keyboardVisible ? 20 : 70 }]}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type something..."
                    placeholderTextColor="#555" // Darker placeholder color for better visibility
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <View style={styles.iconContainer}>
                        <SendIcon width={20} height={20} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 18,
        alignItems: 'flex-end',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    echoMessage: {
        justifyContent: 'flex-start',
    },
    avatarContainer: {
        marginLeft: 15,
        marginRight: -3,
    },
    bubble: {
        maxWidth: '69%',
        padding: 18, 
        borderRadius: 15,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    userBubble: {
        backgroundColor: '#000',
        alignSelf: 'flex-end',
        marginRight: -2,
    },
    echoBubble: {
        backgroundColor: '#121212',
        alignSelf: 'flex-start',
        marginLeft: 15, 
    },
    messageText: {
        fontSize: 16,
        color: '#FFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,        
    },
    textInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        backgroundColor: '#E0E0E0',
        borderRadius: 30,
        fontSize: 16,
        fontWeight: '500',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 0,
    },
});
