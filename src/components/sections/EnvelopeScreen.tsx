'use client';

import { useEffect, useRef } from 'react';
import { useParticles }          from '@/hooks/useParticles';
import { useEnvelopeAnimation }  from '@/hooks/useEnvelopeAnimation';
import { EnvelopeSVG }           from './EnvelopeSVG';

interface EnvelopeScreenProps {
  /** Ref del contenedor del contenido principal — se revela al abrir */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** Callback cuando la animación termina */
  onComplete: () => void;
}

/**
 * Pantalla de apertura completa.
 *
 * Capas (de atrás hacia adelante):
 * 1. Canvas de partículas doradas (fijo, fondo)
 * 2. Overlay negro semitransparente
 * 3. SVG del sobre centrado
 * 4. Texto de instrucción "Toca para abrir"
 *
 * Al hacer click/touch: playOpenSequence() orquesta todo.
 */
export function EnvelopeScreen({ contentRef, onComplete }: EnvelopeScreenProps) {
  const envelopeRef   = useRef<SVGSVGElement>(null);
  const topFlapRef    = useRef<SVGPathElement>(null);
  const bottomFlapRef = useRef<SVGPathElement>(null);
  const brochRef      = useRef<SVGGElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const hintRef       = useRef<HTMLParagraphElement>(null);

  const { canvasRef, converge } = useParticles({ count: 80, color: '#F472B6' });

  const { playOpenSequence } = useEnvelopeAnimation(
    {
      envelopeRef,
      topFlapRef,
      bottomFlapRef,
      brochRef,
      particlesRef: canvasRef,
      overlayRef,
      contentRef,
    },
    onComplete
  );

  function handleOpen() {
    // Primero converger las partículas al centro
    converge();
    // Pequeño delay para que la convergencia sea visible
    setTimeout(playOpenSequence, 200);
  }

  // Hint de toque — pulsa suavemente en loop
  useEffect(() => {
    if (!hintRef.current) return;

    const { gsap } = require('@/lib/gsap');

    const pulse = gsap.to(hintRef.current, {
      opacity: 0.3,
      duration: 1.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => pulse.kill();
  }, []);

  return (
    <div
      ref={overlayRef}
      role="button"
      tabIndex={0}
      aria-label="Toca para abrir tu invitación"
      onClick={handleOpen}
      onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-overlay)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        backgroundColor: 'var(--color-black)',
      }}
    >
      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Sobre SVG */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '90vw',
          maxWidth: 360,
          padding: '1rem',
        }}
      >
        <EnvelopeSVG
          ref={envelopeRef}
          topFlapRef={topFlapRef}
          bottomFlapRef={bottomFlapRef}
          brochRef={brochRef}
        />
      </div>

      {/* Hint de interacción */}
      <p
        ref={hintRef}
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-gold)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.7,
        }}
      >
        Toca para abrir
      </p>
    </div>
  );
}
