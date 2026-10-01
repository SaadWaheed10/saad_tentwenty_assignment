import { useEffect, useState } from 'react';

/**
 * Returns `value`, but only after it has stopped changing for `delayMs`.
 *
 * Used to turn "every keystroke" into a single committed search query —
 * balances a snappy-feeling input against hammering the TMDb API on every
 * character (.cursor/rules/04-screens-ux.mdc: search "must feel immediate"
 * but "debounce input carefully").
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
