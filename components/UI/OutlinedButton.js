import {Text, Pressable, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles';

function OutlinedButton({icon, children, onPress}){
    return (
        <Pressable
            style={({pressed}) => [styles.buttonContainer, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500
    },

    pressed: {
        opacity: 0.75,
    },

    icon: {
        marginRight: 6,
    },

    text: {
        color: Colors.primary500,
    }
})

export default OutlinedButton;