'use client';

import { type ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Wrapper que inicializa Lenis smooth scroll.
 * Debe envolver toda la aplicación en el layout raíz.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useLenis();

  return <>{children}</>;
}
