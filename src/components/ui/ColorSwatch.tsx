'use client';

import { useState } from 'react';

interface ColorSwatchProps {
  color: string;
}

/**
 * Mapeo de valores hexadecimales a nombres amigables en español.
 */
function getColorName(hex: string): string {
  const upper = hex.toUpperCase();
  if (upper === '#FAF4EA') return 'Marfil';
  if (upper === '#FAF7F2') return 'Champagne';
  if (upper === '#2E1E15') return 'Marrón Elegante';
  if (upper === '#C5A059') return 'Dorado';
  if (upper === '#F472B6') return 'Rosa Gold';
  return hex;
}

/**
 * Muestra de color individual para la sección de Dress Code.
 * 
 * Características:
 * - Diseño de círculo de color pulido y minimalista.
 * - Tooltip que flota y se revela al pasar el mouse.
 * - Micro-animación de rebote (spring/bounce) en hover.
 */
export function ColorSwatch({ color }: ColorSwatchProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colorName = getColorName(color);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Círculo de color principal */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: color,
          border: '2px solid rgba(255, 255, 255, 0.85)',
          boxShadow: isHovered
            ? `0 10px 25px rgba(0, 0, 0, 0.15), 0 0 10px ${color}50`
            : '0 4px 15px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
          transform: isHovered ? 'scale(1.15) translateY(-6px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s',
          zIndex: 2,
        }}
      />

      {/* Anillo decorativo exterior en hover */}
      <div
        style={{
          position: 'absolute',
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          border: `1px solid ${color}`,
          opacity: isHovered ? 0.4 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Tooltip con nombre del color */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid rgba(244, 114, 182, 0.3)',
          borderRadius: '4px',
          padding: '0.4rem 0.8rem',
          color: 'var(--color-cream)',
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
          transformOrigin: 'bottom center',
          transition: 'opacity 0.3s, transform 0.3s, visibility 0.3s',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span>{colorName}</span>
          <span style={{ fontSize: '0.55rem', opacity: 0.5 }}>{color.toUpperCase()}</span>
        </div>

        {/* Pequeña flecha apuntadora del tooltip */}
        <div
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--color-surface)',
            borderRight: '1px solid rgba(244, 114, 182, 0.3)',
            borderBottom: '1px solid rgba(244, 114, 182, 0.3)',
          }}
        />
      </div>
    </div>
  );
}
