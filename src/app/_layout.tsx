import { Stack } from 'expo-router/stack';
import { MedicationsProvider } from '../context/MedicationsContext';

export default function Layout() {
    return (
        <MedicationsProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Search"
                    options={{
                        presentation: 'modal',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(Tabs)"
                    options={{
                        headerShown: false,
                        contentStyle: {
                            backgroundColor: 'transparent',
                        },
                    }}
                />
            </Stack>
        </MedicationsProvider>
    );
}
