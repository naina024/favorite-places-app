
import { useCallback, useState } from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet} from 'react-native';
import { Place } from '../../models/place';
import { Colors } from '../../styles';
import CustomButton from '../UI/CustomButton';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

function PlaceForm({onAddPlace}){

    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    function changeTitleHandler(enteredText){
      setEnteredTitle(enteredText);
    }

    function takeImageHandler(imageUri){
      setSelectedImage(imageUri);
    }

    function pickLocationHandler(location){
      setSelectedLocation(location);
    };

    function savePlaceHandler(){
      const newPlace = new Place(enteredTitle, selectedImage, selectedLocation);
      onAddPlace(newPlace);
    }

    return (
      <ScrollView style={styles.rootContainer}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={changeTitleHandler}
            value={enteredTitle}
          />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocaton={pickLocationHandler} />
        <CustomButton onPress={savePlaceHandler}>Save</CustomButton>
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