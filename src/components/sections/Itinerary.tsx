'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ItineraryItemProps {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ItineraryItem({ time, title, description, icon }: ItineraryItemProps) {
  // Animación individual para cada elemento del itinerario al scrollear
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    opacity: 0,
    duration: 1.0,
    ease: 'expo.out',
  });

  return (
    <div
      ref={revealRef}
      style={{
        display: 'flex',
        position: 'relative',
        marginBottom: '4rem',
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left',
      }}
    >
      {/* Círculo indicador central */}
      <div
        style={{
          position: 'absolute',
          left: '24px',
          top: '4px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-black)',
          border: '2px solid var(--color-gold)',
          transform: 'translateX(-50%)',
          zIndex: 2,
          boxShadow: '0 0 10px var(--color-gold)',
        }}
      />

      {/* Tarjeta del evento */}
      <div
        style={{
          paddingLeft: '3.5rem',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.05em',
            display: 'block',
            marginBottom: '0.25rem',
          }}
        >
          {time}
        </span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--color-gold-light)' }} aria-hidden="true">{icon}</span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--color-cream)',
              fontWeight: 400,
            }}
          >
            {title}
          </h3>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            color: 'var(--color-cream-muted)',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/**
 * Itinerario vertical animado.
 * Muestra el flujo del evento. Los eventos ingresan lateralmente desde la izquierda al hacer scroll.
 */
export function Itinerary() {
  const events = [
    {
      time: '18:00 hrs',
      title: 'Ceremonia Religiosa',
      description: 'Una emotiva misa en acción de gracias para celebrar este día especial en la Parroquia de San Jacinto.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a3 3 0 0 0-3 3v2H7a1 1 0 0 0 0 2h2v10H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2h-2V9h2a1 1 0 0 0 0-2h-2V5a3 3 0 0 0-3-3Zm-1 5V5a1 1 0 0 1 2 0v2h-2Zm2 12h-2V9h2v10Z"/>
        </svg>
      ),
    },
    {
      time: '19:30 hrs',
      title: 'Cóctel de Bienvenida',
      description: 'Recepción de invitados y brindis de bienvenida en la terraza principal del Salón Imperial.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 2a.5.5 0 0 0-.5.5v3.31A6.002 6.002 0 0 0 11 11.58V20H8v2h8v-2h-3v-8.42A6.002 6.002 0 0 0 17 5.81V2.5a.5.5 0 0 0-.5-.5h-9ZM9 4h6v1.5a4 4 0 0 1-6 0V4Z"/>
        </svg>
      ),
    },
    {
      time: '20:30 hrs',
      title: 'El Vals de las Quince Rosas',
      description: 'El tradicional baile de gala e inicio de la noche mágica de festejos.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2Z"/>
        </svg>
      ),
    },
    {
      time: '21:00 hrs',
      title: 'Banquete de Gala',
      description: 'Una exquisita cena de tres tiempos especialmente diseñada para celebrar con nuestros seres queridos.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7Zm5-3V2h-2v9c0 2.21 1.79 4 4 4v7h2v-7c2.21 0 4-1.79 4-4V2h-2v4h-2V2h-2v4h-2Z"/>
        </svg>
      ),
    },
    {
      time: '22:30 hrs',
      title: 'Apertura de Pista',
      description: '¡Comienza la gran fiesta! Baile, DJ en vivo y sorpresas para todos.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        padding: '6rem 2rem',
        backgroundColor: 'var(--color-black-soft)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          El Evento
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
          Itinerario
        </h2>
      </div>

      {/* Contenedor de la línea de tiempo */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          paddingLeft: '1rem',
        }}
      >
        {/* Línea vertical izquierda */}
        <div
          style={{
            position: 'absolute',
            left: '24px',
            top: '8px',
            bottom: '40px',
            width: '1px',
            backgroundColor: 'var(--color-gold)',
            opacity: 0.25,
            transform: 'translateX(-50%)',
          }}
        />

        {events.map((e, index) => (
          <ItineraryItem
            key={index}
            time={e.time}
            title={e.title}
            description={e.description}
            icon={e.icon}
          />
        ))}
      </div>
    </section>
  );
}
