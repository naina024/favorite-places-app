import {View, StyleSheet, Alert, Image, Text} from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useEffect, useState } from 'react';
import { Colors } from '../../styles';

import OutlinedButton from '../UI/OutlinedButton';
import { SCREENS } from '../../constants';
import { getAddress, getMapPreview } from '../../utils';

function LocationPicker({onPickLocaton}){

    const navigation = useNavigation();
    const route = useRoute();

    const [pickedLocation, setPickedLocation] = useState();

    const isFocused = useIsFocused();

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions(); // Required for ios permissions

    useEffect(() => {
        if(isFocused && route.params){
            const mapPickedLocation = {
                latitude: route.params.pickedLatitude,
                longitude: route.params.pickedLongitude,
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused])

    useEffect(() => {
        async function handleLocation(){
            if (pickedLocation){
                const address = await getAddress(pickedLocation.latitude, pickedLocation.longitude);
                onPickLocaton({...pickedLocation, address});
            }
        }
        handleLocation();
    }, [pickedLocation]);

    async function verifyPermissions(){
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        } else {
            if (locationPermissionInfo.status === PermissionStatus.DENIED){
                Alert.alert(
                    'Insufficient Permissions',
                    'You need to grant location permissions to use this app'
                );
                return false;
            }
            return true;
        }
    }

    async function getLocationHandler(){
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return;
        }
        const location = await getCurrentPositionAsync();
        const {latitude, longitude} = location.coords;
        setPickedLocation({
            latitude,
            longitude
        });
    }

    function pickOnMapHandler(){
        navigation.navigate(SCREENS.MAP);
    }

    let locationPreview = <Text>No Location picked yet.</Text>

    if (pickedLocation){
        locationPreview = (
          <Image style={styles.mapImage}
            source={{
              uri: getMapPreview(
                pickedLocation.latitude,
                pickedLocation.longitude
              )
            }}
          />
        );
    }

    return (
        <View>
            <View style={styles.locationPreview}>{locationPreview}</View>
            <View style={styles.buttonsContainer}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({

    locationPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },

    mapImage: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    }
})

export default LocationPicker;