'use client';

import Image from 'next/image';

export function GiftRegistrySection() {
  return (
    <section
      aria-label="Mesa de regalos y sugerencias"
      style={{
        backgroundColor: '#fdfbf7', // Fondo perla
        padding: '3.5rem 1.5rem', // Compacto para no ser tan alto
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
            color: '#B5838D', // Rosa viejo
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
            color: '#111',
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
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(253, 251, 247, 0.4) 100%)',
          border: '1px solid rgba(192, 192, 192, 0.6)',
          borderRadius: '24px',
          padding: '2rem 1.5rem',
          boxShadow: '0 10px 40px rgba(181, 131, 141, 0.05)',
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
         
        }}>
          <div style={{ position: 'relative', width: '180px', height: '180px' }}>
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
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#B5838D', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 700 }}>
            REGALOS
          </p>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#111', marginBottom: '0.4rem', fontWeight: 400, lineHeight: 1 }}>
            Lluvia de Sobres
          </h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
            Compartir este dia contigo sera el mejor regalo. Cualquier muestra de afecto sera recibida con gratitud
          </p>
        </div>
      </div>
    </section>
  );
}
