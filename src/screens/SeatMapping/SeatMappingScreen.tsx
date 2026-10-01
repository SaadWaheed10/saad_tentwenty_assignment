import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { colors, spacing } from '@theme/index';
import { buildSeatRows, SEAT_PRICE, type Seat } from './seatData';
import SeatButton from './SeatButton';
import { styles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'SeatMapping'>;

const SEAT_GAP = 4;
const ROW_LABEL_WIDTH = 22;
const MIN_SEAT_SIZE = 22;
const MAX_SEAT_SIZE = 30;

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendSwatch, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

/**
 * Screen 04 — Seat mapping (Figma screen 07). UI ONLY: no booking API,
 * persistence, payment, or network. Selection is local component state.
 */
function SeatMappingScreen({ route: _route }: Props) {
  const { width } = useWindowDimensions();
  // Same 3-button Android system-nav fix used on the tab bar — edge-to-
  // edge is enabled (android/gradle.properties), so without insets.bottom
  // the Total Price / Proceed to pay bar sits under the device nav buttons.
  // Floor at 48 when insets report 0 (some Android WebView/edge-to-edge
  // timing quirks); the device's 3-button bar is ~48dp / 84px.
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 48);
  const seatRows = useMemo(() => buildSeatRows(), []);
  const seatsPerRow = seatRows[0]?.seats.length ?? 0;

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

  const handleClear = useCallback(() => setSelectedIds(new Set()), []);

  const selectedSeats = useMemo(
    () => seatRows.flatMap(r => r.seats).filter(seat => selectedIds.has(seat.id)),
    [seatRows, selectedIds],
  );

  const totalPrice = useMemo(
    () => selectedSeats.reduce((sum, seat) => sum + SEAT_PRICE[seat.tier], 0),
    [selectedSeats],
  );

  const selectionSummary =
    selectedSeats.length > 0
      ? `${selectedSeats.map(s => s.number).join(', ')} / ${selectedSeats[0]?.row ?? ''} row`
      : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.screenIndicatorWrap}>
          <View style={styles.screenIndicator} />
          <Text style={styles.screenLabel}>SCREEN</Text>
        </View>

        <View style={styles.grid}>
          {seatRows.map(row => (
            <View key={row.row} style={styles.row}>
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
          ))}
        </View>

        {selectionSummary ? (
          <TouchableOpacity style={styles.selectionChip} onPress={handleClear}>
            <Text style={styles.selectionChipText}>{selectionSummary}</Text>
            <Text style={styles.selectionChipClear}>✕</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.legend}>
          <LegendItem color={colors.secondaryGold} label="Selected" />
          <LegendItem color={colors.grayMid} label="Not available" />
          <LegendItem color={colors.secondaryPurple} label={`VIP (${SEAT_PRICE.vip}$)`} />
          <LegendItem color={colors.primary} label={`Regular (${SEAT_PRICE.regular}$)`} />
        </View>
      </ScrollView>

      <View style={[styles.summaryBar, { paddingBottom: spacing.md + bottomPad }]}>
        <View style={styles.pricePill}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>$ {totalPrice}</Text>
        </View>
        <Button
          title="Proceed to pay"
          disabled={selectedSeats.length === 0}
          style={[styles.bookButton, selectedSeats.length === 0 && styles.bookButtonDisabled]}
        />
      </View>
    </View>
  );
}

export default SeatMappingScreen;
