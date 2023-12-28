
import {Pressable, View, Image, Text, StyleSheet} from 'react-native';
import { Colors } from '../../styles';

function PlaceItem({place, onSelect}){
    return (
        <Pressable 
            style={({pressed}) => [styles.rootContainer, pressed && styles.pressed]}
            onPress={onSelect.bind(this, place.id)}
        >
            <Image style={styles.image} source={{uri: place.imageUri}}/>
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.15,
    },

    image: {
        flex: 1,
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
    },

    info: {
        flex: 2,
        padding: 12,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700,
    },

    address: {
        fontSize: 12,
        color: Colors.gray700,
    },

    pressed: {
        opacity: 0.8,
    }
})

export default PlaceItem;