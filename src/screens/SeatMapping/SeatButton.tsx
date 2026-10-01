import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import type { Seat } from './seatData';
import { styles } from './style';

type SeatButtonProps = {
  seat: Seat;
  isSelected: boolean;
  size: number;
  onToggle: (seat: Seat) => void;
};

/**
 * Seat cell — filled rectangle matching Figma's seat map (screen 07):
 * gold = selected, grey = unavailable, purple = VIP, light blue = regular.
 */
function SeatButton({ seat, isSelected, size, onToggle }: SeatButtonProps) {
  const isUnavailable = seat.availability === 'unavailable';

  return (
    <TouchableOpacity
      disabled={isUnavailable}
      onPress={() => onToggle(seat)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled: isUnavailable, selected: isSelected }}
      accessibilityLabel={`Seat ${seat.id}${
        isUnavailable ? ', unavailable' : isSelected ? ', selected' : ', available'
      }`}
      style={[styles.seatHit, { width: size, height: size }]}>
      <View
        style={[
          styles.seat,
          { width: size * 0.85, height: size * 0.55 },
          seat.tier === 'vip' ? styles.seatVip : styles.seatRegular,
          isSelected && styles.seatSelected,
          isUnavailable && styles.seatUnavailable,
        ]}
      />
    </TouchableOpacity>
  );
}

export default SeatButton;
