import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { styles } from './style';

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

export default SeatMappingScreen;
