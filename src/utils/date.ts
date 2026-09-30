const MONTH_ABBREVIATIONS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

const RELEASE_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Formats a TMDb `release_date` ("YYYY-MM-DD", sometimes empty) into a
 * short human-readable date, e.g. "Dec 25, 2026".
 *
 * Deliberately does NOT go through `new Date(...)` /
 * `toLocaleDateString(...)`: date-only ISO strings are parsed as UTC
 * midnight, but `toLocaleDateString` renders in the device's local
 * timezone, which silently shifts the displayed day backward for any
 * timezone behind UTC. Parsing the parts ourselves keeps this
 * deterministic regardless of device timezone.
 */
export function formatReleaseDate(releaseDate: string | null | undefined): string {
  if (!releaseDate) {
    return 'Release date TBA';
  }

  const match = RELEASE_DATE_PATTERN.exec(releaseDate);
  if (!match) {
    return 'Release date TBA';
  }

  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  const monthAbbreviation = MONTH_ABBREVIATIONS[monthIndex];
  if (!monthAbbreviation) {
    return 'Release date TBA';
  }

  return `${monthAbbreviation} ${Number(day)}, ${year}`;
}
