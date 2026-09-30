import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import { colors, spacing, typography } from '@theme/index';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

/**
 * Screen 02 — Movie detail.
 *
 * Bootstrap stub only. The real detail + full-screen autoplay trailer flow
 * (GET /3/movie/{id}, /videos, /images) is its own slice.
 */
function MovieDetailScreen({ route, navigation }: Props) {
  const { movieId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Detail</Text>
      <Text style={styles.subtitle}>movieId: {movieId}</Text>
      <Button
        title="Select seats"
        onPress={() => navigation.navigate('SeatMapping', { movieId })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
});

export default MovieDetailScreen;
