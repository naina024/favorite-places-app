
import {View, StyleSheet, Alert, Image, Text} from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../styles';

import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker({onTakeImage}){

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions(); // Required for ios permissions
    const [pickedImage, setPickedImage] = useState();

    async function verifyPermissions(){
        if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        } else {
            if (cameraPermissionInfo.status === PermissionStatus.DENIED){
                Alert.alert(
                    'Insufficient Permissions',
                    'You need to grant camera permissions to use this app'
                );
                return false;
            }
            return true;
        }
    }

    async function takePhotoHandler(){
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return;
        }
        const photo = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });

        setPickedImage(photo.assets[0].uri);
        onTakeImage(photo.assets[0].uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon='camera' onPress={takePhotoHandler}>Take Photo</OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },

    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },

    image: {
        width: '100%',
        height: '100%',
    }
})

export default ImagePicker;