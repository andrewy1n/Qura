import React, { useState } from 'react';
import { Alert, Text, View, Image, TouchableOpacity, Animated, Button } from 'react-native';
import { useMedicationsContext } from '../context/MedicationsContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMedications } from '@/src/hooks/useMedications';

interface PostProps {
    medicationIndex: number;
    edit: boolean;
}

const Medication: React.FC<PostProps> = ({ medicationIndex, edit }) => {
    const [expand, setExpand] = useState(false);
    const { medicationsList } = useMedicationsContext();
    const { deleteMedication } = useMedications();
    const rotateAnim = useState(new Animated.Value(0))[0]; // Initial rotation value

    if (!medicationsList) {
        return null;
    }

    const medication = medicationsList[medicationIndex];

    const handleExpand = () => {
        setExpand(!expand);
        if (edit) setExpand(false);
        Animated.timing(rotateAnim, {
            toValue: expand ? 0 : 1, // Toggle between 0 and 1
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'], // Rotate from 0 to 180 degrees
    });

    const iconStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete ${medication.brand_name}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteMedication(medication.ndc_number), // Call delete function
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View className="shadow rounded-lg w-full">
            <TouchableOpacity onPress={handleExpand} disabled={edit}>
                <View className={`bg-black px-5 py-5 ${expand ? 'rounded-t-lg' : 'rounded-lg'}`}>
                    <View className="flex-row justify-between items-center">
                        <View className="w-[90%]">
                            <Text className="font-bold text-lg text-white w-[90%]">
                                {medication.brand_name}
                            </Text>
                            <Text className="text-white">NDC: {medication.ndc_number}</Text>
                        </View>
                        {edit ? (
                            <TouchableOpacity onPress={handleDelete}>
                                <MaterialIcons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <Animated.View style={iconStyle}>
                                <AntDesign name="caretdown" size={20} color="white" />
                            </Animated.View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {expand && (
                <>
                    <View className="bg-white p-4 flex-row items-center">
                        <View className="w-[2px] bg-black mr-4 h-[100%]" />
                        <View className="flex-col space-y-4 pr-5">
                            <View>
                                <Text className="text-black font-bold">Description</Text>
                                <Text className="text-black">{medication.summary.description}</Text>
                            </View>
                            <View>
                                <Text className="text-black font-bold">
                                    Information for Patients
                                </Text>
                                <Text className="text-black">
                                    {medication.summary.information_for_patients}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-black font-bold">
                                    Storage and Handling Instructions
                                </Text>
                                <Text className="text-black">
                                    {medication.summary.storage_and_handling}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-black font-bold">Common Side Effects</Text>
                                <Text className="text-black">
                                    {medication.summary.contraindictions}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-black font-bold">
                                    Contraindictions (Do Not Use Case)
                                </Text>
                                <Text className="text-black">
                                    {medication.summary.contraindictions}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="bg-black p-4 rounded-b-lg">
                        <Text className="text-white mb-3 font-semibold">Ask Dr. Qura for:</Text>
                        <View className="flex-row space-x-4">
                            <TouchableOpacity className="flex-1 bg-white p-3 rounded-lg justify-center items-center">
                                <Text className="text-black font-bold">Summarization</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 bg-white p-3 rounded-lg justify-center items-center">
                                <Text className="text-black font-bold">Internet Sentiment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

export default Medication;
