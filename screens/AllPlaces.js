
import { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../database';

function AllPlaces(){
    const [places, setPlaces] = useState();

    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadPlaces(){
            const places = await fetchPlaces();
            setPlaces(places);
        }
        if (isFocused){
            loadPlaces();
        }
    }, [isFocused])

    return (
        <View style={styles.rootContainer}>
            <PlacesList places={places} />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
})

export default AllPlaces;