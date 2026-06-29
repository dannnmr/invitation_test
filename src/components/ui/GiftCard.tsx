'use client';

import { useCardTilt } from '@/hooks/useCardTilt';
import type { GiftStore } from '@/types/invitation';

interface GiftCardProps {
  store: GiftStore;
}

/**
 * Tarjeta individual para mesa de regalos de una tienda.
 * 
 * Cuenta con:
 * - Efecto de inclinación 3D (tilt) con useCardTilt.
 * - Efecto de brillo de luz dinámico (glare) en base al movimiento del cursor.
 * - Estilo minimalista y lujoso en tonos dorados y crema sobre fondo oscuro.
 */
export function GiftCard({ store }: GiftCardProps) {
  const cardRef = useCardTilt<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        backgroundColor: 'rgba(255, 255, 255, 0.015)',
        border: '1px solid rgba(197, 160, 89, 0.15)',
        borderRadius: '8px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.15)';
      }}
    >
      {/* Capa de reflejo (glare) dinámico */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08) 0%, transparent 80%)',
          opacity: 'var(--glare-opacity, 0)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Marca / Nombre de la Tienda */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          Mesa de Regalos
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-cream)',
            marginTop: '0.25rem',
          }}
        >
          {store.name}
        </h3>
      </div>

      {/* Nota / Código de Mesa */}
      {store.note && (
        <p
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.75rem',
            color: 'rgba(240, 232, 208, 0.8)',
            textAlign: 'center',
            letterSpacing: '0.03em',
            zIndex: 2,
            borderTop: '0.5px solid rgba(197, 160, 89, 0.15)',
            borderBottom: '0.5px solid rgba(197, 160, 89, 0.15)',
            padding: '0.5rem 0',
            width: '80%',
          }}
        >
          {store.note}
        </p>
      )}

      {/* Enlace de visita */}
      <a
        href={store.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-gold)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(197, 160, 89, 0.4)',
          paddingBottom: '2px',
          zIndex: 2,
          transition: 'color 0.3s, border-color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-cream)';
          e.currentTarget.style.borderColor = 'var(--color-cream)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--color-gold)';
          e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
        }}
        onClick={(e) => {
          // Evitar que el clic en el botón active otras acciones padres
          e.stopPropagation();
        }}
      >
        Ir a la Tienda →
      </a>
    </div>
  );
}
