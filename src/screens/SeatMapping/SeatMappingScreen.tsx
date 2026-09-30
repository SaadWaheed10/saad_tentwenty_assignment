import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '@theme/index';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SeatMapping'>;

/**
 * Screen 04 — Seat mapping. UI ONLY — no booking, persistence, or payment.
 *
 * Bootstrap stub only. The real seat grid (available/selected/unavailable
 * states, portrait + landscape) is its own slice.
 */
function SeatMappingScreen({ route }: Props) {
  const { movieId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seat Mapping</Text>
      <Text style={styles.subtitle}>movieId: {movieId} · UI only, no booking logic</Text>
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
    textAlign: 'center',
  },
});

export default SeatMappingScreen;
