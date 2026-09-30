import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from '@screens/MovieList';
import MovieDetailScreen from '@screens/MovieDetail';
import MovieSearchScreen from '@screens/MovieSearch';
import SeatMappingScreen from '@screens/SeatMapping';
import { colors } from '@theme/index';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MovieList"
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}>
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{ title: 'Upcoming Movies' }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{ title: 'Details' }}
        />
        <Stack.Screen
          name="MovieSearch"
          component={MovieSearchScreen}
          options={{ title: 'Search' }}
        />
        <Stack.Screen
          name="SeatMapping"
          component={SeatMappingScreen}
          options={{ title: 'Select Seats' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
