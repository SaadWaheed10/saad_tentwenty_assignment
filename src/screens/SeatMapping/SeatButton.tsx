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

/** Figma seat glyph — rounded-top rectangle (VIP purple / Regular blue / grey / gold). */
function SeatButton({ seat, isSelected, size, onToggle }: SeatButtonProps) {
  const isUnavailable = seat.availability === 'unavailable';

  return (
    <TouchableOpacity
      disabled={isUnavailable}
      onPress={() => onToggle(seat)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled: isUnavailable, selected: isSelected }}
      accessibilityLabel={`Seat ${seat.number} row ${seat.row}${
        isUnavailable ? ', unavailable' : isSelected ? ', selected' : ', available'
      }`}
      style={[styles.seatHit, { width: size, height: size * 0.85 }]}>
      <View
        style={[
          styles.seat,
          {
            width: size * 0.78,
            height: size * 0.55,
            borderTopLeftRadius: size * 0.35,
            borderTopRightRadius: size * 0.35,
          },
          seat.tier === 'vip' ? styles.seatVip : styles.seatRegular,
          isSelected && styles.seatSelected,
          isUnavailable && styles.seatUnavailable,
        ]}
      />
    </TouchableOpacity>
  );
}

export default SeatButton;
