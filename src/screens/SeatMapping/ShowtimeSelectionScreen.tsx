import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { useGetMovieDetailQuery } from '@store/index';
import { spacing } from '@theme/index';
import { DATE_OPTIONS, SHOWTIME_OPTIONS } from './seatData';
import TicketHeader from './TicketHeader';
import { showtimeStyles as styles } from './showtimeStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'ShowtimeSelection'>;

function MiniSeatMap() {
  return (
    <View style={styles.miniMap}>
      <View style={styles.miniMapScreen} />
      {[0, 1, 2, 3].map(row => (
        <View key={row} style={styles.miniMapRow}>
          {Array.from({ length: 10 }, (_, i) => (
            <View
              key={i}
              style={[
                styles.miniSeat,
                row >= 3 ? styles.miniSeatVip : i === 2 || i === 7 ? styles.miniSeatGrey : null,
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

/**
 * Figma screen 06 — date + showtime picker before the seat map.
 * Uses shared TicketHeader (centered title + cyan subtitle); no default
 * stack header.
 */
function ShowtimeSelectionScreen({ route, navigation }: Props) {
  const { movieId } = route.params;
  const insets = useSafeAreaInsets();
  const detailQuery = useGetMovieDetailQuery(movieId);
  const movieTitle = detailQuery.data?.title ?? 'Movie';
  const releaseSubtitle = useMemo(() => {
    const d = detailQuery.data?.release_date;
    if (!d) {
      return 'In Theaters';
    }
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
    if (!match) {
      return 'In Theaters';
    }
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return `In Theaters ${months[Number(match[2]) - 1]} ${Number(match[3])}, ${match[1]}`;
  }, [detailQuery.data]);

  const [selectedDateId, setSelectedDateId] = useState(DATE_OPTIONS[0].id);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState(SHOWTIME_OPTIONS[0].id);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelectSeats = useCallback(() => {
    const date = DATE_OPTIONS.find(d => d.id === selectedDateId) ?? DATE_OPTIONS[0];
    const show = SHOWTIME_OPTIONS.find(s => s.id === selectedShowtimeId) ?? SHOWTIME_OPTIONS[0];
    navigation.navigate('SeatMapping', {
      movieId,
      movieTitle,
      sessionLabel: `${date.fullDate}  |  ${show.time} Hall 1`,
    });
  }, [navigation, movieId, movieTitle, selectedDateId, selectedShowtimeId]);

  const bottomPad = Math.max(insets.bottom, 48);

  return (
    <View style={styles.container}>
      <TicketHeader
        title={movieTitle}
        subtitle={releaseSubtitle}
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
          {DATE_OPTIONS.map(date => {
            const selected = date.id === selectedDateId;
            return (
              <TouchableOpacity
                key={date.id}
                style={[styles.dateChip, selected && styles.dateChipSelected]}
                onPress={() => setSelectedDateId(date.id)}>
                <Text style={[styles.dateChipText, selected && styles.dateChipTextSelected]}>
                  {date.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.showtimeRow}>
          {SHOWTIME_OPTIONS.map(show => {
            const selected = show.id === selectedShowtimeId;
            return (
              <TouchableOpacity
                key={show.id}
                style={[styles.showtimeCard, selected && styles.showtimeCardSelected]}
                onPress={() => setSelectedShowtimeId(show.id)}
                activeOpacity={0.85}>
                <Text style={styles.showtimeTime}>
                  {show.time} <Text style={styles.showtimeHall}>{show.hall}</Text>
                </Text>
                <MiniSeatMap />
                <Text style={styles.priceLine}>
                  From <Text style={styles.priceStrong}>{show.fromPrice}$</Text> or{' '}
                  <Text style={styles.priceStrong}>{show.bonus} bonus</Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: spacing.md + bottomPad }]}>
        <Button title="Select Seats" onPress={handleSelectSeats} style={styles.selectButton} />
      </View>
    </View>
  );
}

export default ShowtimeSelectionScreen;
