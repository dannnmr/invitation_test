'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface PageLoaderProps {
  onComplete?: () => void;
}

/**
 * Loader inicial de la aplicación.
 *
 * Flujo:
 * 1. Pantalla negra con contador de porcentaje
 * 2. Porcentaje sube de 0 a 100 mientras cargan fuentes e imágenes críticas
 * 3. Overlay se desliza hacia arriba revelando el sitio
 * 4. Llama onComplete() para que el layout sepa que puede inicializar el resto
 */
export function PageLoader({ onComplete }: PageLoaderProps) {
  const overlayRef    = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible]   = useState(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const counter = counterRef.current;
    if (!overlay || !counter) return;

    // Objeto que GSAP anima — usamos un proxy para actualizar el DOM
    const progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // Fase 1: contador de 0 a 100
    tl.to(progress, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counter) {
          counter.textContent = String(Math.round(progress.value)).padStart(2, '0');
        }
      },
    });

    // Fase 2: deslizar overlay hacia arriba
    tl.to(overlay, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut',
    }, '+=0.2');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="progressbar"
      aria-label="Cargando invitación"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-black)',
        zIndex: 'var(--z-loader)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem',
        }}
      >
        <span
          ref={counterRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            color: 'var(--color-gold)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          00
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'var(--color-cream-muted)',
            opacity: 0.6,
          }}
        >
          %
        </span>
      </div>
    </div>
  );
}
