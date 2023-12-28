
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { SCREENS } from '../constants';
import { fetchPlaceDetails } from '../database';
import { Colors } from '../styles';

function PlaceDetails({route, navigation}){

    const [fetchedPlace, setFetchedPlace] = useState();

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function loadPlaceData(){
            const details = await fetchPlaceDetails(selectedPlaceId);
            setFetchedPlace(details);
            navigation.setOptions({
                title: details.title,
            })
        }
        loadPlaceData();
    }, [selectedPlaceId])

    function viewOnMapHandler(){
        navigation.navigate(SCREENS.MAP, {
            initialLatitude: fetchedPlace.location.latitude,
            initialLongitude: fetchedPlace.location.longitude
        })

    }

    if (!fetchedPlace){
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>Loading place data...</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
                <OutlinedButton icon='map' onPress={viewOnMapHandler} >
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
    },

    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    addressContainer: {
        padding: 20,
    },

    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },

    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fallbackText: {
        fontSize: 16,
    },

})

export default PlaceDetails;