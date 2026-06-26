'use client';

import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Envuelve el contenido de página con transiciones suaves.
 * Utiliza AnimatePresence de Framer Motion para animar
 * la entrada y salida sin flash blanco entre rutas.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1], // expo.out
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
