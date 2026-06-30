'use client';

import Image from 'next/image';
import { Ban } from 'lucide-react';
import type { InvitationConfig } from '@/types/invitation';

interface DressCodeSectionProps {
  config: InvitationConfig;
}

export function DressCodeSection({ config }: DressCodeSectionProps) {
  const { dressCode } = config;

  return (
    <section style={{ padding: '3.5rem 1rem', backgroundColor: '#fdfbf7', display: 'flex', justifyContent: 'center', position: 'relative' }}>
      {/* Luz rosa de fondo para el glassmorphism */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px', height: '400px', background: 'radial-gradient(ellipse, rgba(248, 200, 220, 0.4) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

      <div style={{ 
        zIndex: 1,
        width: '100%', maxWidth: '350px',
        padding: '2.5rem 1rem',
        border: '1px solid rgba(192, 192, 192, 0.6)',
        borderRadius: '150px 150px 0 0', // Forma de arco superior (espejo)
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        boxShadow: '0 10px 30px rgba(181, 131, 141, 0.05)'
      }}>
        
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#B5838D', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Sugerencia de estilo
        </span>
        
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 4rem)', color: '#111', fontWeight: 400, margin: 0, lineHeight: 1, zIndex: 2, position: 'relative' }}>
          Dress Code
        </h2>

        {/* Imagen con márgenes negativos para reducir los espacios en blanco de su archivo original sin afectar su tamaño visual */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '180px', height: '180px', marginTop: '-1.5rem', marginBottom: '-0.5rem', zIndex: 1 }}>
          <Image 
            src="/images/decorativas_v2/etiqueta_elegante.png" 
            alt="Etiqueta elegante" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        </div>
        
        {/* Círculos de texturas conservados */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem', zIndex: 2, position: 'relative' }}>
          {dressCode.colors?.map((color, idx) => {
            const isImage = color.startsWith('/');
            return (
              <div key={idx} style={{ 
                width: '50px', height: '50px', borderRadius: '50%', 
                backgroundColor: isImage ? 'transparent' : color,
                backgroundImage: isImage ? `url("${color}")` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center',
                border: '2px solid #fff',
                boxShadow: '0 5px 10px rgba(181, 131, 141, 0.2)'
              }} />
            );
          })}
        </div>

        {/* Nota especial rediseñada de forma más elegante */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', 
          borderTop: '1px solid rgba(181, 131, 141, 0.3)', 
          paddingTop: '1.5rem', marginTop: '1rem',
          width: '80%'
        }}>
          <span style={{ fontFamily: 'var(--font-pinyon)', fontSize: '2rem', color: '#B5838D', lineHeight: 0.8 }}>Nota Especial</span>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.2rem' }}>
            <Ban size={14} color="#B5838D" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontFamily: 'var(--font-sans)', color: '#888', fontSize: '0.75rem', lineHeight: 1.5, letterSpacing: '0.05em', fontStyle: 'italic', margin: 0, textAlign: 'left' }}>
              {dressCode.notes}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
