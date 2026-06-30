'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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



  const { playOpenSequence } = useEnvelopeAnimation(
    {
      envelopeBaseRef,
      leftFlapRef,
      rightFlapRef,
      brochRef,
      overlayRef,
      contentRef,
    },
    onComplete
  );

  function handleOpen() {
    playOpenSequence();
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 'var(--z-overlay)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        backgroundColor: 'transparent',
      }}
    >


      {/* Contenedor de las imágenes del sobre */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Contenedor de escala para cubrir los bordes transparentes del PNG */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', transform: 'scale(1.05)' }}>
        {/* Base del sobre completo - se oculta al abrir */}
        <Image
          ref={envelopeBaseRef}
          src="/images/invitation/sobre_completo_rosa.png"
          alt="Sobre negro"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Mitad Izquierda */}
        <Image
          ref={leftFlapRef}
          src="/images/invitation/izquierdo_sobre_rosa.png"
          alt="Mitad izquierda del sobre"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Mitad Derecha */}
        <Image
          ref={rightFlapRef}
          src="/images/invitation/derecho_sobre_rosa.png"
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            objectFit: 'contain',
          }}
        />
        </div>
      </div>

      {/* Hint de interacción */}
      <p
        ref={hintRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 2,
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
