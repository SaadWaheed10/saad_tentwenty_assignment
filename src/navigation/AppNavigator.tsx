import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HeaderSearchButton } from '@components/index';
import MovieListScreen from '@screens/MovieList';
import MovieDetailScreen from '@screens/MovieDetail';
import MovieSearchScreen from '@screens/MovieSearch';
import SeatMappingScreen from '@screens/SeatMapping';
import { colors, typography } from '@theme/index';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type MovieListNavigation = NativeStackNavigationProp<RootStackParamList, 'MovieList'>;

// Defined at module scope (not inside AppNavigator's render) so it's a
// stable component reference, not a new one created on every render — see
// react/no-unstable-nested-components.
function MovieListHeaderRight({ navigation }: { navigation: MovieListNavigation }) {
  return <HeaderSearchButton onPress={() => navigation.navigate('MovieSearch')} />;
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MovieList"
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          // Matches the Figma header treatment (frame 42:13911, "Watch"):
          // left-aligned, Poppins Medium 16 — not a bold centered title.
          headerTitleAlign: 'left',
          headerTitleStyle: { ...typography.h3, color: colors.text },
        }}>
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={({ navigation }) => ({
            title: 'Upcoming Movies',
            // Matches the search icon in the Figma header (frame 42:13911).
            // `MovieListHeaderRight` itself is a stable, module-scope
            // component (not defined inline), so this wrapper carries no
            // remount risk despite the lint rule's generic heuristic —
            // React Navigation's `headerRight` option is, by its own API
            // contract, always re-evaluated as a function per render.
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <MovieListHeaderRight navigation={navigation} />,
          })}
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
