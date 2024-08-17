import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CustomHeaderProps = {
    title: string;
};

export default function CustomHeader({ title }: CustomHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Delete pressed')}>
                <Ionicons name="trash-outline" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#121212',
        paddingTop: 70,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
});
