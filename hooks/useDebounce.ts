import { useEffect, useState } from 'react';

    /**
     * Кастомный хук для дебаунсинга значения.
     *
     * @param value Значение, которое нужно дебаунсить.
     * @param delay Задержка в миллисекундах.
     * @returns Дебаунсенное значение.
     */
    export function useDebounce<T>(value: T, delay: number): T {
      const [debouncedValue, setDebouncedValue] = useState<T>(value);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
    
        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);
    
      return debouncedValue;
    }
    