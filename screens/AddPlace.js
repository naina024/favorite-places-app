
import {View, StyleSheet} from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { SCREENS } from '../constants';

function AddPlace({route, navigation}){
    if (route && route.params){
        const {pickedLatitude, pickedLongitude} = route.params
    }

    function addPlaceHandler(place){
        navigation.navigate(SCREENS.ALL_PLACES, {
            place
        })
    }

    return (
        <View style={styles.rootContainer}>
            <PlaceForm onAddPlace={addPlaceHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
})

export default AddPlace;