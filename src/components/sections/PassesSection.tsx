'use client';

import Image from 'next/image';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { InvitationConfig } from '@/types/invitation';

interface PassesSectionProps {
  config: InvitationConfig;
}

/**
 * Sección de Pases de Acceso / Pases Digitales.
 * Recrea el diseño de Boarding Pass (pase de abordar) de Ericka en color perlado-rosa
 * con un leopardo acostado sobre el pase y micro-detalles troquelados.
 */
export function PassesSection({ config }: PassesSectionProps) {
  const { passes, event, quinceañera } = config;

  const dayName = event.date.toLocaleDateString('es-ES', { weekday: 'long' });
  const dayNumber = event.date.getDate();
  const monthName = event.date.toLocaleDateString('es-ES', { month: 'long' });
  const shortMonth = event.date.toLocaleDateString('es-ES', { month: 'short' });

  const formattedDayStr = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${dayNumber}`;
  const formattedMonthStr = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  if (!passes) return null;

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const ticketRef = useScrollReveal<HTMLDivElement>({ y: 40, delay: 0.2 });

  return (
    <section
      aria-label="Pases de acceso digital"
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
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(244, 114, 182, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '850px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Cabecera */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
              color: 'var(--color-gold)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            {passes.topLabel || 'Pases de Acceso'}
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
            {passes.mainTitle || 'Pases Digitales'}
          </h2>
        </div>

        {/* Boarding Pass Wrapper */}
        <div
          ref={ticketRef}
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '3rem', // Espacio para el leopardo sobresaliente
          }}
        >


          {/* Tarjeta del Ticket */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{
              width: '100%',
              display: 'flex',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '18px',
              border: '1px solid rgba(244, 114, 182, 0.2)',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.04)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Lado izquierdo - Cuerpo Principal */}
            <div
              style={{
                flex: 1,
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              {/* Filigrana rosa de fondo */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 70% 50%, rgba(244, 114, 182, 0.05) 0%, transparent 80%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Contenidos del ticket */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                  position: 'relative',
                  zIndex: 10,
                }}
              >
                {/* Cabecera del pase: VIP PASS */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-gold-dark)',
                        textTransform: 'uppercase',
                        lineHeight: 1,
                      }}
                    >
                      VIP PASS
                    </h3>
                    <Compass className="w-5 h-5 md:w-7 md:h-7 text-pink-400 stroke-[1.5]" />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(244, 114, 182, 0.08)',
                        border: '1px solid rgba(244, 114, 182, 0.25)',
                        color: 'var(--color-gold-dark)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        padding: '2px 10px',
                        borderRadius: '20px',
                        fontFamily: 'var(--font-dm-mono)',
                      }}
                    >
                      {passes.quantity} {passes.unitText || 'Pases'}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.7rem',
                        color: 'var(--color-cream-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      por invitación
                    </span>
                  </div>
                </div>

                {/* Grid de Datos: Fecha y Hora */}
                <div style={{ display: 'flex', gap: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        display: 'block',
                      }}
                    >
                      DATE
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                        fontWeight: 700,
                        color: 'var(--color-cream)',
                        marginTop: '2px',
                        display: 'block',
                      }}
                    >
                      {formattedDayStr}, {formattedMonthStr}
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        display: 'block',
                      }}
                    >
                      HOUR
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                        fontWeight: 700,
                        color: 'var(--color-cream)',
                        marginTop: '2px',
                        display: 'block',
                      }}
                    >
                      {event.ceremonyTime} Hrs
                    </span>
                  </div>
                </div>

                {/* Firma de invitada */}
                <span
                  style={{
                    fontFamily: 'var(--font-pinyon)',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    color: 'var(--color-gold)',
                  }}
                >
                  ¡Te espero para celebrar!
                </span>
              </div>

              {/* Sello circular retro (Estilo brújula safari) */}
              <div
                style={{
                  width: 'clamp(70px, 12vw, 95px)',
                  height: 'clamp(70px, 12vw, 95px)',
                  borderRadius: '50%',
                  border: '1px dashed rgba(244, 114, 182, 0.35)',
                  backgroundColor: 'rgba(244, 114, 182, 0.03)',
                  padding: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  userSelect: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '5px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'var(--color-gold-dark)',
                    textTransform: 'uppercase',
                    position: 'absolute',
                    top: '8%',
                  }}
                >
                  {quinceañera.name}
                </span>

                <div
                  style={{
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    border: '1px dashed rgba(244, 114, 182, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Compass className="w-5 h-5 text-pink-400 stroke-[1.2]" />
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '5px',
                    letterSpacing: '0.1em',
                    color: 'var(--color-cream-muted)',
                    textTransform: 'uppercase',
                    position: 'absolute',
                    bottom: '8%',
                  }}
                >
                  {dayNumber} {shortMonth.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Separador perforado troquelado */}
            <div
              style={{
                width: '18px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              {/* Troqueles circulares transparentes simulados pintando el fondo perla */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-black)', // Se fusiona con el fondo
                  borderBottom: '1px solid rgba(244, 114, 182, 0.2)',
                  zIndex: 20,
                }}
              />

              <div
                style={{
                  height: '100%',
                  width: 0,
                  borderLeft: '1px dashed rgba(244, 114, 182, 0.35)',
                  margin: '12px 0',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-black)', // Se fusiona con el fondo
                  borderTop: '1px solid rgba(244, 114, 182, 0.2)',
                  zIndex: 20,
                }}
              />
            </div>

            {/* Lado derecho - Stub del ticket */}
            <div
              style={{
                width: 'clamp(65px, 15vw, 160px)',
                backgroundColor: 'rgba(244, 114, 182, 0.02)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
                borderLeft: '1px solid rgba(244, 114, 182, 0.05)',
              }}
            >
              {/* Leopardo marca de agua en el Stub */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.08,
                  pointerEvents: 'none',
                }}
              >
                <Image
                  src="/images/decorativas_v2/ny_skyline.png"
                  alt="Watermark New York Skyline"
                  fill
                  sizes="(max-width: 768px) 80px, 160px"
                  className="object-cover object-center grayscale"
                />
              </div>

              {/* Barra rosa en el extremo derecho */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  top: 0,
                  width: '8px',
                  backgroundColor: 'var(--color-gold)',
                }}
              />

              {/* Letra vertical XV */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                  color: 'rgba(244, 114, 182, 0.25)',
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '-0.1em',
                  userSelect: 'none',
                }}
              >
                XV
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
