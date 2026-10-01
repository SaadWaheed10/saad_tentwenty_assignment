import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { colors, spacing } from '@theme/index';
import { buildSeatRows, SEAT_PRICE, type Seat } from './seatData';
import SeatButton from './SeatButton';
import { styles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'SeatMapping'>;

const SEAT_GAP = 6;
const ROW_LABEL_WIDTH = 20;
const MIN_SEAT_SIZE = 22;
const MAX_SEAT_SIZE = 32;

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendSwatch, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

/**
 * Screen 04 — Seat mapping. UI ONLY (.cursor/rules/00-assignment-core.mdc,
 * .cursor/rules/04-screens-ux.mdc): no booking API, no persistence, no
 * payment, no network calls. Selection state is local component state —
 * intentionally lost on navigating away, which is exactly what "no
 * persistence" calls for here. `movieId` is accepted (so this screen is
 * reachable per-movie from Detail) but never used to fetch anything.
 *
 * Seat data (seatData.ts) is fixed, fake, and deterministic — standing in
 * for a real seat-availability backend this screen never calls. "Book Now"
 * is intentionally a dead-end (no booking flow exists in this assignment)
 * — it only reflects selection state, never submits anything.
 */
function SeatMappingScreen({ route: _route }: Props) {
  const { width } = useWindowDimensions();
  const seatRows = useMemo(() => buildSeatRows(), []);
  const seatsPerRow = seatRows[0]?.seats.length ?? 0;

  // Responsive seat sizing so the grid stays aligned and fully visible in
  // both portrait and landscape (.cursor/rules/04-screens-ux.mdc: "Works in
  // portrait and landscape without breaking alignment") — recomputed on
  // every width change (i.e. on rotation) via useWindowDimensions.
  const seatSize = useMemo(() => {
    const availableWidth = width - spacing.lg * 2 - ROW_LABEL_WIDTH;
    const sizeFromWidth = (availableWidth - SEAT_GAP * (seatsPerRow - 1)) / seatsPerRow;
    return Math.max(MIN_SEAT_SIZE, Math.min(MAX_SEAT_SIZE, Math.floor(sizeFromWidth)));
  }, [width, seatsPerRow]);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleToggleSeat = useCallback((seat: Seat) => {
    setSelectedIds(previous => {
      const next = new Set(previous);
      if (next.has(seat.id)) {
        next.delete(seat.id);
      } else {
        next.add(seat.id);
      }
      return next;
    });
  }, []);

  const selectedSeats = useMemo(
    () => seatRows.flatMap(r => r.seats).filter(seat => selectedIds.has(seat.id)),
    [seatRows, selectedIds],
  );

  const totalPrice = useMemo(
    () => selectedSeats.reduce((sum, seat) => sum + SEAT_PRICE[seat.tier], 0),
    [selectedSeats],
  );

  let previousTier: string | null = null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.screenIndicatorWrap}>
          <View style={styles.screenIndicator} />
          <Text style={styles.screenLabel}>SCREEN</Text>
        </View>

        <View style={styles.grid}>
          {seatRows.map(row => {
            const showTierLabel = row.tier !== previousTier;
            previousTier = row.tier;
            return (
              <React.Fragment key={row.row}>
                {showTierLabel ? (
                  <Text style={styles.tierLabel}>
                    {row.tier === 'premium' ? 'Premium' : 'Standard'} — ${SEAT_PRICE[row.tier]}
                  </Text>
                ) : null}
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>{row.row}</Text>
                  <View style={styles.seatsInRow}>
                    {row.seats.map(seat => (
                      <SeatButton
                        key={seat.id}
                        seat={seat}
                        size={seatSize}
                        isSelected={selectedIds.has(seat.id)}
                        onToggle={handleToggleSeat}
                      />
                    ))}
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        <View style={styles.legend}>
          <LegendItem color={colors.surface} label="Available" />
          <LegendItem color={colors.primary} label="Selected" />
          <LegendItem color={colors.surfaceMuted} label="Unavailable" />
        </View>
      </ScrollView>

      <View style={styles.summaryBar}>
        <View>
          <Text style={styles.summaryCount}>
            {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'} selected
          </Text>
          <Text style={styles.summaryLabels} numberOfLines={1}>
            {selectedSeats.length > 0
              ? selectedSeats.map(seat => seat.id).join(', ')
              : 'Tap seats to select'}
          </Text>
        </View>
        <Button
          title={`Book Now · $${totalPrice}`}
          disabled={selectedSeats.length === 0}
          style={[styles.bookButton, selectedSeats.length === 0 && styles.bookButtonDisabled]}
        />
      </View>
    </View>
  );
}

export default SeatMappingScreen;
