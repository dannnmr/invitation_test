'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Aplica efecto parallax a la imagen del hero.
 * La imagen se mueve a 40% de la velocidad del scroll hacia arriba,
 * creando la ilusión de profundidad.
 *
 * La imagen debe tener height: 130% para que el parallax
 * no deje espacios en blanco.
 *
 * Retorna el ref del contenedor y el ref de la imagen.
 */
export function useHeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image     = imageRef.current;
    if (!container || !image) return;

    // Estado inicial — imagen centrada verticalmente
    gsap.set(image, { yPercent: -15 });

    const trigger = gsap.to(image, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start:   'top top',
        end:     'bottom top',
        scrub:   1.5, // Inercia — mismo feeling que Locomotive
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return { containerRef, imageRef };
}
