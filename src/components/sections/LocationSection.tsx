'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { InvitationConfig } from '@/types/invitation';
import { Navigation } from 'lucide-react';

interface LocationSectionProps {
  config: InvitationConfig;
}

export function LocationSection({ config }: LocationSectionProps) {
  const { event } = config;
  
  return (
    <section style={{ 
      minHeight: 'auto', // Cambiado de 100vh para reducir la altura
      backgroundColor: 'var(--color-black)', // Fondo oscuro general
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '3rem 1rem', // Padding reducido
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Contenedor Ovalado (Píldora) con Animación de Entrada */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-50px' }}
        style={{
          position: 'relative', width: '100%', maxWidth: '420px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)', // Cristal oscuro
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(247, 177, 199, 0.4)', // Borde rose gold
          borderRadius: '150px', // Radio reducido para adaptarse a menor altura
          padding: '3rem 1.5rem', // Padding vertical y horizontal reducidos significativamente
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(247, 177, 199, 0.05)', overflow: 'hidden'
        }}
      >
        {/* Imagen de fondo sutil con animación de paneo continuo */}
        <motion.div 
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: 0, opacity: 0.15, zIndex: 1,
            backgroundImage: 'url("/images/decorativas_v2/ubicacion-ny.png")',
            backgroundSize: '150% auto', // Más grande para permitir el paneo
            mixBlendMode: 'lighten' // Ajustado para que resalte sobre el fondo oscuro
          }} 
        />
        
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            style={{ 
              fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: 'var(--color-black)', backgroundColor: 'var(--color-gold)',
              border: 'none', padding: '0.4rem 1rem', borderRadius: '30px', letterSpacing: '0.3em', 
              textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem'
            }}
          >
            El Lugar
          </motion.p>
          
          {/* Nombre del Salón - Tipografía Pinyon solicitada */}
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            viewport={{ once: true }}
            style={{ 
              fontFamily: 'var(--font-pinyon)', 
              fontSize: 'clamp(3.8rem, 12vw, 5.5rem)', // Más grande porque es fuente cursiva
              color: 'var(--color-cream)', 
              lineHeight: 1, fontWeight: 400, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
              textTransform: 'capitalize' // Quitamos mayúsculas puras para que Pinyon se lea bien
            }}
          >
            <span>{event.venue.name.split('(')[0].trim()}</span>
            {event.venue.name.includes('(') && (
              <span style={{ fontSize: '0.25em', fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', marginTop: '0.5rem', fontWeight: 600, textTransform: 'uppercase' }}>
                {event.venue.name.split('(')[1].replace(')', '').trim()}
              </span>
            )}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginTop: '0.5rem' }}
          >
            {event.venue.address}
          </motion.p>
          
          {/* Botón Circular del Mapa con animaciones */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ position: 'relative', width: '140px', height: '140px', marginTop: '1.5rem' }}
          >
            <a href={event.venue.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <motion.svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%' }} animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
                <path id="circleTextPathLocation1" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
                <text style={{ fontSize: '9px', fill: 'var(--color-gold)', fontFamily: 'var(--font-dm-mono)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                  <textPath href="#circleTextPathLocation1" startOffset="0%">
                    RUTA AL EVENTO • MAPA GPS • UBICACIÓN • 
                  </textPath>
                </text>
              </motion.svg>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(247, 177, 199, 0.3)' }}
              >
                <Navigation className="w-6 h-6" color="var(--color-black)" strokeWidth={2.5} style={{ transform: 'rotate(45deg)', marginLeft: '-2px', marginBottom: '-2px' }} />
              </motion.div>
            </a>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
