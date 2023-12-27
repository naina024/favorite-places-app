
import {View, Pressable, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton({icon, size, color, onPress}){
    return (
        <Pressable
            style={({pressed}) => [styles.buttonContainer, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pressed: {
        opacity: 0.75,
    }
})

export default IconButton;