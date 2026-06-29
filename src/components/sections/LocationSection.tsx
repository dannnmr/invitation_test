'use client';

import { useRef }           from 'react';
import dynamic              from 'next/dynamic';
import { useScrollReveal }  from '@/hooks/useScrollReveal';
import { useCursorMagnet }  from '@/hooks/useCursorMagnet';
import type { InvitationConfig } from '@/types/invitation';

// Dynamic import del mapa — evita SSR
const MapboxMap = dynamic(
  () => import('@/components/ui/MapboxMap').then((m) => m.MapboxMap),
  {
    ssr:     false,
    loading: () => (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          minHeight:       '400px',
          backgroundColor: 'var(--color-black-soft)',
          borderRadius:    '4px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-dm-mono)',
            fontSize:      '0.7rem',
            color:         'var(--color-gold)',
            letterSpacing: '0.15em',
            opacity:       0.4,
          }}
        >
          Cargando mapa...
        </span>
      </div>
    ),
  }
);

interface LocationSectionProps {
  config: InvitationConfig;
}

/**
 * Sección de ubicación del evento.
 *
 * Layout desktop (>768px):
 * ┌────────────────────┬─────────────────────┐
 * │  Info del venue    │   Mapa Mapbox        │
 * │  ─────────────     │   dark + pin dorado  │
 * │  Nombre            │                      │
 * │  Dirección         │                      │
 * │  Ceremonia 18:00   │                      │
 * │  Recepción 20:00   │                      │
 * │  [Cómo llegar →]   │                      │
 * └────────────────────┴─────────────────────┘
 *
 * Layout mobile (<768px): mapa arriba, info abajo (stack vertical)
 */
