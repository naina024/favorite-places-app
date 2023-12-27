
import { useState } from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet} from 'react-native';
import { Colors } from '../../styles';
import ImagePicker from './ImagePicker';

function PlaceForm(){

    const [enteredTitle, setEnteredTitle] = useState('');

    function changeTitleHandler(enteredText){
        setEnteredTitle(enteredText);
    }

    return (
      <ScrollView style={styles.rootContainer}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={enteredTitle}
            onChange={changeTitleHandler}
          />
        </View>
        <ImagePicker/>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
    },

    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },

    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
})

export default PlaceForm;