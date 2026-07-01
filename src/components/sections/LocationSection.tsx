'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { InvitationConfig } from '@/types/invitation';
import { ArrowUpRight, MapPin } from 'lucide-react';

interface LocationSectionProps {
  config: InvitationConfig;
}

export function LocationSection({ config }: LocationSectionProps) {
  const { event } = config;
  const venueName = event.venue.name.split('(')[0].trim();
  const venueSubtitle = event.venue.name.includes('(') ? event.venue.name.split('(')[1].replace(')', '').trim() : '';

  return (
    <section style={{ 
      position: 'relative', 
      backgroundColor: 'var(--color-black)', 
      minHeight: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      overflow: 'hidden',
      zIndex: 1
    }}>
      {/* Editorial Image Background (Right Side / Behind text) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1, x: 50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{
          position: 'absolute',
          top: '5%',
          right: '-25%',
          width: '90%',
          maxWidth: '700px',
          height: '90%',
          zIndex: 0,
          opacity: 0.15, // Muy sutil
          mixBlendMode: 'lighten',
          pointerEvents: 'none'
        }}
      >
        <Image 
          src="/images/decorativas_v2/edificio2.png" 
          alt="NY Location"
          fill
          sizes="(max-width: 700px) 100vw, 700px"
          style={{ objectFit: 'contain', filter: 'grayscale(100%) contrast(120%)' }}
        />
      </motion.div>

      {/* Massive Typography Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Tiny Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <span style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold)' }} />
          El Lugar
        </motion.p>

        {/* Massive Name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} viewport={{ once: true }}
          style={{ 
            fontFamily: 'var(--font-pinyon)', 
            fontSize: 'clamp(4.5rem, 12vw, 10rem)', // Un toque más pequeño para no empujar la caja tan abajo
            color: 'var(--color-cream)', 
            lineHeight: 0.85, 
            fontWeight: 300, 
            margin: '0 0 2rem 2px', // Menos margen inferior
            textShadow: '0 20px 40px rgba(0,0,0,0.8)' // Ensures readability over image
          }}
        >
          {venueName}
        </motion.h2>

        {/* Divider & Address Grid */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} viewport={{ once: true }}
          style={{ borderTop: '1px solid rgba(247, 177, 199, 0.3)', paddingTop: '2rem' }}
        >
          {/* Address Details & Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px' }}>
            <div>
              {venueSubtitle && (
                <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-cream)', fontSize: '1.2rem', fontWeight: 300, letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  {venueSubtitle}
                </h3>
              )}
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                {event.venue.address}
              </p>
            </div>

            {/* Avant-Garde Map Button (Left aligned) */}
            <a href={event.venue.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', alignSelf: 'flex-start' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative', width: '110px', height: '110px', borderRadius: '50%', // Botón un poco más compacto
                  border: '1px solid rgba(192,192,192,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-gold)', backgroundColor: 'rgba(255,255,255,0.02)'
                }}
              >
                <motion.svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: -15, width: 'calc(100% + 30px)', height: 'calc(100% + 30px)' }} animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                  <path id="circleTextPathIconic" d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="transparent" />
                  <text style={{ fontSize: '7px', fill: 'var(--color-gold)', fontFamily: 'var(--font-dm-mono)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 500 }}>
                    <textPath href="#circleTextPathIconic" startOffset="0%">
                      VER EN GOOGLE MAPS • RUTA AL EVENTO • 
                    </textPath>
                  </text>
                </motion.svg>
                
                <MapPin size={38} strokeWidth={1} color="var(--color-cream)" />
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
