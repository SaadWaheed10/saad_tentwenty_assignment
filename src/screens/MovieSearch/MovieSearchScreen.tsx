import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '@components/index';
import { colors, spacing, typography } from '@theme/index';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieSearch'>;

/**
 * Screen 03 — Movie search.
 *
 * Bootstrap stub only. The real search-freshness-guaranteed flow
 * (GET /3/search/movie, abort stale requests) is its own slice.
 */
function MovieSearchScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <EmptyState
        title="Search coming soon"
        description="Type a query to search TMDb. Results will always match your current query."
        actionLabel="Open a sample result"
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

export default MovieSearchScreen;
