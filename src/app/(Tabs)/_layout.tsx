import { Tabs } from 'expo-router';
import React from 'react';

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="(Medications)/index"
                options={{
                    title: 'Tab 1',
                }}
            />
            <Tabs.Screen
                name="Chat/index"
                options={{
                    title: 'Tab 2',
                }}
            />
        </Tabs>
    );
}
