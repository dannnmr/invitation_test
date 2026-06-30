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
        backgroundColor: '#fdfbf7',
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
          bottom: '0%',
          right: '-20%',
          width: '360px',
          height: '360px',
          opacity: 0.30,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/images/decorativas_v2/estatua_brillos.png"
          alt="Flor decorativa"
          fill
          sizes="300px"
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
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(253, 251, 247, 0.4) 100%)',
              border: '1px solid rgba(248, 200, 220, 0.6)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(181, 131, 141, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(1px)',
              position: 'relative',
            }}
          >
            {/* Top color bar */}
            <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, #B5838D, transparent)' }} />

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
                  WebkitTextStroke: '1px rgba(248, 200, 220, 0.5)', // Rosa bebé suavizado
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
                {/* Lado izquierdo - Fecha (CON NUEVA TIPOGRAFIA) */}
                <div style={{ textAlign: 'left' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.65rem',
                      color: '#B5838D',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.6rem',
                    }}
                  >
                    Save the Date
                  </span>

                  <div style={{ display: 'flex', alignItems: 'end', gap: '0.8rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)', // Tipografía icónica del número
                        fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                        fontWeight: 400,
                        color: '#111',
                        lineHeight: 0.8,
                      }}
                    >
                      {dayNumber}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-cormorant)', // Tipografía editorial italic
                          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                          fontWeight: 400,
                          color: '#B5838D',
                          fontStyle: 'italic',
                          textTransform: 'capitalize',
                          lineHeight: 1,
                        }}
                      >
                        {monthName}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-dm-mono)',
                          fontSize: '0.75rem',
                          color: '#888',
                          letterSpacing: '0.15em',
                          marginTop: '0.2rem'
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
                      color: '#B5838D',
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
                      color: '#111',
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
                      color: '#B5838D',
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
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#F8C8DC' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.65rem',
                      color: '#888',
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
                  whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(17, 17, 17, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.70rem 1.5rem',
                    borderRadius: '50px',
                    backgroundColor: '#111', // Botón negro editorial
                    border: '1px solid #111',
                    color: '#F8C8DC',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Shimmer Rosa Brillante */}
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(248, 200, 220, 0.15), transparent)', transform: 'skewX(-20deg)', zIndex: 1 }}
                  />
                  <CalendarPlus className="w-5 h-5" style={{ color: '#F8C8DC', position: 'relative', zIndex: 2 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#F8C8DC',
                      position: 'relative',
                      zIndex: 2,
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
