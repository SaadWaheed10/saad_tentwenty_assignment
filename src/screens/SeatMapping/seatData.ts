export type SeatTier = 'regular' | 'vip';
export type SeatAvailability = 'available' | 'unavailable';

export type Seat = {
  id: string;
  row: string;
  number: number;
  tier: SeatTier;
  availability: SeatAvailability;
};

export type SeatRow = {
  row: string;
  tier: SeatTier;
  seats: Seat[];
};

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SEATS_PER_ROW = 10;
// Figma seat map: VIP rows toward the front, Regular behind.
const VIP_ROWS = new Set(['A', 'B', 'C']);

const UNAVAILABLE_SEAT_IDS = new Set([
  'C3',
  'C4',
  'D7',
  'E2',
  'E3',
  'F8',
  'G1',
  'G10',
  'H5',
  'H6',
  'I4',
  'J2',
]);

/** Figma legend prices — cosmetic only, no payment wired. */
export const SEAT_PRICE: Record<SeatTier, number> = {
  regular: 50,
  vip: 150,
};

export function buildSeatRows(): SeatRow[] {
  return ROWS.map(row => {
    const tier: SeatTier = VIP_ROWS.has(row) ? 'vip' : 'regular';
    const seats: Seat[] = Array.from({ length: SEATS_PER_ROW }, (_, index) => {
      const number = index + 1;
      const id = `${row}${number}`;
      return {
        id,
        row,
        number,
        tier,
        availability: UNAVAILABLE_SEAT_IDS.has(id) ? 'unavailable' : 'available',
      };
    });
    return { row, tier, seats };
  });
}
