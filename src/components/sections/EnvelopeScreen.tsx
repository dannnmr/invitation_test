'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParticles }          from '@/hooks/useParticles';
import { useEnvelopeAnimation }  from '@/hooks/useEnvelopeAnimation';

interface EnvelopeScreenProps {
  /** Ref del contenedor del contenido principal — se revela al abrir */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** Callback cuando la animación termina */
  onComplete: () => void;
}

export function EnvelopeScreen({ contentRef, onComplete }: EnvelopeScreenProps) {
  const envelopeBaseRef = useRef<HTMLImageElement>(null);
  const leftFlapRef     = useRef<HTMLImageElement>(null);
  const rightFlapRef    = useRef<HTMLImageElement>(null);
  const brochRef        = useRef<HTMLImageElement>(null);
  const overlayRef      = useRef<HTMLDivElement>(null);
  const hintRef         = useRef<HTMLParagraphElement>(null);

  const { canvasRef, converge } = useParticles({ count: 80, color: '#F472B6' });

  const { playOpenSequence } = useEnvelopeAnimation(
    {
      envelopeBaseRef,
      leftFlapRef,
      rightFlapRef,
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

      {/* Contenedor de las imágenes del sobre */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Base del sobre completo - se oculta al abrir */}
        <Image
          ref={envelopeBaseRef}
          src="/images/invitation/sobre_completo_negro.png"
          alt="Sobre negro"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Mitad Izquierda */}
        <Image
          ref={leftFlapRef}
          src="/images/invitation/sobre_izquierdo.png"
          alt="Mitad izquierda del sobre"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Mitad Derecha */}
        <Image
          ref={rightFlapRef}
          src="/images/invitation/sobre_derecho.png"
          alt="Mitad derecha del sobre"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Broche */}
        <Image
          ref={brochRef}
          src="/images/invitation/broche_inez.png"
          alt="Broche de sello"
          width={150}
          height={150}
          priority
          style={{
            position: 'absolute',
            zIndex: 10,
            objectFit: 'contain',
          }}
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
