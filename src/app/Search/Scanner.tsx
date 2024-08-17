import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useCameraPermissions, CameraView, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMedications } from '@/src/hooks/useMedications';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const { searchByUPC } = useMedications();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        searchByUPC(data);
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
                    barcodeTypes: [
                        'aztec',
                        'ean13',
                        'ean8',
                        'qr',
                        'pdf417',
                        'upc_e',
                        'datamatrix',
                        'code39',
                        'code93',
                        'itf14',
                        'codabar',
                        'code128',
                        'upc_a',
                    ],
                    // 'aztec' | 'ean13' | 'ean8' | 'qr' | 'pdf417' | 'upc_e' | 'datamatrix' | 'code39' | 'code93' | 'itf14' | 'codabar' | 'code128' | 'upc_a'
                }}
                facing={facing}
            >
                <View className="flex-row px-5 absolute bottom-0 w-[100%] h-[20%] bg-black/50 self-center justify-between items-center">
                    <TouchableOpacity className="" onPress={handleExit}>
                        <Text className="text-white">Cancel</Text>
                    </TouchableOpacity>
                    <View className="w-12 h-12 justify-center items-center">
                        {scanned ? (
                            <FontAwesome name="check" size={24} color="#C23B22" />
                        ) : (
                            <ActivityIndicator size="large" color="#C23B22" />
                        )}
                    </View>
                    <View>
                        <TouchableOpacity onPress={toggleCameraFacing} className="">
                            <Ionicons name="camera-reverse-sharp" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
            {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
        </View>
    );
}
