'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { InvitationConfig } from '@/types/invitation';

interface DressCodeSectionProps {
  config: InvitationConfig;
}

export function DressCodeSection({ config }: DressCodeSectionProps) {
  const { dressCode } = config;
  const containerRef = useRef<HTMLElement>(null);

  // Configuramos el progreso del scroll respecto a este contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animaciones mapeadas al progreso (0 a 1)
  // 0 - 0.1: Cerrado
  // 0.1 - 0.4: Abriendo
  // 0.4 - 0.6: Abierto
  // 0.6 - 0.9: Cerrando
  // 0.9 - 1.0: Cerrado
  const leftCurtainX = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.6, 0.9, 1], ["0%", "0%", "-100%", "-100%", "0%", "0%"]);
  const rightCurtainX = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.6, 0.9, 1], ["0%", "0%", "100%", "100%", "0%", "0%"]);
  
  // Opacidad del texto 'DRESS CODE'
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.8, 0.9, 1], [1, 1, 0, 0, 1, 1]);

  return (
    <section 
      ref={containerRef} 
      style={{ 
        height: '250vh', // Altura extra para permitir el scroll
        backgroundColor: '#fdfbf7', // Fondo perla
        position: 'relative' 
      }}
    >
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Contenido Interior (Siluetas Option 1 adaptadas a tema claro) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', maxWidth: '800px', textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'var(--color-gold-dark)', fontWeight: 300, margin: 0 }}>
            Dress Code
          </h2>
          <p style={{ fontFamily: 'var(--font-dm-mono)', color: '#555', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            {dressCode.description}
          </p>
          
          {/* SVG Silhouettes */}
          <div style={{ display: 'flex', gap: '3rem', margin: '2rem 0', opacity: 0.9 }}>
            <svg width="60" height="200" viewBox="0 0 60 200" fill="none" stroke="var(--color-gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '500', strokeDashoffset: '0', animation: 'draw 3s ease-out forwards' }}>
              <path d="M30 10 C35 10 38 15 35 25 C30 30 25 35 20 45 C15 60 20 80 30 100 C40 120 45 150 40 180 M30 10 C25 10 22 15 25 25 C30 30 35 35 40 45 C45 60 40 80 30 100 C20 120 15 150 20 180" />
              <circle cx="30" cy="15" r="8" />
            </svg>
            <svg width="60" height="200" viewBox="0 0 60 200" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '500', strokeDashoffset: '0', animation: 'draw 3s ease-out forwards 0.5s' }}>
              <path d="M30 15 C40 15 45 20 45 30 C45 45 35 50 30 60 C25 80 20 110 20 180 M30 15 C20 15 15 20 15 30 C15 45 25 50 30 60 C35 80 40 110 40 180" />
              <circle cx="30" cy="15" r="8" />
            </svg>
          </div>

          <div style={{ width: '1px', height: '40px', backgroundColor: '#ccc' }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {dressCode.colors?.map((color, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: color, border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
              </div>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', color: '#666', fontStyle: 'italic', fontSize: '0.9rem', maxWidth: '400px', lineHeight: 1.6, marginTop: '1rem' }}>
            {dressCode.notes}
          </p>
        </div>

        {/* Cortina Izquierda */}
        <motion.div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', 
          backgroundColor: '#fdfbf7', // Color perla
          borderRight: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '5px 0 25px rgba(0,0,0,0.03)',
          zIndex: 10,
          x: leftCurtainX,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1rem'
        }}>
          <motion.span style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
            color: 'var(--color-gold-dark)', 
            letterSpacing: '2px',
            opacity: textOpacity
          }}>
            DRESS
          </motion.span>
        </motion.div>

        {/* Cortina Derecha */}
        <motion.div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', 
          backgroundColor: '#fdfbf7', // Color perla
          borderLeft: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '-5px 0 25px rgba(0,0,0,0.03)',
          zIndex: 10,
          x: rightCurtainX,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '1rem'
        }}>
          <motion.span style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
            color: 'var(--color-gold-dark)', 
            letterSpacing: '2px',
            opacity: textOpacity
          }}>
            CODE
          </motion.span>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes draw {
          from { stroke-dashoffset: 500; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </section>
  );
}
