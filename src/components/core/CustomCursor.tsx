'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Cursor personalizado con inercia y efecto magnético.
 *
 * Tiene dos capas:
 * - dot: sigue al cursor casi instantáneamente (quickTo lag 0.1)
 * - ring: sigue con inercia suave (quickTo lag 0.15)
 *
 * El ring se expande al hover sobre elementos interactivos.
 */
export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // quickTo pre-compila la animación para máxima performance
    const moveDotX  = gsap.quickTo(dot,  'x', { duration: 0.1, ease: 'power3' });
    const moveDotY  = gsap.quickTo(dot,  'y', { duration: 0.1, ease: 'power3' });
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power3' });
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power3' });

    function onMouseMove(e: MouseEvent) {
      moveDotX(e.clientX - 4);
      moveDotY(e.clientY - 4);
      moveRingX(e.clientX - 20);
      moveRingY(e.clientY - 20);
    }

    function onMouseEnterInteractive() {
      gsap.to(ring, {
        scale: 2.5,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
      });
    }

    // Usar querySelectorAll cada vez que se actualiza o monta es lo básico.
    // Para simplificar, añadimos los listeners de hover a los elementos existentes.
    // También escuchamos de manera reactiva o delegada en el body.
    function onMouseLeaveInteractive() {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
      });
    }

    function onMouseDown() {
      gsap.to(ring, { scale: 0.85, duration: 0.1 });
    }

    // Controlar mouseup
    function onMouseUp() {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' });
    }

    // Seleccionar todos los elementos interactivos
    const interactiveSelector = 'a, button, [data-cursor-hover], input, textarea, label';
    const interactiveElements = document.querySelectorAll(interactiveSelector);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Punto central — sigue al mouse sin lag */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          mixBlendMode: 'difference',
        }}
      />

      {/* Ring exterior — sigue con inercia */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          opacity: 0.8,
        }}
      />
    </>
  );
}
