'use client';

import { useEffect, useState, useRef } from 'react';
import { getTimeUntil } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { InvitationConfig } from '@/types/invitation';
import { defaultInvitationConfig } from '@/config/invitation.config';

interface CountdownProps {
  config?: InvitationConfig;
}

// Subcomponente para un solo dígito con volteo 3D
function FlipUnit({ value, label }: { value: number; label: string }) {
  const formattedValue = String(value).padStart(2, '0');
  const [prevValue, setPrevValue] = useState(formattedValue);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (formattedValue !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(formattedValue);
        setIsFlipping(false);
      }, 580); // Duración de la animación
      return () => clearTimeout(timer);
    }
  }, [formattedValue, prevValue]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <div
        className="flip-unit-card"
        style={{
          position: 'relative',
          width: '72px',
          height: '96px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          perspective: '400px',
        }}
      >
        {/* Mitad superior fija */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            backgroundColor: 'var(--color-black-soft)',
            borderBottom: '1px solid rgba(0,0,0,0.4)',
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-mono)',
            fontSize: '2.5rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingBottom: '2px',
            transformOrigin: 'bottom center',
          }}
        >
          <span style={{ transform: 'translateY(50%)' }}>{formattedValue}</span>
        </div>

        {/* Mitad inferior fija */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-mono)',
            fontSize: '2.5rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingTop: '2px',
          }}
        >
          <span style={{ transform: 'translateY(-50%)' }}>{prevValue}</span>
        </div>

        {/* Panel que voltea arriba (se dobla hacia abajo) */}
        {isFlipping && (
          <div
            className="flip-top"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              backgroundColor: 'var(--color-black-soft)',
              borderBottom: '1px solid rgba(0,0,0,0.4)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-mono)',
              fontSize: '2.5rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'hidden',
              paddingBottom: '2px',
              transformOrigin: 'bottom center',
              zIndex: 3,
            }}
          >
            <span style={{ transform: 'translateY(50%)' }}>{prevValue}</span>
          </div>
        )}

        {/* Panel que voltea abajo (cae revelando el nuevo número) */}
        {isFlipping && (
          <div
            className="flip-bottom"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50%',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-mono)',
              fontSize: '2.5rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
              paddingTop: '2px',
              transformOrigin: 'top center',
              zIndex: 3,
            }}
          >
            <span style={{ transform: 'translateY(-50%)' }}>{formattedValue}</span>
          </div>
        )}

        {/* Línea divisoria central */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 10,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--color-gold)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Contador regresivo de la invitación.
 * Actualiza cada segundo usando setInterval y el cálculo de diferencia de fechas.
 * Emplea volteo 3D en las tarjetas de tiempo.
 */
export function Countdown({ config = defaultInvitationConfig }: CountdownProps) {
  const { event } = config;
  const [timeLeft, setTimeLeft] = useState(getTimeUntil(event.date));

  // Animación del contenedor con useScrollReveal
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    childSelector: '.reveal-item',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntil(event.date));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.date]);

  return (
    <section
      style={{
        padding: '6rem 2rem',
        backgroundColor: 'var(--color-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Estilos CSS embebidos para las transformaciones 3D del Flip */}
      <style dangerouslySetInnerHTML={{ __html: `
        .flip-top {
          animation: flipTopAnim 0.28s ease-in forwards;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-bottom {
          transform: rotateX(90deg);
          animation: flipBottomAnim 0.28s ease-out 0.28s forwards;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @keyframes flipTopAnim {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-90deg); }
        }
        @keyframes flipBottomAnim {
          0% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
      `}} />

      <div
        ref={revealRef}
        style={{
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <div className="reveal-item">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Falta muy poco
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontStyle: 'italic',
              color: 'var(--color-cream)',
              fontWeight: 300,
              marginTop: '0.5rem',
            }}
          >
            Guarda la Fecha
          </h2>
        </div>

        {/* Panel de Dígitos */}
        <div
          className="reveal-item"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <FlipUnit value={timeLeft.days} label="Días" />
          <FlipUnit value={timeLeft.hours} label="Horas" />
          <FlipUnit value={timeLeft.minutes} label="Minutos" />
          <FlipUnit value={timeLeft.seconds} label="Segundos" />
        </div>

        {timeLeft.isExpired && (
          <p
            className="reveal-item"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--color-gold)',
              marginTop: '1rem',
            }}
          >
            ¡El gran día ha llegado!
          </p>
        )}
      </div>
    </section>
  );
}
