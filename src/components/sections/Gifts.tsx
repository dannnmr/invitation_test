'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCursorMagnet } from '@/hooks/useCursorMagnet';
import type { InvitationConfig } from '@/types/invitation';
import { SplitTextReveal } from '@/components/core/SplitTextReveal';
import { defaultInvitationConfig } from '@/config/invitation.config';

interface GiftsProps {
  config?: InvitationConfig;
}

function GiftCard({ storeName, url }: { storeName: string; url: string }) {
  // Magnetismo en el botón de la tarjeta
  const buttonRef = useCursorMagnet<HTMLAnchorElement>(0.35);

  return (
    <div
      className="gift-card"
      style={{
        position: 'relative',
        width: '280px',
        height: '180px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid rgba(197, 160, 89, 0.15)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        padding: '2rem',
        overflow: 'hidden',
        cursor: 'none',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        transition: 'border-color 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Icono / Logo de la Tienda (Estilizado) */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          color: 'var(--color-cream)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          transition: 'color 0.3s ease',
        }}
      >
        {storeName}
      </h3>

      {/* Botón interactivo con hover reveal */}
      <a
        ref={buttonRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          border: '1px solid var(--color-gold)',
          backgroundColor: 'transparent',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        Ver Mesa
      </a>
    </div>
  );
}

/**
 * Mesa de regalos.
 * Ofrece accesos directos elegantes a las tiendas seleccionadas mediante tarjetas interactivas.
 */
export function Gifts({ config = defaultInvitationConfig }: GiftsProps) {
  const { giftRegistry } = config;

  // Animación del contenedor al scrollear
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    opacity: 0,
    stagger: 0.15,
    childSelector: '.gift-card',
  });

  if (!giftRegistry || !giftRegistry.stores.length) return null;

  return (
    <section
      style={{
        padding: '6rem 2rem',
        backgroundColor: 'var(--color-black-soft)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          marginBottom: '4rem',
        }}
      >
        <SplitTextReveal
          text="Presentes"
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
          text="Mesa de Regalos"
          as="h2"
          type="chars"
          stagger={0.04}
          rotate={5}
          skewY={3}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontStyle: 'italic',
            color: 'var(--color-cream)',
            fontWeight: 300,
            marginTop: '0.5rem',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--color-cream-muted)',
            fontStyle: 'italic',
            marginTop: '1rem',
            lineHeight: 1.6,
          }}
        >
          Tu presencia es nuestro mayor regalo, pero si deseas tener un detalle con nosotros, te compartimos nuestras sugerencias.
        </p>
      </div>

      {/* Contenedor de Tarjetas */}
      <div
        ref={revealRef}
        style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        {giftRegistry.stores.map((store, index) => (
          <GiftCard
            key={index}
            storeName={store.name}
            url={store.url}
          />
        ))}
      </div>
    </section>
  );
}
