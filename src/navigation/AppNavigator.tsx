import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';
import { colors } from '@theme/index';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
