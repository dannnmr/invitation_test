'use client';

import { useEffect, useState } from 'react';
import { getTimeUntil }        from '@/lib/utils';

interface CountdownValue {
  days:      number;
  hours:     number;
  minutes:   number;
  seconds:   number;
  isExpired: boolean;
}

/**
 * Retorna el tiempo restante hasta targetDate, actualizado cada segundo.
 * Limpia el interval automáticamente al desmontar o cuando expira.
 */
export function useCountdown(targetDate: Date): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() =>
    getTimeUntil(targetDate)
  );

  useEffect(() => {
    if (value.isExpired) return;

    const interval = setInterval(() => {
      const next = getTimeUntil(targetDate);
      setValue(next);

      if (next.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, value.isExpired]);

  return value;
}
