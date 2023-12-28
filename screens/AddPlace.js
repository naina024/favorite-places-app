
import {View, StyleSheet} from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { SCREENS } from '../constants';
import { insertPlace } from '../database';

function AddPlace({navigation}){

    async function addPlaceHandler(place){
        await insertPlace(place);
        navigation.navigate(SCREENS.ALL_PLACES);
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