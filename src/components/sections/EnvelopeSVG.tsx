import { forwardRef } from 'react';

interface EnvelopeSVGProps {
  topFlapRef:    React.RefObject<SVGPathElement | null>;
  bottomFlapRef: React.RefObject<SVGPathElement | null>;
  brochRef:      React.RefObject<SVGGElement | null>;
}

/**
 * SVG del sobre con broche decorativo.
 *
 * Estructura del SVG (viewBox 0 0 320 220):
 * - Cuerpo del sobre:    rectángulo base con borde dorado
 * - Solapa inferior:     triángulo apuntando arriba (se dobla hacia abajo)
 * - Solapa superior:     triángulo apuntando abajo  (se dobla hacia arriba)
 * - Lados izquierdo/derecho: triángulos decorativos
 * - Broche:              rombo con inicial centrado
 *
 * Los refs se pasan desde el componente padre para que
 * useEnvelopeAnimation pueda animar cada parte individualmente.
 */
export const EnvelopeSVG = forwardRef<SVGSVGElement, EnvelopeSVGProps>(
  ({ topFlapRef, bottomFlapRef, brochRef }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          width: '100%',
          maxWidth: 360,
          filter: 'drop-shadow(0 0 40px rgba(244, 114, 182, 0.15))',
        }}
      >
        {/* ── Cuerpo del sobre ─────────────────────────────────── */}
        <rect
          x="10" y="10"
          width="300" height="200"
          rx="4"
          fill="var(--color-surface)"
          stroke="var(--color-gold)"
          strokeWidth="0.75"
          opacity="0.9"
        />

        {/* ── Líneas internas decorativas ──────────────────────── */}
        <line x1="10"  y1="10"  x2="160" y2="110" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.3" />
        <line x1="310" y1="10"  x2="160" y2="110" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.3" />
        <line x1="10"  y1="210" x2="160" y2="110" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.2" />
        <line x1="310" y1="210" x2="160" y2="110" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.2" />

        {/* ── Solapa inferior (se dobla hacia abajo al abrir) ───── */}
        <path
          ref={bottomFlapRef}
          d="M 10 210 L 160 120 L 310 210 Z"
          fill="var(--color-black-soft)"
          stroke="var(--color-gold)"
          strokeWidth="0.5"
          opacity="0.95"
          style={{ transformOrigin: 'center top' }}
        />

        {/* ── Solapa superior (se dobla hacia arriba al abrir) ──── */}
        <path
          ref={topFlapRef}
          d="M 10 10 L 160 105 L 310 10 Z"
          fill="var(--color-black-soft)"
          stroke="var(--color-gold)"
          strokeWidth="0.5"
          opacity="0.95"
          style={{ transformOrigin: 'center bottom' }}
        />

        {/* ── Broche decorativo — rombo con inicial ─────────────── */}
        <g
          ref={brochRef}
          style={{ transformOrigin: '160px 110px' }}
        >
          {/* Rombo exterior */}
          <path
            d="M 160 88 L 182 110 L 160 132 L 138 110 Z"
            fill="var(--color-surface)"
            stroke="var(--color-gold)"
            strokeWidth="1"
          />
          {/* Rombo interior */}
          <path
            d="M 160 95 L 175 110 L 160 125 L 145 110 Z"
            fill="var(--color-gold)"
            opacity="0.15"
            stroke="var(--color-gold)"
            strokeWidth="0.5"
          />
          {/* Inicial — reemplazar "S" por la inicial del nombre */}
          <text
            x="160"
            y="115"
            textAnchor="middle"
            fill="var(--color-gold-dark)"
            fontSize="16"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontStyle="italic"
            fontWeight="300"
            letterSpacing="0"
          >
            E
          </text>
          {/* Destellos en las esquinas del rombo */}
          <circle cx="160" cy="88"  r="1.5" fill="var(--color-gold)" opacity="0.8" />
          <circle cx="182" cy="110" r="1.5" fill="var(--color-gold)" opacity="0.8" />
          <circle cx="160" cy="132" r="1.5" fill="var(--color-gold)" opacity="0.8" />
          <circle cx="138" cy="110" r="1.5" fill="var(--color-gold)" opacity="0.8" />
        </g>
      </svg>
    );
  }
);

EnvelopeSVG.displayName = 'EnvelopeSVG';
