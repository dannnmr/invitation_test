'use client';

import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountdown }    from '@/hooks/useCountdown';
import { FlipDigit }       from '@/components/ui/FlipDigit';
import type { InvitationConfig } from '@/types/invitation';

interface CountdownSectionProps {
  config: InvitationConfig;
}

/**
 * Sección de cuenta regresiva.
 *
 * Layout:
 * ┌─────────────────────────────────────────────┐
 * │                                             │
 * │   Faltan                        (eyebrow)   │
 * │                                             │
 * │   [ 045 ]  [ 12 ]  [ 33 ]  [ 07 ]          │
 * │    DÍAS    HORAS   MINS    SEGS             │
 * │                                             │
 * │   para los XV de Sofía          (caption)   │
 * │                                             │
 * └─────────────────────────────────────────────┘
 *
 * Si la fecha ya pasó, muestra un mensaje de celebración.
 */
export function CountdownSection({ config }: CountdownSectionProps) {
  const { quinceañera, event } = config;
  const countdown = useCountdown(event.date);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const days = isMounted ? countdown.days : 0;
  const hours = isMounted ? countdown.hours : 0;
  const minutes = isMounted ? countdown.minutes : 0;
  const seconds = isMounted ? countdown.seconds : 0;

  // Reveal del eyebrow y caption al scroll
  const eyebrowRef = useScrollReveal<HTMLParagraphElement>({ y: 20, delay: 0 });
  const captionRef = useScrollReveal<HTMLParagraphElement>({ y: 20, delay: 0.2 });

  // Reveal del grid de dígitos con stagger
  const gridRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    stagger:       0.1,
    childSelector: '[data-flip-digit]',
    start:         'top 75%',
  });

  return (
    <section
      aria-label="Cuenta regresiva para el evento"
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            'clamp(2rem, 4vw, 3rem)',
        padding:        'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
        position:       'relative',
        overflow:       'hidden',
        backgroundColor: 'var(--color-black)',
      }}
    >
      {/* Fondo — gradiente radial sutil */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244, 114, 182, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Eyebrow */}
      <p
        ref={eyebrowRef}
        style={{
          fontFamily:    'var(--font-dm-mono)',
          fontSize:      'clamp(0.65rem, 1.2vw, 0.8rem)',
          color:         'var(--color-gold)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          opacity:       0.7,
        }}
      >
        {countdown.isExpired ? '¡Celebrando!' : 'Faltan'}
      </p>

      {/* Grid de dígitos — o mensaje si ya expiró */}
      {countdown.isExpired ? (
        <p
          style={{
            fontFamily:  'var(--font-display)',
            fontSize:    'clamp(2rem, 6vw, 4rem)',
            fontStyle:   'italic',
            fontWeight:  300,
            color:       'var(--color-cream)',
            textAlign:   'center',
          }}
        >
          ¡Es el gran día!
        </p>
      ) : (
        <div
          ref={gridRef}
          style={{
            display:    'flex',
            gap:        'clamp(0.75rem, 2vw, 1.5rem)',
            alignItems: 'flex-start',
            flexWrap:   'wrap',
            justifyContent: 'center',
          }}
        >
          <div data-flip-digit>
            <FlipDigit value={days}    label="Días"   />
          </div>

          {/* Separador */}
          <span
            aria-hidden="true"
            style={{
              fontFamily:  'var(--font-dm-mono)',
              fontSize:    'clamp(2rem, 6vw, 4rem)',
              color:       'var(--color-gold)',
              opacity:     0.3,
              lineHeight:  1,
              marginTop:   'clamp(16px, 3vw, 28px)',
              userSelect:  'none',
            }}
          >
            :
          </span>

          <div data-flip-digit>
            <FlipDigit value={hours}   label="Horas"  />
          </div>

          <span aria-hidden="true" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--color-gold)', opacity: 0.3, lineHeight: 1, marginTop: 'clamp(16px, 3vw, 28px)', userSelect: 'none' }}>:</span>

          <div data-flip-digit>
            <FlipDigit value={minutes} label="Minutos" />
          </div>

          <span aria-hidden="true" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--color-gold)', opacity: 0.3, lineHeight: 1, marginTop: 'clamp(16px, 3vw, 28px)', userSelect: 'none' }}>:</span>

          <div data-flip-digit>
            <FlipDigit value={seconds} label="Segundos" />
          </div>
        </div>
      )}

      {/* Caption */}
      <p
        ref={captionRef}
        style={{
          fontFamily:  'var(--font-display)',
          fontSize:    'clamp(1rem, 2.5vw, 1.5rem)',
          fontStyle:   'italic',
          fontWeight:  300,
          color:       'var(--color-cream-muted)',
          opacity:     0.7,
          textAlign:   'center',
        }}
      >
        para los XV de{' '}
        <span style={{ color: 'var(--color-cream)', opacity: 1 }}>
          {quinceañera.name}
        </span>
      </p>

      {/* Número de sección decorativo */}
      <span
        aria-hidden="true"
        style={{
          position:      'absolute',
          right:         'clamp(1.5rem, 4vw, 3rem)',
          bottom:        '2.5rem',
          fontFamily:    'var(--font-dm-mono)',
          fontSize:      '0.65rem',
          color:         'var(--color-gold)',
          letterSpacing: '0.15em',
          opacity:       0.25,
          writingMode:   'vertical-rl',
        }}
      >
        02 / COUNTDOWN
      </span>
    </section>
  );
}
