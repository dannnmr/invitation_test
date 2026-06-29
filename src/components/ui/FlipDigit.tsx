'use client';

import { useFlipAnimation } from '@/hooks/useFlipAnimation';

interface FlipDigitProps {
  value:   number;
  label:   string;
}

const CARD_W = 'clamp(64px, 14vw, 110px)';
const CARD_H = 'clamp(80px, 17vw, 140px)';
const FONT_S = 'clamp(2.5rem, 7vw, 5rem)';

/**
 * Bloque individual del flip clock.
 *
 * Estructura visual de cada bloque:
 * ┌──────────────────┐
 * │  mitad superior  │  ← topCurrentRef / topNextRef (animadas)
 * ├ ─ ─ ─ ─ ─ ─ ─ ─┤  ← línea divisoria dorada
 * │  mitad inferior  │  ← bottomCurrentRef
 * └──────────────────┘
 *    D Í A S          ← label
 */
export function FlipDigit({ value, label }: FlipDigitProps) {
  const { topCurrentRef, bottomCurrentRef, topNextRef } = useFlipAnimation(value);

  const displayValue = String(value).padStart(2, '0');

  const cardStyle: React.CSSProperties = {
    width:           CARD_W,
    height:          CARD_H,
    position:        'relative',
    perspective:     '400px',
    backgroundColor: 'var(--color-surface)',
    borderRadius:    '6px',
    overflow:        'hidden',
    border:          '1px solid rgba(244, 114, 182, 0.18)',
    boxShadow:       '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
  };

  const halfBase: React.CSSProperties = {
    position:       'absolute',
    left:           0,
    right:          0,
    height:         '50%',
    display:        'flex',
    alignItems:     'flex-end',
    justifyContent: 'center',
    overflow:       'hidden',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  };

  const numberStyle: React.CSSProperties = {
    fontFamily:    'var(--font-dm-mono)',
    fontSize:      FONT_S,
    fontWeight:    300,
    color:         'var(--color-cream)',
    lineHeight:    1,
    letterSpacing: '-0.02em',
    userSelect:    'none',
  };

  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           'clamp(0.6rem, 1.5vw, 1rem)',
      }}
    >
      {/* ── Tarjeta flip ───────────────────────────── */}
      <div style={cardStyle} aria-live="polite" aria-label={`${value} ${label}`}>

        {/* Mitad superior — número actual */}
        <div
          ref={topCurrentRef}
          style={{
            ...halfBase,
            top:             0,
            alignItems:      'flex-end',
            paddingBottom:   '0.08em',
            transformOrigin: 'center bottom',
            background:      'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
          }}
        >
          <span style={numberStyle}>{displayValue}</span>
        </div>

        {/* Mitad superior — número nuevo (invisible, espera su turno) */}
        <div
          ref={topNextRef}
          style={{
            ...halfBase,
            top:             0,
            alignItems:      'flex-end',
            paddingBottom:   '0.08em',
            transformOrigin: 'center bottom',
            transform:       'rotateX(90deg)',
            background:      'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
            zIndex:          2,
          }}
        >
          <span style={numberStyle}>{displayValue}</span>
        </div>

        {/* Línea divisoria dorada */}
        <div
          aria-hidden="true"
          style={{
            position:        'absolute',
            top:             '50%',
            left:            0,
            right:           0,
            height:          '1px',
            backgroundColor: 'rgba(244, 114, 182, 0.25)',
            zIndex:          3,
          }}
        />

        {/* Mitad inferior — número actual */}
        <div
          ref={bottomCurrentRef}
          style={{
            ...halfBase,
            bottom:         0,
            top:            'auto',
            alignItems:     'flex-start',
            paddingTop:     '0.08em',
            transformOrigin:'center top',
            background:     'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)',
          }}
        >
          <span style={{ ...numberStyle, color: 'rgba(26, 26, 26, 0.7)' }}>
            {displayValue}
          </span>
        </div>

        {/* Brillo sutil en el borde inferior */}
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '40%',
            background: 'linear-gradient(to top, rgba(244, 114, 182, 0.04), transparent)',
            pointerEvents: 'none',
            zIndex:     1,
          }}
        />
      </div>

      {/* ── Label ──────────────────────────────────── */}
      <span
        aria-hidden="true"
        style={{
          fontFamily:    'var(--font-dm-mono)',
          fontSize:      'clamp(0.55rem, 1vw, 0.7rem)',
          color:         'var(--color-gold)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity:       0.6,
        }}
      >
        {label}
      </span>
    </div>
  );
}
