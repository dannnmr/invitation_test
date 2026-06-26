'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { InvitationConfig } from '@/types/invitation';
import { SplitTextReveal } from '@/components/core/SplitTextReveal';
import { defaultInvitationConfig } from '@/config/invitation.config';

interface DressCodeProps {
  config?: InvitationConfig;
}

/**
 * Dress code / Código de vestimenta.
 * Muestra el código de vestimenta editorial y la paleta de colores sugerida
 * en círculos animados con staggers de GSAP.
 */
export function DressCode({ config = defaultInvitationConfig }: DressCodeProps) {
  const { dressCode } = config;

  // Stagger reveal de los círculos de colores
  const colorsRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    opacity: 0,
    stagger: 0.1,
    childSelector: '.color-circle',
    start: 'top 90%',
  });

  // Reveal del texto editorial
  const textRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    opacity: 0,
    duration: 1.0,
  });

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
      }}
    >
      <div
        ref={textRef}
        style={{
          maxWidth: '600px',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <SplitTextReveal
          text="Código de Vestimenta"
          as="span"
          type="words"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
          }}
        />
        
        <SplitTextReveal
          text={dressCode.description}
          as="h2"
          type="chars"
          stagger={0.05}
          rotate={5}
          skewY={3}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontStyle: 'italic',
            color: 'var(--color-cream)',
            fontWeight: 300,
          }}
        />

        {dressCode.notes && (
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: 'var(--color-cream-muted)',
              fontStyle: 'italic',
              maxWidth: '45ch',
              lineHeight: 1.6,
              marginTop: '0.5rem',
            }}
          >
            {dressCode.notes}
          </p>
        )}
      </div>

      {/* Paleta de Colores Staggered */}
      <div
        ref={colorsRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-gold-light)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          Paleta Sugerida
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {dressCode.colors.map((color, i) => (
            <div
              key={i}
              className="color-circle"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '1px solid rgba(240, 232, 208, 0.15)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-cream-muted)',
                  opacity: 0.5,
                }}
              >
                {color}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
