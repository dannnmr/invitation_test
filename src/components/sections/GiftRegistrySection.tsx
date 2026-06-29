'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';

export function GiftRegistrySection() {
  return <GiftOption1 />;
}

function GiftOption1() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eef2f5', padding: '2rem' }}>
      <div style={{ position: 'relative', marginTop: '50px' }}>
        {/* Asas de la bolsa SVG */}
        <svg style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }} width="150" height="80" viewBox="0 0 150 80" fill="none" stroke="#333" strokeWidth="8" strokeLinecap="round">
          <path d="M 20 80 C 20 10 130 10 130 80" />
        </svg>

        {/* Cuerpo de la bolsa de compras */}
        <div style={{ 
          backgroundColor: '#fff', 
          width: '100%', 
          maxWidth: '400px', 
          padding: '4rem 2rem', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.08)', 
          border: '1px solid #eaeaea',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem'
        }}>
          {/* Logo / Emblema Vogue */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: '#111', margin: 0 }}>Gifts</h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#111' }} />

          <p style={{ fontFamily: 'var(--font-sans)', color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>
            El mejor regalo es tu presencia en esta gran noche. Sin embargo, si deseas tener un detalle especial conmigo, aquí tienes la información:
          </p>

          {/* Ticket / Tarjeta interior */}
          <div style={{ backgroundColor: '#fafafa', border: '1px dashed #ccc', padding: '1.5rem', width: '100%', marginTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Bank Details</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', color: '#111', fontSize: '1rem' }}>Lluvia de Sobres</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>Habrá un cofre especial en la entrada del salón.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GiftOption2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#181818', padding: '2rem' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          backgroundColor: '#2a2a2a', 
          borderRadius: '10px', 
          padding: '2rem',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.8)',
          border: '2px solid #444',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.2rem', color: '#888', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '2rem' }}>Safe Box</h2>

        {/* Dial Metálico */}
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          background: 'conic-gradient(#555, #888, #555, #888, #555)',
          border: '4px solid #222',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 1s ease-in-out',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          zIndex: 2
        }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#222', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f472b6', boxShadow: isOpen ? '0 0 10px #f472b6' : 'none', transition: 'all 0.3s' }} />
          </div>
        </div>

        {/* Panel de Contenido revelado */}
        <div style={{ 
          marginTop: isOpen ? '2rem' : '0', 
          height: isOpen ? '150px' : '0', 
          opacity: isOpen ? 1 : 0, 
          transition: 'all 0.5s ease-in-out',
          overflow: 'hidden',
          textAlign: 'center',
          width: '100%',
          backgroundColor: '#111',
          padding: isOpen ? '1rem' : '0',
          borderRadius: '5px'
        }}>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: '2rem', color: '#d4af37' }}>Lluvia de Sobres</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>
            Dispondremos de un cofre especial en la entrada del salón para recibirlos con mucho cariño.
          </p>
        </div>

        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#555', marginTop: '2rem', letterSpacing: '2px' }}>
          {isOpen ? 'UNLOCKED' : 'TAP TO UNLOCK'}
        </p>
      </div>
    </section>
  );
}

/**
 * Opción 3: Diseño Original de Lluvia de Sobres
 */
function GiftOption3() {
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
