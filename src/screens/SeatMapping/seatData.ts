export type SeatTier = 'regular' | 'vip';
export type SeatAvailability = 'available' | 'unavailable';

export type Seat = {
  id: string;
  /** 1-based row index (Figma labels rows 1–10 on the left). */
  row: number;
  number: number;
  tier: SeatTier;
  availability: SeatAvailability;
};

export type SeatRow = {
  row: number;
  tier: SeatTier;
  seats: Seat[];
};

const ROW_COUNT = 10;
// Figma: each row has left(4) · aisle · center(6) · aisle · right(4) — 14 seats.
const LEFT_COUNT = 4;
const CENTER_COUNT = 6;
const RIGHT_COUNT = 4;
export const SEATS_PER_ROW = LEFT_COUNT + CENTER_COUNT + RIGHT_COUNT;
/** Seat indices (0-based) after which an aisle gap is drawn. */
export const AISLE_AFTER_INDEX = new Set([LEFT_COUNT - 1, LEFT_COUNT + CENTER_COUNT - 1]);

// Figma: VIP is the back two rows (9–10).
const VIP_ROWS = new Set([9, 10]);

const UNAVAILABLE: Array<[number, number]> = [
  [1, 2],
  [1, 3],
  [2, 5],
  [2, 6],
  [3, 8],
  [4, 1],
  [4, 14],
  [5, 4],
  [5, 5],
  [6, 10],
  [7, 3],
  [8, 7],
  [8, 8],
  [9, 2],
  [10, 11],
];

const UNAVAILABLE_SEAT_IDS = new Set(UNAVAILABLE.map(([r, n]) => `${r}-${n}`));

export const SEAT_PRICE: Record<SeatTier, number> = {
  regular: 50,
  vip: 150,
};

export function buildSeatRows(): SeatRow[] {
  return Array.from({ length: ROW_COUNT }, (_row, rowIndex) => {
    const row = rowIndex + 1;
    const tier: SeatTier = VIP_ROWS.has(row) ? 'vip' : 'regular';
    const seats: Seat[] = Array.from({ length: SEATS_PER_ROW }, (_seat, seatIndex) => {
      const number = seatIndex + 1;
      const id = `${row}-${number}`;
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

/** Fake showtimes for Screen 06 — UI only, no booking backend. */
export type ShowtimeOption = {
  id: string;
  time: string;
  hall: string;
  fromPrice: number;
  bonus: number;
};

export const SHOWTIME_OPTIONS: ShowtimeOption[] = [
  { id: 's1', time: '12:30', hall: 'Cinetech + Hall 1', fromPrice: 50, bonus: 2500 },
  { id: 's2', time: '13:30', hall: 'Cinetech + Hall 2', fromPrice: 75, bonus: 3000 },
  { id: 's3', time: '15:00', hall: 'Cinetech + Hall 1', fromPrice: 50, bonus: 2500 },
];

export type DateOption = {
  id: string;
  label: string;
  fullDate: string;
};

export const DATE_OPTIONS: DateOption[] = [
  { id: 'd1', label: '5 Mar', fullDate: 'March 5, 2021' },
  { id: 'd2', label: '6 Mar', fullDate: 'March 6, 2021' },
  { id: 'd3', label: '7 Mar', fullDate: 'March 7, 2021' },
  { id: 'd4', label: '8 Mar', fullDate: 'March 8, 2021' },
  { id: 'd5', label: '9 Mar', fullDate: 'March 9, 2021' },
];
