import { formatReleaseDate } from './date';

describe('formatReleaseDate', () => {
  it('formats a valid TMDb release_date into a short human date', () => {
    expect(formatReleaseDate('2026-12-25')).toBe('Dec 25, 2026');
  });

  it('falls back to a neutral label for an empty string', () => {
    expect(formatReleaseDate('')).toBe('Release date TBA');
  });

  it('falls back to a neutral label for null/undefined', () => {
    expect(formatReleaseDate(null)).toBe('Release date TBA');
    expect(formatReleaseDate(undefined)).toBe('Release date TBA');
  });

  it('falls back to a neutral label for an unparseable date', () => {
    expect(formatReleaseDate('not-a-date')).toBe('Release date TBA');
  });
});
