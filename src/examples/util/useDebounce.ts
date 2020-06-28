import React from 'react';

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function that is called whenever useEffect re-called when value changes.
    // Stop debounced value from changing if value changed within delay.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
