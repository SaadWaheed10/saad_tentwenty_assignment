import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '@components/index';
import { colors, spacing, typography } from '@theme/index';
import type { RootStackParamList } from '@navigation/types';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
});

export default MovieListScreen;
