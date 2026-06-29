'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Indicador de scroll vertical animado.
 * Una línea que se extiende hacia abajo con loop infinito.
 * Desaparece al hacer el primer scroll.
 */
export function ScrollIndicator() {
  const lineRef      = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line      = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    // Animación de la línea — loop infinito
    const anim = gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: 'top center', opacity: 1 },
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.3,
        yoyo: false,
        onRepeat: () => {
          gsap.set(line, { scaleY: 0, opacity: 1 });
        },
      }
    );

    // Desaparecer al primer scroll
    function onScroll() {
      if (window.scrollY > 20) {
        gsap.to(container, { opacity: 0, duration: 0.3 });
        anim.kill();
        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      anim.kill();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: 'var(--color-gold)',
          opacity: 0.5,
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}
      >
        scroll
      </span>

      {/* Línea animada */}
      <div
        style={{
          width: 1,
          height: 60,
          background: 'var(--color-gold)',
          opacity: 0.3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--color-gold)',
          }}
        />
      </div>
    </div>
  );
}
