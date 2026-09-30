import { getTmdbImageUrl } from './tmdbImage';

describe('getTmdbImageUrl', () => {
  it('builds a full TMDb image URL for a given path and size', () => {
    expect(getTmdbImageUrl('/abc123.jpg', 'w342')).toBe(
      'https://image.tmdb.org/t/p/w342/abc123.jpg',
    );
  });

  it('defaults to the w342 size when none is given', () => {
    expect(getTmdbImageUrl('/abc123.jpg')).toBe('https://image.tmdb.org/t/p/w342/abc123.jpg');
  });

  it('returns null when there is no path, so callers can render a placeholder', () => {
    expect(getTmdbImageUrl(null)).toBeNull();
    expect(getTmdbImageUrl(undefined)).toBeNull();
    expect(getTmdbImageUrl('')).toBeNull();
  });
});
