import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import ChatSystem from '../../../components/ChatSystem';
import Logo from '@/assets/images/red_with_text.svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useChat } from '@/src/hooks/useChat';

export default function Index() {
    const { resetMessages } = useChat();

    const handleDeleteMessages = () => {
        Alert.alert(
            'Confirm Clear',
            'Are you sure you want to delete everything?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: resetMessages,
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View className="flex-1 bg-white">
            <View className="flex-col items-start w-full bg-black py-4 px-5 z-10 pt-[12%]">
                <Logo height={50} width={100} />
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-white text-2xl font-bold">Chat with Dr. Qura</Text>
                    <View className="flex-row space-x-4">
                        <TouchableOpacity onPress={handleDeleteMessages}>
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ChatSystem />
        </View>
    );
}
