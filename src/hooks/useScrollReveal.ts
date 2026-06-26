'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollRevealOptions {
  /** Desplazamiento vertical inicial en px. Default: 40 */
  y?: number;
  /** Opacidad inicial. Default: 0 */
  opacity?: number;
  /** Duración en segundos. Default: 0.8 */
  duration?: number;
  /** Easing. Default: 'expo.out' */
  ease?: string;
  /** Delay en segundos. Default: 0 */
  delay?: number;
  /** Stagger entre elementos hijos (si el ref es un contenedor). Default: 0 */
  stagger?: number;
  /** Selector de hijos a animar. Si no se define, anima el ref directamente. */
  childSelector?: string;
  /** Porcentaje del viewport donde inicia la animación. Default: 'top 85%' */
  start?: string;
}

/**
 * Aplica animación de entrada al hacer scroll.
 * Uso:
 *   const ref = useScrollReveal<HTMLDivElement>({ y: 60, stagger: 0.1 });
 *   <div ref={ref}>...</div>
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    ease = 'expo.out',
    delay = 0,
    stagger = 0,
    childSelector,
    start = 'top 85%',
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const target = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    // Estado inicial
    gsap.set(target, { y, opacity });

    // Animación al scroll
    const trigger = gsap.to(target, {
      y: 0,
      opacity: 1,
      duration,
      ease,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: ref.current,
        start,
        once: true,  // Solo se dispara una vez
      },
    });

    return () => {
      trigger.kill();
    };
  }, [y, opacity, duration, ease, delay, stagger, childSelector, start]);

  return ref;
}
