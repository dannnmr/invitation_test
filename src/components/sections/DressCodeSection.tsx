'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import type { InvitationConfig } from '@/types/invitation';

interface DressCodeSectionProps {
  config: InvitationConfig;
}

/**
 * Sección de Código de Vestimenta (Dress Code).
 * 
 * Características:
 * - Layout refinado tipo editorial de revista de moda.
 * - Muestra de paleta sugerida de colores usando el componente ColorSwatch.
 * - Animación scroll reveal en bloques de texto e iconos.
 */
export function DressCodeSection({ config }: DressCodeSectionProps) {
  const { dressCode } = config;

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const contentRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    stagger: 0.12,
    childSelector: '.reveal-item',
    delay: 0.2,
  });

  return (
    <section
      aria-label="Código de vestimenta"
      style={{
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
      }}
    >
      {/* Fondo decorativo de línea dorada vertical fina */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '0.5px',
          backgroundColor: 'rgba(244, 114, 182, 0.1)',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      />

      {/* Cabecera */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 4.5rem)',
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          El Estilo
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-pinyon)',
            fontSize: 'clamp(3rem, 7vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--color-gold-dark)',
          }}
        >
          Código de Vestimenta
        </h2>
      </div>

      {/* Caja de contenido central */}
      <div
        ref={contentRef}
        style={{
          width: '100%',
          maxWidth: '650px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid rgba(244, 114, 182, 0.15)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
          zIndex: 5,
        }}
      >
        {/* Icono de Perchero / Vestimenta */}
        <div
          className="reveal-item"
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'var(--color-gold)',
            opacity: 0.8,
          }}
        >
          👗
        </div>

        {/* Tipo de Dress Code */}
        <div className="reveal-item" style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-cream-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Sugerencia de Estilo
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 300,
              color: 'var(--color-gold-dark)',
              marginTop: '0.5rem',
              textTransform: 'capitalize',
            }}
          >
            {dressCode.description}
          </h3>
        </div>

        {/* Separador decorativo */}
        <div
          className="reveal-item"
          aria-hidden="true"
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'rgba(244, 114, 182, 0.25)',
          }}
        />

        {/* Paleta de Colores Sugerida */}
        {dressCode.colors && dressCode.colors.length > 0 && (
          <div
            className="reveal-item"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              width: '100%',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-cream-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Paleta de Colores Sugerida
            </span>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '0.5rem',
              }}
            >
              {dressCode.colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </div>
        )}

        {/* Notas Adicionales */}
        {dressCode.notes && (
          <div
            className="reveal-item"
            style={{
              textAlign: 'center',
              backgroundColor: 'rgba(244, 114, 182, 0.04)',
              borderLeft: '2px solid var(--color-gold)',
              padding: '1rem 1.5rem',
              maxWidth: '480px',
              borderRadius: '2px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--color-cream)',
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              {dressCode.notes}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
