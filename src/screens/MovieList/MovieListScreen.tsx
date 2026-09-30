import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { styles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieList'>;

/**
 * Screen 01 — Movie list.
 *
 * Bootstrap stub only: proves navigation + providers work. The real
 * `GET /3/movie/upcoming` list (with offline cache, loading/empty/error
 * states, and pagination) is its own slice — see docs/planning/.
 */
function MovieListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Movies</Text>
      <EmptyState
        title="Movie list coming soon"
        description="This screen will load upcoming movies from TMDb in the next slice."
        actionLabel="Open a sample movie"
        onAction={() => navigation.navigate('MovieDetail', { movieId: 0 })}
      />
    </View>
  );
}

export default MovieListScreen;
