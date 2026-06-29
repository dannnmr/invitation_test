'use client';

import { useCursorMagnet } from '@/hooks/useCursorMagnet';

interface GuestCountStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

/**
 * Stepper numérico interactivo para el conteo de invitados.
 * Los botones de "+" y "-" tienen efecto magnético al posicionarse sobre ellos.
 */
export function GuestCountStepper({
  value,
  onChange,
  min = 1,
  max = 10,
}: GuestCountStepperProps) {
  const decRef = useCursorMagnet<HTMLButtonElement>(0.3);
  const incRef = useCursorMagnet<HTMLButtonElement>(0.3);

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        userSelect: 'none',
      }}
    >
      {/* Botón Decremento */}
      <button
        ref={decRef}
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          backgroundColor: 'transparent',
          color: value <= min ? 'rgba(240, 232, 208, 0.2)' : 'var(--color-cream)',
          fontFamily: 'var(--font-sans)',
          fontSize: '1.25rem',
          cursor: value <= min ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          if (value > min) {
            e.currentTarget.style.borderColor = 'var(--color-gold)';
            e.currentTarget.style.color = 'var(--color-gold)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.3)';
          e.currentTarget.style.color = value <= min ? 'rgba(240, 232, 208, 0.2)' : 'var(--color-cream)';
        }}
      >
        —
      </button>

      {/* Indicador Numérico */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '60px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '2rem',
            fontWeight: 300,
            color: 'var(--color-gold)',
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.65rem',
            color: 'rgba(240, 232, 208, 0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '4px',
          }}
        >
          {value === 1 ? 'Invitado' : 'Invitados'}
        </span>
      </div>

      {/* Botón Incremento */}
      <button
        ref={incRef}
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          backgroundColor: 'transparent',
          color: value >= max ? 'rgba(240, 232, 208, 0.2)' : 'var(--color-cream)',
          fontFamily: 'var(--font-sans)',
          fontSize: '1.25rem',
          cursor: value >= max ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          if (value < max) {
            e.currentTarget.style.borderColor = 'var(--color-gold)';
            e.currentTarget.style.color = 'var(--color-gold)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.3)';
          e.currentTarget.style.color = value >= max ? 'rgba(240, 232, 208, 0.2)' : 'var(--color-cream)';
        }}
      >
        +
      </button>
    </div>
  );
}