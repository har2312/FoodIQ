import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {backgroundColor: '#FF6B6B'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: 'Restaurant Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
