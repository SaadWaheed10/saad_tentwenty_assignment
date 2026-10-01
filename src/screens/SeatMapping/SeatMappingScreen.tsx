import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { colors, spacing } from '@theme/index';
import TicketHeader from './TicketHeader';
import {
  AISLE_AFTER_INDEX,
  buildSeatRows,
  SEAT_PRICE,
  SEATS_PER_ROW,
  type Seat,
} from './seatData';
import SeatButton from './SeatButton';
import { styles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'SeatMapping'>;

const SEAT_GAP = 3;
const ROW_LABEL_WIDTH = 24;
const AISLE_WIDTH = 14;
const MIN_SEAT_SIZE = 16;
const MAX_SEAT_SIZE = 28;

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendSwatch, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

/**
 * Screen 04 / Figma 07 — Seat map. Custom header (movie + session), no
 * default stack header. UI only — no booking/payment/persistence.
 */
function SeatMappingScreen({ route, navigation }: Props) {
  const { movieTitle, sessionLabel } = route.params;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 48);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const seatRows = useMemo(() => buildSeatRows(), []);
  const [zoom, setZoom] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const baseSeatSize = useMemo(() => {
    const aisleCount = AISLE_AFTER_INDEX.size;
    const available =
      width - spacing.md * 2 - spacing.sm * 2 - ROW_LABEL_WIDTH - aisleCount * AISLE_WIDTH;
    const size = (available - SEAT_GAP * (SEATS_PER_ROW - 1)) / SEATS_PER_ROW;
    return Math.max(MIN_SEAT_SIZE, Math.min(MAX_SEAT_SIZE, Math.floor(size)));
  }, [width]);

  const seatSize = Math.round(baseSeatSize * zoom);

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

  // Figma chip format: "4 / 3 row" (seat number / row number).
  const selectionSummary =
    selectedSeats.length === 1
      ? `${selectedSeats[0].number} / ${selectedSeats[0].row} row`
      : selectedSeats.length > 1
        ? `${selectedSeats.map(s => s.number).join(', ')} / ${selectedSeats[0].row} row`
        : null;

  return (
    <View style={styles.container}>
      <TicketHeader
        title={movieTitle}
        subtitle={sessionLabel}
        onBack={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mapOuterScroll}>
        <View style={styles.mapArea}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mapScrollContent}>
            <View>
              <View style={styles.screenIndicatorWrap}>
                <Text style={styles.screenLabel}>SCREEN</Text>
                <View style={styles.screenIndicator} />
              </View>
              {seatRows.map(row => (
                <View key={row.row} style={styles.row}>
                  <Text style={styles.rowLabel}>{row.row}</Text>
                  <View style={styles.seatsInRow}>
                    {row.seats.map((seat, index) => (
                      <React.Fragment key={seat.id}>
                        <SeatButton
                          seat={seat}
                          size={seatSize}
                          isSelected={selectedIds.has(seat.id)}
                          onToggle={handleToggleSeat}
                        />
                        {AISLE_AFTER_INDEX.has(index) ? <View style={styles.aisleGap} /> : null}
                      </React.Fragment>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.zoomRow}>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={() => setZoom(z => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
              accessibilityLabel="Zoom in">
              <Text style={styles.zoomButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={() => setZoom(z => Math.max(0.75, Number((z - 0.15).toFixed(2))))}
              accessibilityLabel="Zoom out">
              <Text style={styles.zoomButtonText}>−</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.belowMap}>
          <View style={styles.legend}>
            <LegendItem color={colors.secondaryGold} label="Selected" />
            <LegendItem color={colors.grayMid} label="Not available" />
            <LegendItem color={colors.secondaryPurple} label={`VIP (${SEAT_PRICE.vip}$)`} />
            <LegendItem color={colors.primary} label={`Regular (${SEAT_PRICE.regular}$)`} />
          </View>

          {selectionSummary ? (
            <TouchableOpacity style={styles.selectionChip} onPress={handleClear}>
              <Text style={styles.selectionChipText}>{selectionSummary}</Text>
              <Text style={styles.selectionChipClear}>✕</Text>
            </TouchableOpacity>
          ) : null}
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
