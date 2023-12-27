
import {View, StyleSheet} from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';

function AddPlace(){
    return (
        <View style={styles.rootContainer}>
            <PlaceForm/>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
})

export default AddPlace;