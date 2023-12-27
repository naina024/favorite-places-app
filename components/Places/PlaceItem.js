
import {View, Image, Text, StyleSheet} from 'react-native';

function PlaceItem({place, onSelect}){
    return (
        <Pressable 
            style={styles.rootContainer}
            onPress={onSelect}
        >
            <Image source={{uri: place.imageUri}}/>
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rootContainer: {

    }
})

export default PlaceItem;