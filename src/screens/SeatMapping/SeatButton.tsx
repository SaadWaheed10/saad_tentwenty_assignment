import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { Seat } from './seatData';
import { styles } from './style';

type SeatButtonProps = {
  seat: Seat;
  isSelected: boolean;
  size: number;
  onToggle: (seat: Seat) => void;
};

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
      style={[
        styles.seat,
        { width: size, height: size, borderRadius: size / 4 },
        seat.tier === 'premium' && styles.seatPremium,
        isSelected && styles.seatSelected,
        isUnavailable && styles.seatUnavailable,
      ]}>
      <Text
        style={[
          styles.seatLabel,
          isSelected && styles.seatLabelSelected,
          isUnavailable && styles.seatLabelUnavailable,
        ]}>
        {seat.number}
      </Text>
    </TouchableOpacity>
  );
}

export default SeatButton;
