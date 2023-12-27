
import {View, FlatList, Text, StyleSheet} from 'react-native';
import { Colors } from '../../styles';
import PlaceItem from './PlaceItem';

function PlacesList({places}){

    function onSelect(){

    }

    if (!places || !places.length){
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No Places added yet.</Text>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <PlaceItem place={item} onSelect={onSelect}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fallbackContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },

    rootContainer: {

    }
})

export default PlacesList;