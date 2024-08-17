import { Tabs } from 'expo-router';
import React from 'react';
import CustomHeader from '@/components/CustomHeader';
import MedicationsIcon1 from '@/assets/images/MedicationsIcon1.svg'; 
import MedicationsIcon2 from '@/assets/images/MedicationsIcon2.svg';
import ChatIcon1 from '@/assets/images/ChatIcon1.svg'; 
import ChatIcon2 from '@/assets/images/ChatIcon2.svg'; 
import { Text } from 'react-native';

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#C23B22',
                tabBarInactiveTintColor: '#FFF',
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWidth: 0,
                    height: 70, 
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    position: 'absolute',
                    left: 20, 
                    right: 20, 
                    bottom: 0,
                    overflow: 'hidden', 
                    paddingBottom: 10, 
                    paddingTop: 10, 
                    paddingHorizontal: 30, 
                },
                header: ({ route }) => {
                    let title;
                    if (route.name === '(Medications)/index') {
                        title = 'Medications';
                    } else if (route.name === 'Chat/index') {
                        title = 'Chat With Dr. Qura';
                    }
                    return <CustomHeader title={title} />;
                },
                tabBarIcon: ({ focused, size }) => {
                    if (route.name === '(Medications)/index') {
                        return focused ? <MedicationsIcon2 width={28} height={28} /> : <MedicationsIcon1 width={28} height={28} />;
                    } else if (route.name === 'Chat/index') {
                        return focused ? <ChatIcon2 width={25} height={25} /> : <ChatIcon1 width={25} height={25} />;
                    }
                    return null;
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: -5,
                },
            })}
        >
            <Tabs.Screen
                name="(Medications)/index"
                options={{
                    title: 'Medications',
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 12, fontWeight: '600', marginTop: -5 }}>Medications</Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="Chat/index"
                options={{
                    title: 'Dr. Cura',
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 12, fontWeight: '600', marginTop: -5 }}>Dr. Cura</Text>
                    ),
                }}
            />
        </Tabs>
    );
}
