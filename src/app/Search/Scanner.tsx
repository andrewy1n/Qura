import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useCameraPermissions, CameraView, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMedications } from '@/src/hooks/useMedications';
import { SearchMedicationInfo } from '@/src/types/Medication';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const { searchByUPC, addMedication } = useMedications();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        setLoading(true);
        const item: SearchMedicationInfo | undefined = await searchByUPC('0' + data);

        if (!item) {
            return;
        }

        const medicationAdded = await addMedication(item.ndc_number);

        if (medicationAdded) {
            Alert.alert(`${item.brand_name} has been added to your list!`);
            setLoading(false);
        }
    };

    const handleExit = () => {
        router.back();
    };

    return (
        <View className="flex-1 justify-center z-200">
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['upc_a'],
                    // 'aztec' | 'ean13' | 'ean8' | 'qr' | 'pdf417' | 'upc_e' | 'datamatrix' | 'code39' | 'code93' | 'itf14' | 'codabar' | 'code128' | 'upc_a'
                }}
                facing={facing}
            >
                <View className="flex-row px-10 absolute bottom-0 w-[100%] h-[20%] bg-black/50 self-center justify-between items-center">
                    <TouchableOpacity onPress={handleExit}>
                        <MaterialIcons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    <View className="w-15 h-15 justify-center items-center">
                        {scanned && !loading ? (
                            <>
                                <FontAwesome name="check" size={24} color="#C23B22" />
                                <Text className="text-white mt-1">Scanned!</Text>
                            </>
                        ) : (
                            <>
                                <ActivityIndicator size="large" color="#C23B22" />
                                <Text className="text-white mt-1">Scanning...</Text>
                            </>
                        )}
                    </View>
                    <View>
                        <TouchableOpacity onPress={toggleCameraFacing} className="">
                            <Ionicons name="camera-reverse-sharp" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
            {loading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/50">
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text className="mt-5 text-white">Summarizing Medication...</Text>
                </View>
            )}
            {scanned && !loading && (
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    className="bg-white py-5 px-5 rounded items-center self-center"
                >
                    <Text className="font-bold">Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
