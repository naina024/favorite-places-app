import {Text, Pressable, StyleSheet} from 'react-native';
import { Colors } from '../../styles';

function CustomButton({children, onPress}){
    return (
        <Pressable
            style={({pressed}) => [styles.buttonContainer, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 12,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.15,
        borderRadius: 4,
    },

    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50,
    },

    pressed: {
        opacity: 0.75,
    },
})

export default CustomButton;