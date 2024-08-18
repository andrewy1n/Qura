import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useMedications } from '@/src/hooks/useMedications';
import { router } from 'expo-router';
import Medication from '@/src/components/Medication';
import { useMedicationsContext } from '@/src/context/MedicationsContext';
import Logo from '@/assets/images/red_with_text.svg';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {
    const [edit, setEdit] = useState(false);
    const { medicationsList, setMedicationsList } = useMedicationsContext();

    const handleOpenModal = () => {
        router.push('/Search/Modal');
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleEmpty = () => {
        Alert.alert(
            'Confirm Clear',
            'Are you sure you want to delete everything?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => setMedicationsList([]),
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View className="flex-1 justify-center bg-white">
            <View className="flex-col items-start w-full bg-black py-4 px-5 z-10 pt-[12%]">
                <Logo height={50} width={100} />
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-white text-2xl font-bold">My Medications</Text>
                    <View className="flex-row space-x-4">
                        {edit ? (
                            <>
                                <TouchableOpacity onPress={handleEmpty}>
                                    <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleEdit}>
                                    <MaterialIcons name="edit-off" size={24} color="white" />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity onPress={handleEdit}>
                                <MaterialIcons name="edit" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            <View className="flex-1 w-full">
                {medicationsList ? (
                    <FlatList
                        className="w-full"
                        data={medicationsList}
                        keyExtractor={(item) => item.ndc_number}
                        renderItem={({ index }) => (
                            <Medication medicationIndex={index} edit={edit} />
                        )}
                        ItemSeparatorComponent={() => <View className="h-3" />}
                        contentContainerStyle={{
                            paddingBottom: 170,
                            paddingTop: 20,
                            paddingHorizontal: 20,
                        }}
                    />
                ) : (
                    <Text className="text-center font-semibold mt-8">No Medications</Text>
                )}
            </View>
            <TouchableOpacity
                onPress={handleOpenModal}
                className="absolute bottom-[10%] right-[3%] w-16 h-16 bg-black rounded-full justify-center items-center shadow-lg"
            >
                <Text className="text-white text-2xl font-bold"> + </Text>
            </TouchableOpacity>
        </View>
    );
}
