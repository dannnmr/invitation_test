'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';

export function GiftRegistrySection() {
  return (
    <section
      aria-label="Mesa de regalos y sugerencias"
      style={{
        backgroundColor: 'var(--color-black)', // Fondo oscuro
        padding: '3.5rem 1.5rem', // Compacto para no ser tan alto
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoraciones temáticas */}
      <FloatingDecoration
        src="/images/decorativas_v2/chrome_starts.png"
        alt="Chrome Stars"
        style={{ top: '3%', left: '1%', width: '120px', height: '80px', opacity: 0.8, zIndex: 0 }}
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/starts.png"
        alt="Stars"
        style={{ bottom: '10%', right: '5%', width: '100px', height: '100px', opacity: 0.6, zIndex: 0 }}
        animationStyle="float"
      />



      <motion.div
        animate={{ rotate: [3, -3, 3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-1%',
          right: '-5%',
          width: 'clamp(200px, 40vw, 280px)',
          height: 'clamp(200px, 40vw, 280px)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.55,
          transformOrigin: 'top center',
          transform: 'scaleX(-1)'
        }}
      >
        <Image 
          src="/images/decorativas_v2/boladisco2.png"
          alt="Disco ball"
          fill
          sizes="(max-width: 768px) 200px, 280px"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      {/* Cabecera */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '2.5rem',
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-gold)', // Rose gold
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          REGALOS
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: 400,
            color: 'var(--color-cream)', // Letras claras
            marginBottom: '1rem',
            lineHeight: 1,
          }}
        >
          El Mejor Regalo
        </h2>
    
      </div>

      {/* Tarjeta Horizontal (Imagen izquierda, Texto derecha) */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.03)', // Cristal oscuro
          border: '1px solid rgba(192, 192, 192, 0.8)', // Borde plateado brillante
          borderRadius: '24px',
          padding: '2rem 1rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(192, 192, 192, 0.4), inset 0 0 20px rgba(192, 192, 192, 0.2)', // Glow plateado
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'row', // Estructura original solicitada
          gap: '1.5rem',
          alignItems: 'center',
          maxWidth: '550px',
          width: '100%',
          zIndex: 5,
        }}
      >
        {/* Lado Izquierdo: Imagen del sobre */}
        <div style={{ 
          position: 'relative', 
          width: '100px', 
          height: '100px', 
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))'
        }}>
          <div style={{ position: 'relative', width: '230px', height: '230px' }}>
            <Image
              src="/images/decorativas_v2/regalo_sobre.png"
              alt="Lluvia de Sobres"
              fill
              sizes="50px"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Lado Derecho: Textos */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 700 }}>
            REGALOS
          </p>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-cream)', marginBottom: '0.4rem', fontWeight: 400, lineHeight: 1 }}>
            Lluvia de Sobres
          </h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5, margin: 0 }}>
            Compartir este dia contigo sera el mejor regalo. Cualquier muestra de afecto sera recibida con gratitud
          </p>
        </div>
      </div>
    </section>
  );
}
