
import { useLayoutEffect, useState } from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SCREENS } from '../constants';

import IconButton from '../components/UI/IconButton';

function Map({navigation, route}){

    const initialLocation = route.params && {
        latitude: route.params.initialLatitude,
        longitude: route.params.initialLongitude
    }

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const region = {
        latitude: initialLocation ? initialLocation.initialLatitude : 37.78,
        longitude: initialLocation ? initialLocation.initialLongitude : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    useLayoutEffect(() => {
        if(initialLocation){
            return;
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                  icon="save"
                  size={24}
                  color={tintColor}
                  onPress={savePickedLocationHandler}
                />
              ),
        })
    }, [navigation, savePickedLocationHandler, initialLocation])

    function selectLocationHandler(event){
        if (initialLocation){
            return;
        }
        const latitude = event.nativeEvent.coordinate.latitude;
        const longitude = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({
            latitude: latitude,
            longitude: longitude
        });
    }

    function savePickedLocationHandler() {
        if (!selectedLocation){
            Alert.alert(
                'No location picked',
                'You have to pick a location first!'
            )
            return;
        }
        navigation.navigate(SCREENS.ADD_PLACE, {
            pickedLatitude: selectedLocation.latitude,
            pickedLongitude: selectedLocation.longitude
        });
    };

    return (
        <MapView
          style={styles.map}
          initialRegion={region}
          onPress={selectLocationHandler}
        >
          {
            selectedLocation && (<Marker
                title='Picked Location'
                coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                }}
            />)
          }
        </MapView>
    );
}

const styles = StyleSheet.create({

    map: {
        width: '100%',
        height: '100%',
    },
})

export default Map;