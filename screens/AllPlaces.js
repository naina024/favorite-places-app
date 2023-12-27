
import {View, StyleSheet} from 'react-native';
import PlacesList from '../components/Places/PlacesList';

function AllPlaces(){
    return (
        <View style={styles.rootContainer}>
            <PlacesList />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
})

export default AllPlaces;