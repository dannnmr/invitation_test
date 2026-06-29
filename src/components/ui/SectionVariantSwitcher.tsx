'use client';

import React from 'react';

interface SectionVariantSwitcherProps {
  activeOption: number;
  onChange: (option: number) => void;
  optionsCount?: number;
}

/**
 * Componente de interfaz para cambiar entre distintas variaciones
 * de diseño en una misma sección.
 */
export function SectionVariantSwitcher({ activeOption, onChange, optionsCount = 4 }: SectionVariantSwitcherProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 50,
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
        padding: '0.5rem 1rem',
        borderRadius: '2rem',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      {Array.from({ length: optionsCount }).map((_, i) => {
        const optionNumber = i + 1;
        const isActive = activeOption === optionNumber;
        return (
          <button
            key={optionNumber}
            onClick={() => onChange(optionNumber)}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '1.5rem',
              border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
              backgroundColor: isActive ? 'var(--color-gold)' : 'transparent',
              color: isActive ? 'var(--color-black)' : 'var(--color-cream-muted)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Opción {optionNumber}
          </button>
        );
      })}
    </div>
  );
}
