import { Stack } from 'expo-router/stack';
import { ChatProvider } from '@/src/context/ChatMessagesContext';

export default function Layout() {
    return <Stack screenOptions={{ headerShown: false }} />;
}
