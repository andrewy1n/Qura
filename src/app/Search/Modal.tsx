import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMedications } from '@/src/hooks/useMedications';
import { SearchMedicationInfo } from '@/src/types/Medication';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Modal() {
    const [searchQuery, setSearchQuery] = useState('');
    const prevQueryRef = useRef(searchQuery);
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const { searchByNDC, searchByName, addMedication, searchList, isLoading } = useMedications();

    useEffect(() => {
        if (searchQuery.length > prevQueryRef.current.length) {
            if (isValidNdcNumber(searchQuery)) {
                console.log('VALID');
                searchByNDC(searchQuery);
            } else {
                searchByName(searchQuery);
            }
        }
        prevQueryRef.current = searchQuery;
    }, [searchQuery]);

    function isValidNdcNumber(ndcNumber: string): boolean {
        // Regular expression to match NDC number formats
        const ndcPattern = /^(?:\d{5}-\d{4}|\d{4}-\d{4}|\d{5}-\d{3})$/;
        // Test the NDC number against the pattern
        return ndcPattern.test(ndcNumber);
    }

    const handleScan = () => {
        router.navigate('/Search/Scanner');
    };

    const renderItem = ({ item }: { item: SearchMedicationInfo }) => {
        const handlePress = async () => {
            setLoading(true); // Start loading
            try {
                const medicineAdded = await addMedication(item.ndc_number);
                if (medicineAdded) {
                    setConfirm(true);
                    setTimeout(() => setConfirm(false), 2000);
                    // Handle success if needed
                }
            } catch (error) {
                console.error('Error adding medication:', error);
            } finally {
                setLoading(false); // End loading
            }
        };
        return (
            <View className="flex-row mb-3 items-center">
                <TouchableOpacity className="mr-2" onPress={handlePress}>
                    <FontAwesome name="plus" size={24} color="black" />
                </TouchableOpacity>

                <View className="bg-gray-200 p-2 rounded-md w-[90%]">
                    <Text className="font-semibold">
                        {item.brand_name} | {item.ndc_number}
                    </Text>
                </View>
            </View>
        );
    };

    const isPresented = router.canGoBack();

    return (
        <View className="flex-1 justify-start items-center bg-white p-5 w-[100%]">
            <View className="w-20 h-1 bg-gray-400 rounded-full mb-4" />
            <Text className="text-center font-bold text-lg mb-4">Medication Search</Text>
            <View className="flex-row items-center mb-4">
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Type NDC / Drug Name"
                    placeholderTextColor="gray"
                    className="flex-1 bg-gray-200 p-3 rounded-lg"
                    autoCorrect={false}
                />
                <TouchableOpacity onPress={handleScan} className="ml-3 p-2 bg-black rounded-lg">
                    <Ionicons name="scan-sharp" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="h-0.5 w-[100%] bg-gray-200 mb-4" />
            {searchList.length !== 0 ? (
                <FlatList data={searchList} renderItem={renderItem} />
            ) : (
                <Text className="mt-2 font-bold">No Results</Text>
            )}

            {loading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-white/50">
                    <ActivityIndicator size="large" color="#000000" />
                    <Text className="mt-5">Summarizing Medication...</Text>
                </View>
            )}

            {confirm && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-white/50">
                    <FontAwesome name="check" size={24} color="#000000" />
                    <Text className="mt-5">Added to List!</Text>
                </View>
            )}

            {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
            {!isPresented && <Link href="../">Dismiss</Link>}
            {/* Native modals have dark backgrounds on iOS. Set the status bar to light content and add a fallback for other platforms with auto. */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}
