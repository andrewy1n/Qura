import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Text,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import SendIcon from '@/assets/images/SendIcon.svg';
import Dr from '@/assets/images/Dr.svg';
import { useChat } from '@/hooks/useChat';
import { Message } from '../types/Chat';
import { useMedications } from '@/src/hooks/useMedications';
import { useMedicationsContext } from '@/src/context/MedicationsContext';
import Markdown from 'react-native-markdown-display';

export default function ChatSystem() {
    const { messages, sendMessage } = useChat();
    const { createMedPrompt } = useMedications();
    const { medicationsList } = useMedicationsContext();
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

    const handleAdvice = () => {
        if (!medicationsList) {
            Alert.alert('Please add at least one medication to your list.');
            return;
        }

        sendMessage(
            createMedPrompt(
                'Give me some advice on what my lifestyle should look like if I take the following medication: '
            )
        );
    };

    const handleInteractions = () => {
        if (!medicationsList) {
            Alert.alert('Please add at least one medication to your list.');
            return;
        }

        sendMessage(
            createMedPrompt(
                'Show me all potentPial medicine interaction risks from my list of medication: '
            )
        );
    };

    return (
        <KeyboardAvoidingView
            className="h-[81%]"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }: { item: Message; index: number }) => (
                    <View
                        className={`flex-row mb-4 items-end ${
                            item.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {item.role !== 'user' && (
                            <View className="ml-4 mr-4">
                                <Dr width={30} height={30} />
                            </View>
                        )}
                        <View
                            className={`max-w-[69%] rounded-lg shadow-md
                                ${
                                    item.role === 'user'
                                        ? 'bg-[#C23B22] self-end -mr-0.5'
                                        : 'bg-black self-start'
                                }
                                ${index === 0 ? 'px-0' : 'px-3'}
                            `}
                        >
                            <Markdown
                                style={{
                                    link: { color: 'blue', textDecorationLine: 'underline' },
                                    body: {
                                        color: 'white',
                                        paddingHorizontal: index === 0 ? 12 : 0,
                                    },
                                }}
                            >
                                {item.content}
                            </Markdown>
                            {index === 0 && (
                                <View className="bg-white mt-4 pt-2 rounded-b-lg space-y-1 items-center">
                                    <TouchableOpacity
                                        className="w-[95%] bg-black p-3 rounded mb-2"
                                        onPress={handleAdvice}
                                    >
                                        <Text className="text-white text-center">
                                            Medication Lifestyle Advice
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="w-[95%] bg-black p-3 rounded mb-2"
                                        onPress={handleInteractions}
                                    >
                                        <Text className="text-white text-center">
                                            Potential Medicine Interactions
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                )}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 10,
                    paddingTop: 10,
                }}
                ref={flatListRef}
                onContentSizeChange={() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }}
            />
            <View
                className={`flex-row items-center mb-20 p-3 ${keyboardVisible ? 'mb-1' : 'mb-20'}`}
            >
                <TextInput
                    className="flex-1 h-12 px-4 bg-gray-200 rounded-full text-base font-medium"
                    placeholder="  Type something..."
                    placeholderTextColor="#555" // Darker placeholder color for better visibility
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity
                    className="ml-2 bg-black rounded-2xl p-3 justify-center items-center"
                    onPress={handleSend}
                >
                    <View className="w-[25px] h-[25px] justify-center items-center">
                        <SendIcon width={20} height={20} />
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
