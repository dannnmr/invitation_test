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
      }}
    >
      <div
        className="boarding-pass-wrapper"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          padding: '1rem',
        }}
      >
        <style>{`
          .boarding-pass-wrapper {
            font-size: 16px;
          }
          /* Cuando la pantalla es menor a 800px, achicamos la fuente base dinámicamente. */
          /* 46.875em es el ancho del ticket (750px / 16). 32px es el padding horizontal total (1rem a cada lado) */
          @media (max-width: 800px) {
            .boarding-pass-wrapper {
               font-size: calc((100vw - 32px) / 46.875);
            }
          }
        `}</style>
        
        {/* Tarjeta Save The Date - TIPO BOARDING PASS ESCALABLE */}
        <div
          ref={cardRef}
          style={{
            minWidth: '46.875em', // Equivale a 750px en desktop
            maxWidth: '56.25em',  // Equivale a 900px
            background: 'linear-gradient(135deg, #F8F9FA 0%, #EAEAEA 100%)',
            borderRadius: '1em',
            boxShadow: '0 1.25em 3.125em rgba(0, 0, 0, 0.8), 0 0 1.875em rgba(247, 177, 199, 0.2)',
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          {/* CÓDIGO DE BARRAS (Izquierda) */}
          <div style={{ width: '3.125em', minWidth: '3.125em', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5em 0', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{
              width: '1.25em', height: '100%',
              backgroundImage: `repeating-linear-gradient(to bottom, #000 0, #000 3px, transparent 3px, transparent 5px, #000 5px, #000 9px, transparent 9px, transparent 12px, #000 12px, #000 14px, transparent 14px, transparent 18px)`,
              opacity: 0.8
            }} />
          </div>

          {/* CUERPO PRINCIPAL DEL TICKET (Centro) */}
          <div
            style={{
              flex: '1',
              padding: '2.5em 3em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {/* Silueta 25 de fondo (Watermark) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--font-display)',
              fontSize: '28em',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(0, 0, 0, 0.04)',
              zIndex: 0,
              pointerEvents: 'none',
              lineHeight: 0.8
            }}>
              25
            </div>

            {/* Top: VIP PASS */}
            <div style={{ zIndex: 2, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3em', fontWeight: 900, color: '#050505', letterSpacing: '0.02em', lineHeight: 1 }}>Save the Date</span>
                <span style={{ fontSize: '2em', color: '#050505' }}>✈</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '0.5em', lineHeight: 0.8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '5em', fontWeight: 900, color: '#050505', textShadow: '2px 2px 0px #fff' }}>N</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '5em', fontWeight: 900, color: '#050505', textShadow: '2px 2px 0px #fff' }}>Y</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1em', marginTop: '0.8em' }}>
                {/* Badge Rose Gold */}
                <div style={{ background: 'var(--color-gold)', padding: '0.4em 1.2em', borderRadius: '50em', display: 'inline-block' }}>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '1.1em', fontWeight: 400, color: '#050505', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Reserva la Fecha
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8em', color: 'rgba(0,0,0,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                  ¡No puedes faltar!
                </span>
              </div>
            </div>

            {/* Middle: Detalles (Grid) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1em', marginTop: '3em', marginBottom: '3em', zIndex: 2, position: 'relative' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8em', color: '#050505', fontWeight: 900, letterSpacing: '0.05em' }}>Fecha</span>
                <br/>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5em', color: '#333', fontWeight: 600 }}>{dayNumber} de {monthName}</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8em', color: '#050505', fontWeight: 900, letterSpacing: '0.05em' }}>Hora</span>
                <br/>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5em', color: '#333', fontWeight: 600 }}>{event.receptionTime} hrs</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8em', color: '#050505', fontWeight: 900, letterSpacing: '0.05em' }}>Destino</span>
                <br/>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5em', color: '#333', fontWeight: 600 }}>Mis XV Años</span>
              </div>
            </div>

            {/* Bottom: Botón Agendar */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', zIndex: 2, position: 'relative' }}>
              <motion.button
                onClick={handleAddToCalendar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: '0.8em',
                  padding: '0.8em 2em',
                  borderRadius: '50em',
                  backgroundColor: 'var(--color-black)',
                  border: 'none',
                  color: 'var(--color-gold)',
                  cursor: 'pointer',
                  boxShadow: '0 0.5em 1.5em rgba(0,0,0,0.3)'
                }}
              >
                <CalendarPlus style={{ width: '1.8em', height: '1.8em' }} />
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.85em', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                  Agendar en Calendario
                </span>
              </motion.button>
            </div>
          </div>

          {/* DIVISOR (Línea punteada) */}
          <div style={{ width: '2px', borderLeft: '2px dashed rgba(0, 0, 0, 0.2)', position: 'relative' }}>
            {/* Agujeros pre-picado */}
            <div style={{ position: 'absolute', top: '-0.75em', left: '-0.68em', width: '1.25em', height: '1.25em', backgroundColor: 'var(--color-black)', borderRadius: '50%', boxShadow: 'inset 0 -2px 5px rgba(0,0,0,0.3)' }} />
            <div style={{ position: 'absolute', bottom: '-0.75em', left: '-0.68em', width: '1.25em', height: '1.25em', backgroundColor: 'var(--color-black)', borderRadius: '50%', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.3)' }} />
          </div>

          {/* TALÓN (Derecha) */}
          <div
            style={{
              width: '11.25em',
              minWidth: '11.25em',
              position: 'relative',
              backgroundColor: '#EAEAEA',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Imagen de fondo en el talón (Estatua de la Libertad) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 1 }}>
              <Image 
                src="/images/decorativas_v2/estatua_brillos.webp" 
                alt="New York" 
                fill 
                sizes="(max-width: 768px) 150px, 200px"
                style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(100%) contrast(1.2)' }} 
              />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }} />
            </div>

            {/* Pequeña franja rose gold inferior para unir el diseño */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '0.5em', backgroundColor: 'var(--color-gold)' }} />
          </div>
        </div>
      </div>
      
    </section>
  );
}
