'use client';

import { useState, useRef }           from 'react';
import dynamic              from 'next/dynamic';
import { useScrollReveal }  from '@/hooks/useScrollReveal';
import { useCursorMagnet }  from '@/hooks/useCursorMagnet';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
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

export function LocationSection({ config }: LocationSectionProps) {
  const [activeOption, setActiveOption] = useState(1);
  return (
    <div style={{ position: 'relative' }}>
      <SectionVariantSwitcher activeOption={activeOption} onChange={setActiveOption} optionsCount={4} />
      {activeOption === 1 && <LocationOption1 config={config} />}
      {activeOption === 2 && <LocationOption2 config={config} />}
      {activeOption === 3 && <LocationOption3 config={config} />}
      {activeOption === 4 && <LocationOption4 config={config} />}
    </div>
  );
}

function LocationOption1({ config }: LocationSectionProps) {
  const { venue } = config.event;
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111', padding: '2rem' }}>
      {/* Poste del cartel */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '12px', height: '100px', backgroundColor: '#333', background: 'linear-gradient(90deg, #222 0%, #444 50%, #222 100%)', borderRadius: '4px 4px 0 0' }} />
        
        {/* Cartel Verde */}
        <div style={{ 
          backgroundColor: '#0d3b24', 
          border: '4px solid #111', 
          borderRadius: '8px', 
          padding: '2rem 3rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 4px #0d3b24, inset 0 0 0 6px rgba(255,255,255,0.8)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Soportes metálicos */}
          <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '60px' }}>
            <div style={{ width: '8px', height: '15px', backgroundColor: '#666', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '15px', backgroundColor: '#666', borderRadius: '2px' }} />
          </div>

          <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
            {venue.name}
          </h2>
          <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
          <p style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#fff', fontSize: '1rem', opacity: 0.9, fontWeight: 500 }}>
            {venue.address}
          </p>

          <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: '1.5rem', fontFamily: 'var(--font-dm-mono)', color: '#0d3b24', backgroundColor: '#fff', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            OPEN IN MAPS
          </a>
        </div>
        
        <div style={{ width: '12px', height: '150px', backgroundColor: '#333', background: 'linear-gradient(90deg, #222 0%, #444 50%, #222 100%)' }} />
      </div>
    </section>
  );
}

function LocationOption2({ config }: LocationSectionProps) {
  const { venue } = config.event;
  return (
    <section style={{ height: '100vh', display: 'flex', backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        <MapboxMap coordinates={venue.coordinates} venueName={venue.name} zoom={14} />
      </div>

      {/* Neon Route SVG overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
        <path d="M 100 800 Q 300 600 500 700 T 900 400" fill="transparent" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" filter="drop-shadow(0 0 10px #f472b6) drop-shadow(0 0 20px #f472b6)" opacity="0.8" />
        <circle cx="900" cy="400" r="10" fill="#fff" filter="drop-shadow(0 0 10px #fff)" />
      </svg>

      <div style={{ position: 'absolute', bottom: '10%', left: '10%', right: '10%', padding: '2rem', backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(244,114,182,0.3)', borderRadius: '15px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-dm-mono)', color: '#fbcfe8', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}>DESTINATION</span>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', color: '#fff', margin: '0.5rem 0' }}>{venue.name}</h2>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{venue.address}</p>
        </div>
        <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 30px', backgroundColor: '#f472b6', color: '#000', fontFamily: 'var(--font-sans)', fontWeight: 'bold', borderRadius: '30px', textDecoration: 'none', boxShadow: '0 0 20px rgba(244,114,182,0.4)' }}>
          START ROUTE
        </a>
      </div>
    </section>
  );
}

function LocationOption3({ config }: LocationSectionProps) {
  const { venue } = config.event;
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#181818', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '800px', backgroundColor: '#000', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
        {/* Superior band */}
        <div style={{ height: '20px', backgroundColor: '#333', borderBottom: '2px solid #000' }} />
        
        {/* Contenido Letrero */}
        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Metro bubbles */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ff595e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'Helvetica' }}>D</div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ffca3a', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'Helvetica' }}>F</div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8ac926', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'Helvetica' }}>M</div>
            </div>
            
            <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#fff', letterSpacing: '-1px' }}>
              Station <br/> <span style={{ color: '#aaa', fontSize: '0.8em' }}>{venue.name}</span>
            </h2>
          </div>

          <div style={{ height: '4px', backgroundColor: '#fff', margin: '1rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <p style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#fff', fontSize: '1.2rem', fontWeight: 500 }}>
              Exit at: <br/> <span style={{ color: '#aaa', fontSize: '1rem' }}>{venue.address}</span>
            </p>

            <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', fontFamily: 'Helvetica', fontWeight: 'bold', border: '2px solid #fff', padding: '10px 20px', borderRadius: '30px' }}>
              Map & Directions ➔
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Opción 4: Mapa Dark (Diseño Original)
 */
function LocationOption4({ config }: LocationSectionProps) {
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
