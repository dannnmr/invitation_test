'use client';

import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';
import Image from 'next/image';
import { defaultInvitationConfig } from '@/config/invitation.config';
import { getCalendarLinks } from '@/lib/calendar';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Sección de Save The Date.
 * Permite a los invitados agendar la fecha directamente en su calendario personal.
 */
export function SaveTheDateSection() {
  const { event, quinceañera } = defaultInvitationConfig;

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const cardRef = useScrollReveal<HTMLDivElement>({ y: 40, delay: 0.15 });

  const handleAddToCalendar = () => {
    const isApple =
      /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const { googleUrl, icsUrl } = getCalendarLinks();

    if (isApple) {
      const link = document.createElement('a');
      link.href = icsUrl;
      link.download = `invitacion-${quinceañera.name.toLowerCase().replace(/\s+/g, '-')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(googleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const dayNumber = event.date.getDate();
  const monthName = event.date.toLocaleDateString('es-ES', { month: 'long' });
  const yearNumber = event.date.getFullYear();
  const dayOfWeek = event.date.toLocaleDateString('es-ES', { weekday: 'long' });

  return (
    <section
      aria-label="Save the date"
      style={{
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
      }}
    >
      {/* Detalle botánico en esquina */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '200px',
          height: '200px',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/images/decorativas_v2/flor_dorada.png"
          alt="Flor decorativa"
          fill
          sizes="200px"
          className="object-contain"
        />
      </div>

      <div
        style={{
          maxWidth: '750px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Tarjeta Save The Date */}
        <div
          ref={cardRef}
          style={{
            width: '100%',
            maxWidth: '650px',
            position: 'relative',
          }}
        >
          {/* Main Card Contenedor */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid rgba(244, 114, 182, 0.15)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.03)',
              position: 'relative',
            }}
          >
            {/* Top gold bar */}
            <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, var(--color-gold), transparent)' }} />

            <div
              style={{
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* Marca de agua - Número del día */}
              <span
                style={{
                  position: 'absolute',
                  right: '5%',
                  top: '40%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(6rem, 15vw, 10rem)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(244, 114, 182, 0.12)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}
              >
                {dayNumber}
              </span>

              {/* Fila superior: Detalles */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  zIndex: 5,
                }}
              >
                {/* Lado izquierdo - Fecha */}
                <div style={{ textAlign: 'left' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-gold-dark)',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Save the Date
                  </span>

                  <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        fontWeight: 900,
                        color: 'var(--color-cream)',
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {dayNumber}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
                          fontWeight: 800,
                          color: 'var(--color-cream)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          lineHeight: 1,
                        }}
                      >
                        {monthName}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-dm-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--color-cream-muted)',
                          letterSpacing: '0.15em',
                        }}
                      >
                        {yearNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lado derecho - Hora */}
                <div style={{ textAlign: 'right', paddingRight: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-cream-muted)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.2rem',
                    }}
                  >
                    Hora
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-pinyon)',
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      color: 'var(--color-gold-dark)',
                      lineHeight: 1,
                      display: 'block',
                    }}
                  >
                    {event.receptionTime} Hrs
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: 'var(--color-cream-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    {quinceañera.name}
                  </span>
                </div>
              </div>

              {/* Separador */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(244, 114, 182, 0.15)',
                  width: '100%',
                  zIndex: 5,
                }}
              />

              {/* Botón de Añadir */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', zIndex: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-gold)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-cream-muted)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    {dayOfWeek}
                  </span>
                </div>

                <motion.button
                  onClick={handleAddToCalendar}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1.5rem',
                    borderRadius: '16px',
                    backgroundColor: 'var(--color-gold)',
                    border: 'none',
                    color: 'var(--color-black)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(244, 114, 182, 0.15)',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <CalendarPlus className="w-4 h-4 text-white" />
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-black)',
                    }}
                  >
                    Añadir al Calendario
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
