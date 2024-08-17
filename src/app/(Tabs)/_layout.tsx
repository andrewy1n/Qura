import { Tabs } from 'expo-router';
import React from 'react';

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Tab 1',
                }}
            />
        </Tabs>
    );
}
