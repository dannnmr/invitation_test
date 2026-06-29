'use client';

import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountdown }    from '@/hooks/useCountdown';
import { FlipDigit }       from '@/components/ui/FlipDigit';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
import type { InvitationConfig } from '@/types/invitation';

interface CountdownSectionProps {
  config: InvitationConfig;
}

export function CountdownSection({ config }: CountdownSectionProps) {
  return <CountdownOption4 config={config} />;
}

function CountdownOption1({ config }: CountdownSectionProps) {
  const countdown = useCountdown(config.event.date);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const days = isMounted ? countdown.days : 0;
  const hours = isMounted ? countdown.hours : 0;
  const minutes = isMounted ? countdown.minutes : 0;
  const seconds = isMounted ? countdown.seconds : 0;

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', backgroundImage: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)', padding: '2rem' }}>
      <div style={{ padding: '2rem', backgroundColor: '#111', borderRadius: '12px', border: '1px solid #333', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.5)' }}>
        <h2 style={{ fontFamily: 'var(--font-dm-mono)', color: '#888', letterSpacing: '4px', textAlign: 'center', marginBottom: '2rem', fontSize: '0.8rem' }}>DEPARTURES / GRAND CENTRAL</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <SplitFlapDigit value={days} label="DAYS" />
          <SplitFlapDigit value={hours} label="HOURS" />
          <SplitFlapDigit value={minutes} label="MINS" />
          <SplitFlapDigit value={seconds} label="SECS" />
        </div>
      </div>
    </section>
  );
}

function SplitFlapDigit({ value, label }: { value: number, label: string }) {
  const displayValue = String(value).padStart(2, '0');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ width: '80px', height: '110px', backgroundColor: '#1c1c1c', borderRadius: '4px', border: '1px solid #000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
        {/* Línea horizontal divisoria */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: '#000', zIndex: 10 }} />
        
        {/* Gradiente sutil simulando tarjeta */}
        <div style={{ position: 'absolute', top: '2px', left: '2px', right: '2px', bottom: '50%', backgroundColor: '#222', borderRadius: '2px 2px 0 0' }} />
        <div style={{ position: 'absolute', top: '50%', left: '2px', right: '2px', bottom: '2px', backgroundColor: '#181818', borderRadius: '0 0 2px 2px' }} />
        
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '3rem', color: '#e5e5e5', zIndex: 5, position: 'relative', letterSpacing: '-2px' }}>{displayValue}</span>
      </div>
      <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#666', letterSpacing: '0.15em' }}>{label}</span>
    </div>
  );
}

function CountdownOption2({ config }: CountdownSectionProps) {
  const countdown = useCountdown(config.event.date);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const display = isMounted 
    ? `${String(countdown.days).padStart(2, '0')}:${String(countdown.hours).padStart(2, '0')}:${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`
    : '00:00:00:00';

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', color: '#f472b6', letterSpacing: '8px', fontSize: '1rem', textTransform: 'uppercase', textShadow: '0 0 10px #f472b6', opacity: 0.8 }}>Times Square Display</h2>
        
        <div style={{ 
          padding: '2rem 3rem', 
          border: '2px solid #333', 
          borderRadius: '10px',
          backgroundColor: '#050505',
          boxShadow: 'inset 0 0 30px #000, 0 0 20px rgba(244, 114, 182, 0.1)'
        }}>
          <div style={{
            fontFamily: 'var(--font-dm-mono)', // Dot matrix feel
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: '#f472b6',
            textShadow: '0 0 10px #f472b6, 0 0 20px #f472b6, 0 0 40px #f472b6',
            letterSpacing: '5px',
            fontWeight: 700,
            backgroundImage: 'radial-gradient(#f472b6 15%, transparent 16%)',
            backgroundSize: '8px 8px',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}>
            {display}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(1rem, 5vw, 4.5rem)', color: '#f472b6', fontFamily: 'var(--font-dm-mono)', fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px' }}>
          <span>DÍAS</span>
          <span>HRS</span>
          <span>MINS</span>
          <span>SEGS</span>
        </div>
      </div>
    </section>
  );
}

function CountdownOption3({ config }: CountdownSectionProps) {
  const countdown = useCountdown(config.event.date);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const days = isMounted ? countdown.days : 0;
  const hours = isMounted ? countdown.hours : 0;
  const minutes = isMounted ? countdown.minutes : 0;

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#050505', 
      perspective: '1200px',
      overflow: 'hidden'
    }}>
      <div style={{
        transform: 'rotateX(30deg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 15vw, 10rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(244, 114, 182, 0.8)',
          textTransform: 'uppercase',
          lineHeight: 0.8,
          textAlign: 'center',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(-100px)'
        }}>
          {String(days).padStart(2, '0')} DÍAS
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 12vw, 8rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(244, 114, 182, 0.5)',
          textTransform: 'uppercase',
          lineHeight: 0.8,
          textAlign: 'center',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(-200px)'
        }}>
          {String(hours).padStart(2, '0')} HORAS
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 9vw, 6rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(244, 114, 182, 0.2)',
          textTransform: 'uppercase',
          lineHeight: 0.8,
          textAlign: 'center',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(-300px)'
        }}>
          {String(minutes).padStart(2, '0')} MINS
        </div>
      </div>
      
      {/* Fog effect at the top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40vh',
        background: 'linear-gradient(to bottom, #050505 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />
    </section>
  );
}

/**
 * Opción 4: Diseño original
 */
function CountdownOption4({ config }: CountdownSectionProps) {
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
        minHeight:      'auto',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            'clamp(1rem, 2vw, 2rem)',
        padding:        '3rem 1rem',
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
            gap:        'clamp(0.5rem, 2.5vw, 1.5rem)',
            alignItems: 'flex-start',
            flexWrap:   'wrap',
            justifyContent: 'center',
            maxWidth:   '100%',
          }}
        >
          <div data-flip-digit>
            <FlipDigit value={days}    label="Días"   />
          </div>

          <div data-flip-digit>
            <FlipDigit value={hours}   label="Horas"  />
          </div>

          <div data-flip-digit>
            <FlipDigit value={minutes} label="Minutos" />
          </div>

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
