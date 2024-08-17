import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="Modal"
                options={{
                    presentation: 'modal',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Scanner"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
