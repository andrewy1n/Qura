import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#ffffff',
                tabBarActiveTintColor: '#C23B22',
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#000000',
                    width: '80%',
                    height: '10%',
                    left: '10%',
                    bottom: 0,
                    borderTopLeftRadius: 45,
                    borderTopRightRadius: 45,
                },
                tabBarItemStyle: {
                    paddingTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name="(Medications)/index"
                options={{
                    title: 'Medications',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="prescription-bottle-medical" size={18} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Chat/index"
                options={{
                    title: 'Dr. Qura',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="message" size={18} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
