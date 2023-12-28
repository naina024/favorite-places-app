import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';

import { SCREENS } from './constants';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';

import IconButton from './components/UI/IconButton';
import { Colors } from './styles';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialised, setDbInitialised] = useState(false);

  useEffect(() => {
    init()
    .then(() => {
      setDbInitialised(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  if (!dbInitialised){
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700},
        }}>
          <Stack.Screen
            name={SCREENS.ALL_PLACES}
            component={AllPlaces}
            title="Your Favorite Places"
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate(SCREENS.ADD_PLACE)}
                />
              ),
            })}
          />
          <Stack.Screen
            name={SCREENS.ADD_PLACE}
            component={AddPlace}
            title="Add a new Place"
          />
          <Stack.Screen
            name={SCREENS.MAP}
            component={Map}
            title="Pick Location"
          />
          <Stack.Screen
            name={SCREENS.PLACE_DETAILS}
            component={PlaceDetails}
            title="Details"
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
