'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Ban } from 'lucide-react';
import { CSSSparkle } from '@/components/ui/CSSSparkle';
import type { InvitationConfig } from '@/types/invitation';

interface DressCodeSectionProps {
  config: InvitationConfig;
}

export function DressCodeSection({ config }: DressCodeSectionProps) {
  const { dressCode } = config;

  return (
    <section style={{ padding: '3.5rem 1rem', backgroundColor: 'var(--color-black)', display: 'flex', justifyContent: 'center', position: 'relative' }}>
      {/* Luz rosa de fondo para el glassmorphism */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px', height: '400px', background: 'radial-gradient(ellipse, rgba(247, 177, 199, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <CSSSparkle size={20} color="var(--color-gold)" top="20%" left="15%" delay="0s" points={8} />
        <CSSSparkle size={30} color="#EAEAEA" top="10%" right="20%" delay="1s" points={4} />
        <CSSSparkle size={24} color="var(--color-gold)" bottom="30%" left="10%" delay="0.5s" points={4} />
        <CSSSparkle size={15} color="#EAEAEA" bottom="20%" right="15%" delay="1.5s" points={8} />
        <CSSSparkle size={18} color="var(--color-gold)" top="50%" right="5%" delay="0.2s" points={4} />
      </div>

      <div style={{ 
        zIndex: 1,
        width: '100%', maxWidth: '350px',
        padding: '2.5rem 1rem',
        border: '1px solid rgba(247, 177, 199, 0.4)',
        borderRadius: '150px 150px 0 0', // Forma de arco superior (espejo)
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(247, 177, 199, 0.05)'
      }}>
        
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Sugerencia de estilo
        </span>
        
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 4rem)', color: 'var(--color-cream)', fontWeight: 400, margin: 0, lineHeight: 1, zIndex: 2, position: 'relative' }}>
          Dress Code
        </h2>

        {/* Imagen con márgenes negativos para reducir los espacios en blanco de su archivo original sin afectar su tamaño visual */}
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [-3, 3, -3], x: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'relative', width: '100%', maxWidth: '180px', height: '150px', marginTop: '0.5rem', marginBottom: '0.8rem', zIndex: 1, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }}
        >
          <Image 
            src="/images/decorativas_v2/dress_etiqueta.webp" 
            alt="Etiqueta elegante" 
            fill 
            sizes="(max-width: 968px) 180px, 180px"
            style={{ objectFit: 'contain' }} 
          />
        </motion.div>
        
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
                border: '1px solid rgba(247, 177, 199, 0.5)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
              }} />
            );
          })}
        </div>

        {/* Nota especial rediseñada de forma más elegante */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', 
          borderTop: '1px solid rgba(247, 177, 199, 0.2)', 
          paddingTop: '1.5rem', marginTop: '1rem',
          width: '80%'
        }}>
          <span style={{ fontFamily: 'var(--font-pinyon)', fontSize: '2rem', color: 'var(--color-gold)', lineHeight: 0.8 }}>Nota Especial</span>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.2rem' }}>
            <Ban size={14} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem', lineHeight: 1.5, letterSpacing: '0.05em', fontStyle: 'italic', margin: 0, textAlign: 'left' }}>
              {dressCode.notes}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