export function LocationSection({ config }: LocationSectionProps) {
  const { event } = config;

  // Refs para reveals al scroll
  const eyebrowRef  = useScrollReveal<HTMLParagraphElement>({ y: 20 });
  const titleRef    = useScrollReveal<HTMLHeadingElement>({ y: 30, delay: 0.1 });
  const infoRef     = useScrollReveal<HTMLDivElement>({
    y:             24,
    stagger:       0.1,
    childSelector: 'p, a',
    delay:         0.2,
  });

  // Efecto magnético en el botón de navegación
  const btnRef = useCursorMagnet<HTMLAnchorElement>(0.25);

  return (
    <section
      aria-label="Ubicación del evento"
      style={{
        minHeight:       '100vh',
        display:         'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        backgroundColor: 'var(--color-black)',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      {/* ── Columna izquierda — información ──────────────────── */}
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        'clamp(3rem, 8vw, 6rem) clamp(2rem, 6vw, 5rem)',
          gap:            'clamp(1.5rem, 3vw, 2.5rem)',
          borderRight:    '0.5px solid rgba(244, 114, 182, 0.15)',
        }}
      >
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily:    'var(--font-dm-mono)',
            fontSize:      'clamp(0.65rem, 1.2vw, 0.75rem)',
            color:         'var(--color-gold)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            opacity:       0.7,
          }}
        >
          Dónde celebramos
        </p>

        {/* Nombre del venue */}
        <h2
          ref={titleRef}
          style={{
            fontFamily:   'var(--font-display)',
            fontSize:     'clamp(2rem, 5vw, 3.5rem)',
            fontStyle:    'italic',
            fontWeight:   300,
            color:        'var(--color-cream)',
            lineHeight:   1.15,
          }}
        >
          {event.venue.name}
        </h2>

        {/* Información del venue */}
        <div
          ref={infoRef}
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '1rem',
          }}
        >
          {/* Dirección */}
          <p
            style={{
              fontFamily:  'var(--font-dm-mono)',
              fontSize:    'clamp(0.7rem, 1.2vw, 0.8rem)',
              color:       'var(--color-cream-muted)',
              lineHeight:  1.7,
              opacity:     0.8,
            }}
          >
            {event.venue.address}
          </p>

          {/* Separador */}
          <div
            aria-hidden="true"
            style={{
              width:           '2rem',
              height:          '1px',
              backgroundColor: 'var(--color-gold)',
              opacity:         0.3,
            }}
          />

          {/* Horarios */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', color: 'var(--color-cream-muted)', opacity: 0.7 }}>
              <span style={{ color: 'var(--color-gold)', marginRight: '0.75rem' }}>
                Ceremonia
              </span>
              {event.ceremonyTime} hrs
            </p>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', color: 'var(--color-cream-muted)', opacity: 0.7 }}>
              <span style={{ color: 'var(--color-gold)', marginRight: '0.75rem' }}>
                Recepción
              </span>
              {event.receptionTime} hrs
            </p>
          </div>

          {/* Botón de navegación */}
          <a
            ref={btnRef}
            href={event.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label={`Abrir ${event.venue.name} en Google Maps`}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.75rem',
              marginTop:     '0.5rem',
              padding:       '0.75rem 1.5rem',
              border:        '1px solid rgba(244, 114, 182, 0.4)',
              borderRadius:  '2px',
              fontFamily:    'var(--font-dm-mono)',
              fontSize:      'clamp(0.65rem, 1vw, 0.75rem)',
              color:         'var(--color-gold)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration:'none',
              width:         'fit-content',
              transition:    'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(244, 114, 182, 0.06)';
              e.currentTarget.style.borderColor     = 'rgba(244, 114, 182, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor     = 'rgba(244, 114, 182, 0.4)';
            }}
          >
            {/* Ícono de pin */}
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 0C2.686 0 0 2.686 0 6C0 9.75 6 14 6 14C6 14 12 9.75 12 6C12 2.686 9.314 0 6 0ZM6 8C4.895 8 4 7.105 4 6C4 4.895 4.895 4 6 4C7.105 4 8 4.895 8 6C8 7.105 7.105 8 6 8Z"
                fill="currentColor"
              />
            </svg>
            Cómo llegar
          </a>
        </div>
      </div>

      {/* ── Columna derecha — mapa ────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          minHeight: 'clamp(350px, 50vw, 600px)',
        }}
      >
        <MapboxMap
          coordinates={event.venue.coordinates}
          venueName={event.venue.name}
          zoom={15}
        />

        {/* Overlay de borde decorativo en esquinas */}
        {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((corner) => (
          <CornerDecor key={corner} corner={corner} />
        ))}
      </div>

      {/* Número de sección */}
      <span
        aria-hidden="true"
        style={{
          position:      'absolute',
          left:          'clamp(1.5rem, 4vw, 3rem)',
          bottom:        '2rem',
          fontFamily:    'var(--font-dm-mono)',
          fontSize:      '0.65rem',
          color:         'var(--color-gold)',
          letterSpacing: '0.15em',
          opacity:       0.25,
          writingMode:   'vertical-rl',
        }}
      >
        03 / UBICACIÓN
      </span>
    </section>
  );
}

/* ── Decoración de esquinas del mapa ──────────────────────────── */

type Corner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

function CornerDecor({ corner }: { corner: Corner }) {
  const positions: Record<Corner, React.CSSProperties> = {
    topLeft:     { top: 12,    left: 12  },
    topRight:    { top: 12,    right: 12 },
    bottomLeft:  { bottom: 12, left: 12  },
    bottomRight: { bottom: 12, right: 12 },
  };

  const borderStyles: Record<Corner, React.CSSProperties> = {
    topLeft:     { borderTop: '1px solid rgba(244, 114, 182, 0.4)', borderLeft:   '1px solid rgba(244, 114, 182, 0.4)' },
    topRight:    { borderTop: '1px solid rgba(244, 114, 182, 0.4)', borderRight:  '1px solid rgba(244, 114, 182, 0.4)' },
    bottomLeft:  { borderBottom: '1px solid rgba(244, 114, 182, 0.4)', borderLeft:'1px solid rgba(244, 114, 182, 0.4)' },
    bottomRight: { borderBottom: '1px solid rgba(244, 114, 182, 0.4)', borderRight:'1px solid rgba(244, 114, 182, 0.4)' },
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width:    16,
        height:   16,
        zIndex:   2,
        ...positions[corner],
        ...borderStyles[corner],
      }}
    />
  );
}
