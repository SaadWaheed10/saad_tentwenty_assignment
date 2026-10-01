export type SeatTier = 'standard' | 'premium';
export type SeatAvailability = 'available' | 'unavailable';

export type Seat = {
  id: string; // e.g. "A1"
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

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 10;
const PREMIUM_ROWS = new Set(['A', 'B']);

// Fixed, deterministic "already booked" seats — fake static data standing
// in for a real seat-availability backend, which this UI-only screen
// never calls (.cursor/rules/04-screens-ux.mdc / 00-assignment-core.mdc:
// "no booking logic, no persistence, no payment, no network calls").
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
]);

/** Fake per-tier pricing — purely cosmetic, no payment/booking wired to it. */
export const SEAT_PRICE: Record<SeatTier, number> = {
  standard: 10,
  premium: 18,
};

export function buildSeatRows(): SeatRow[] {
  return ROWS.map(row => {
    const tier: SeatTier = PREMIUM_ROWS.has(row) ? 'premium' : 'standard';
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
