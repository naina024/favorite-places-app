
import { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import PlacesList from '../components/Places/PlacesList';

function AllPlaces({route}){

    const [places, setPlaces] = useState();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params){
            setPlaces((currentState) => [...currentState, route.params.place]);
        }
    }, [isFocused, route])

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