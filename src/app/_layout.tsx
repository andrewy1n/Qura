import { Stack } from 'expo-router/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuraLogo from '@/assets/images/QuraLogo.svg';

export default function Layout() {
    return (
        <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} />
            <View style={styles.headerContainer}>
                <QuraLogo width={70} height={70} style={styles.logo} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        padding: 16,
        position: 'absolute'
    },
    logo: {
        position: 'absolute',
        left: 16,
        top: 5,
    },
});
