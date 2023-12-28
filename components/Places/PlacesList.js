
import {View, FlatList, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles';
import PlaceItem from './PlaceItem';
import { SCREENS } from '../../constants';

function PlacesList({places}){

    const navigation = useNavigation();

    function selectPlaceHandler(id){
        navigation.navigate(SCREENS.PLACE_DETAILS, {
            placeId: id
        })
    }

    if (!places || !places.length){
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No Places added yet.</Text>
            </View>
        )
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
        />
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

    list: {
        margin: 24,
    }
})

export default PlacesList;