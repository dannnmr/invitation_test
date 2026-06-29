'use client';

import { Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { InvitationConfig } from '@/types/invitation';

interface ParentsSectionProps {
  config: InvitationConfig;
}

/**
 * Sección de Padres y Padrinos.
 * Muestra el texto de bienvenida/bendición y los nombres de los padres y padrinos
 * en un estilo editorial muy elegante con Pinyon Script y DM Mono.
 */
export function ParentsSection({ config }: ParentsSectionProps) {
  const { parents } = config;

  // Si no se configuraron los padres, no mostramos la sección
  if (!parents) return null;

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const blockRef = useScrollReveal<HTMLDivElement>({
    y: 35,
    stagger: 0.15,
    childSelector: '.reveal-item',
  });

  return (
    <section
      aria-label="Bendición de padres"
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
      {/* Sparkles decorativas estilo Manhattan Nights */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          pointerEvents: 'none',
          opacity: 0.15,
          color: 'var(--color-gold)',
        }}
      >
        <Sparkles className="w-8 h-8 text-pink-300 animate-pulse" />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          pointerEvents: 'none',
          opacity: 0.12,
          color: 'var(--color-gold-metallic)',
        }}
      >
        <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Caja de contenido editorial */}
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          textAlign: 'center',
          zIndex: 5,
        }}
      >
        {/* Cabecera */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
              color: 'var(--color-gold)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Bendición & Agradecimiento
          </p>
          
          <h2
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'clamp(3rem, 7vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--color-gold-dark)',
              lineHeight: 1.1,
            }}
          >
            {parents.topLabel || 'Con la bendición de mis padres'}
          </h2>
        </div>

        {/* Bloque de Nombres */}
        <div
          ref={blockRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2.5rem',
          }}
        >
          {/* Mensaje de invitación / dedicatoria */}
          {parents.invitationText && (
            <p
              className="reveal-item"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                color: 'var(--color-cream)',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}
            >
              "{parents.invitationText}"
            </p>
          )}

          {/* Padres */}
          <div className="reveal-item" style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-cream-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Mis Padres
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-cream)',
                }}
              >
                {parents.fatherName} & {parents.motherName}
              </p>
            </div>
          </div>

          {/* Separador sutil */}
          <div
            className="reveal-item"
            aria-hidden="true"
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: 'rgba(244, 114, 182, 0.25)',
            }}
          />

          {/* Padrinos */}
          {parents.godparents && parents.godparents.length > 0 && (
            <div className="reveal-item" style={{ width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-cream-muted)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Mis Padrinos
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {parents.godparents.map((godparent, idx) => (
                    <p
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                        fontStyle: 'italic',
                        fontWeight: 300,
                        color: 'var(--color-cream)',
                      }}
                    >
                      {godparent}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
