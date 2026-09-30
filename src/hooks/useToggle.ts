import { useCallback, useState } from 'react';

export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(previous => !previous), []);

  return [value, toggle];
}
