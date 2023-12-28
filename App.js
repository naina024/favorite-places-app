import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from './constants';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';

import IconButton from './components/UI/IconButton';
import { Colors } from './styles';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();

export default function App() {
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
