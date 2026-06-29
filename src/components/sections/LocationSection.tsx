'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { InvitationConfig } from '@/types/invitation';

interface LocationSectionProps {
  config: InvitationConfig;
}

export function LocationSection({ config }: LocationSectionProps) {
  const { event } = config;
  
  return (
    <section style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a', 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      overflow: 'hidden'
    }}>
      {/* Lado Izquierdo: Imagen */}
      <div style={{ position: 'relative', width: '100%', minHeight: '50vh' }}>
        <Image 
          src="/images/decorativas_v2/ubicacion-ny.png" 
          alt="Ubicación New York" 
          fill 
          className="object-cover"
        />
      </div>

      {/* Lado Derecho: Contenido */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Información de Ubicación */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Dónde Celebramos
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--color-cream)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            {event.venue.name}
          </h2>
          <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-cream-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '400px' }}>
            {event.venue.address}
          </p>
        </div>

        {/* Botón Giratorio "Como Llegar" */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ position: 'relative', width: '140px', height: '140px' }}>
            <motion.svg 
              viewBox="0 0 100 100" 
              style={{ width: '100%', height: '100%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
              <path 
                id="circleTextPath" 
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" 
                fill="transparent" 
              />
              <text style={{ fontSize: '12.5px', fill: 'var(--color-gold-dark)', fontFamily: 'var(--font-dm-mono)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                <textPath href="#circleTextPath" startOffset="0%">
                  COMO LLEGAR • COMO LLEGAR • COMO LLEGAR •
                </textPath>
              </text>
            </motion.svg>
            
            <a 
              href={event.venue.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'rgba(244,114,182,0.1)', 
                border: '1px solid rgba(244,114,182,0.4)',
                color: 'var(--color-gold)', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(244,114,182,0.2)';
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(244,114,182,0.1)';
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
