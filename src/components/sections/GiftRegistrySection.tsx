'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

/**
 * Sección de Mesa de Regalos / Sugerencias de Regalo.
 * 
 * Contiene:
 * - Rediseño premium de dos columnas:
 *   1. Lista de Preferencias (desplegable e interactiva con ítems safari)
 *   2. Lluvia de Sobres (con animación de levitación en el sobre)
 */
export function GiftRegistrySection() {
  const [showOptions, setShowOptions] = useState(false);

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const leftCardRef = useScrollReveal<HTMLDivElement>({ y: 40, delay: 0.15 });
  const rightCardRef = useScrollReveal<HTMLDivElement>({ y: 40, delay: 0.3 });

  return (
    <section
      aria-label="Mesa de regalos y sugerencias"
      style={{
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Luz ambiental rosa sutil */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248, 200, 220, 0.05) 0%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Cabecera */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Presentes
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-pinyon)',
            fontSize: 'clamp(3.5rem, 8vw, 5rem)',
            fontWeight: 300,
            color: 'var(--color-gold-dark)',
            marginBottom: '1.25rem',
            lineHeight: 1.1,
          }}
        >
          Lluvia de Sobres
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'var(--color-cream-muted)',
            lineHeight: 1.6,
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          El mejor regalo es tu presencia en esta gran noche. Sin embargo, si deseas tener un detalle especial conmigo, te comparto la dinámica del evento:
        </p>
      </div>

      {/* Tarjeta Única Centrada */}
      <div
        ref={leftCardRef}
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid rgba(244, 114, 182, 0.15)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          maxWidth: '520px',
          width: '100%',
          zIndex: 5,
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '2.5px', background: 'linear-gradient(to right, transparent, var(--color-gold), transparent)' }} />
        
        {/* Sobre animado flotante */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            width: '110px',
            height: '110px',
            marginBottom: '1.5rem',
          }}
        >
          <Image
            src="/images/decorativas_v2/lluvia_sobre2.png"
            alt="Lluvia de Sobres"
            fill
            sizes="110px"
            className="object-contain"
          />
        </motion.div>

        <h4 style={{ fontFamily: 'var(--font-pinyon)', fontSize: '2.5rem', color: 'var(--color-gold-dark)', marginBottom: '0.4rem', fontWeight: 300 }}>
          Cofre de Regalos
        </h4>
        
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 700 }}>
          Tradición en Efectivo
        </p>
        
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-cream)', lineHeight: 1.7, maxWidth: '380px' }}>
          Consiste en depositar tu obsequio en efectivo dentro de un sobre cerrado el día del evento. Dispondremos de un cofre especial en la entrada del salón para recibirlos con mucho cariño.
        </p>
      </div>
    </section>
  );
}
