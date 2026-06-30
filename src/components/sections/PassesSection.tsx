'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
import type { InvitationConfig } from '@/types/invitation';

interface PassesSectionProps {
  config: InvitationConfig;
}

export function PassesSection({ config }: PassesSectionProps) {
  return <PassesOption1 config={config} />;
}

function PassesOption1({ config }: PassesSectionProps) {
  const { passes, quinceañera, event } = config;
  if (!passes) return null;

  const dayNumber = event.date.getDate();
  const shortMonth = event.date.toLocaleDateString('es-ES', { month: 'short' });

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdfbf7', padding: '2rem', overflow: 'hidden' }}>
      
      <motion.div 
        initial={{ rotate: -5 }}
        animate={{ rotate: 5 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Lanyard */}
        <div style={{ width: '15px', height: '150px', backgroundColor: '#222', backgroundImage: 'repeating-linear-gradient(45deg, #222, #222 5px, #111 5px, #111 10px)', borderLeft: '1px solid #333', borderRight: '1px solid #333', position: 'relative', zIndex: 1 }} />
        
        {/* Clip */}
        <div style={{ width: '30px', height: '40px', border: '4px solid #aaa', borderRadius: '15px', position: 'relative', top: '-10px', zIndex: 2, backgroundColor: 'transparent' }} />
        
        {/* VIP Card */}
        <div style={{ 
          width: '320px', 
          height: '480px', 
          backgroundColor: '#151515', 
          borderRadius: '12px', 
          border: '1px solid rgba(244, 114, 182, 0.3)', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)', 
          position: 'relative', 
          top: '-20px', 
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 1.5rem',
          overflow: 'hidden'
        }}>
          {/* Background image watermark */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
            <Image src="/images/decorativas_v2/fondo_newyork.png" alt="NY Background" fill className="object-cover grayscale" />
          </div>

          {/* Hole punch */}
          <div style={{ position: 'absolute', top: '15px', width: '60px', height: '15px', backgroundColor: '#fdfbf7', borderRadius: '10px', border: '1px solid #333', zIndex: 10 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', zIndex: 5 }}>
            <Compass className="w-6 h-6 text-pink-400 stroke-[1.5]" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 900, color: 'var(--color-gold)', letterSpacing: '4px', margin: 0 }}>VIP PASS</h2>
          </div>
          
          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(244,114,182,0.3)', margin: '1rem 0', zIndex: 5 }} />

          <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-cream-muted)', fontSize: '0.8rem', letterSpacing: '2px', zIndex: 5, textTransform: 'uppercase' }}>
            {passes.topLabel || 'ACCESS GRANTED'}
          </p>
          
          <h3 style={{ fontFamily: 'var(--font-pinyon)', fontSize: '3rem', color: '#fff', margin: '1.5rem 0', textAlign: 'center', zIndex: 5 }}>
            {quinceañera.name}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem', zIndex: 5, borderTop: '1px dashed #444', borderBottom: '1px dashed #444', padding: '1rem 0' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold-dark)', display: 'block' }}>DATE</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>{dayNumber} {shortMonth.toUpperCase()}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold-dark)', display: 'block' }}>TIME</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>{event.ceremonyTime} Hrs</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold-dark)', display: 'block' }}>ADMIT</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>{passes.quantity}</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', marginTop: 'auto', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '50px', backgroundImage: 'repeating-linear-gradient(90deg, #000, #000 3px, transparent 3px, transparent 7px)', backgroundSize: '100% 100%' }} />
          </div>
          
          <p style={{ fontFamily: 'var(--font-dm-mono)', color: '#888', fontSize: '0.65rem', marginTop: '0.5rem', zIndex: 5, letterSpacing: '2px' }}>
            VALID FOR ONE ENTRY
          </p>

        </div>
      </motion.div>
    </section>
  );
}

/**
 * Opción 2: Diseño Original (Pase Horizontal Perlado)
 */
export function PassesOption2({ config }: PassesSectionProps) {
  const { passes, event, quinceañera } = config;

  const dayName = event.date.toLocaleDateString('es-ES', { weekday: 'long' });
  const dayNumber = event.date.getDate();
  const monthName = event.date.toLocaleDateString('es-ES', { month: 'long' });
  const shortMonth = event.date.toLocaleDateString('es-ES', { month: 'short' });

  const formattedDayStr = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${dayNumber}`;
  const formattedMonthStr = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  if (!passes) return null;

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const ticketRef = useScrollReveal<HTMLDivElement>({ y: 40, delay: 0.2 });

  return (
    <section
      aria-label="Pases de acceso digital"
      style={{
        backgroundColor: '#fdfbf7',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
      }}
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(244, 114, 182, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '850px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Cabecera */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
              color: 'var(--color-gold)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            {passes.topLabel || 'Pases de Acceso'}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'clamp(3rem, 7vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--color-gold-dark)',
              lineHeight: 1.1,
            }}
          >
            {passes.mainTitle || 'Pases Digitales'}
          </h2>
        </div>

        {/* Boarding Pass Wrapper */}
        <div
          ref={ticketRef}
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '3rem', // Espacio para el leopardo sobresaliente
          }}
        >


          {/* Tarjeta del Ticket */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{
              width: '100%',
              display: 'flex',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '18px',
              border: '1px solid rgba(244, 114, 182, 0.2)',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.04)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Lado izquierdo - Cuerpo Principal */}
            <div
              style={{
                flex: 1,
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              {/* Filigrana rosa de fondo */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 70% 50%, rgba(244, 114, 182, 0.05) 0%, transparent 80%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Contenidos del ticket */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                  position: 'relative',
                  zIndex: 10,
                }}
              >
                {/* Cabecera del pase: VIP PASS */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-gold-dark)',
                        textTransform: 'uppercase',
                        lineHeight: 1,
                      }}
                    >
                      VIP PASS
                    </h3>
                    <Compass className="w-5 h-5 md:w-7 md:h-7 text-pink-400 stroke-[1.5]" />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(244, 114, 182, 0.08)',
                        border: '1px solid rgba(244, 114, 182, 0.25)',
                        color: 'var(--color-gold-dark)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        padding: '2px 10px',
                        borderRadius: '20px',
                        fontFamily: 'var(--font-dm-mono)',
                      }}
                    >
                      {passes.quantity} {passes.unitText || 'Pases'}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.7rem',
                        color: 'var(--color-cream-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      por invitación
                    </span>
                  </div>
                </div>

                {/* Grid de Datos: Fecha y Hora */}
                <div style={{ display: 'flex', gap: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        display: 'block',
                      }}
                    >
                      DATE
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                        fontWeight: 700,
                        color: 'var(--color-cream)',
                        marginTop: '2px',
                        display: 'block',
                      }}
                    >
                      {formattedDayStr}, {formattedMonthStr}
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        display: 'block',
                      }}
                    >
                      HOUR
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                        fontWeight: 700,
                        color: 'var(--color-cream)',
                        marginTop: '2px',
                        display: 'block',
                      }}
                    >
                      {event.ceremonyTime} Hrs
                    </span>
                  </div>
                </div>

                {/* Firma de invitada */}
                <span
                  style={{
                    fontFamily: 'var(--font-pinyon)',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    color: 'var(--color-gold)',
                  }}
                >
                  ¡Te espero para celebrar!
                </span>
              </div>

              {/* Sello circular retro (Estilo brújula safari) */}
              <div
                style={{
                  width: 'clamp(70px, 12vw, 95px)',
                  height: 'clamp(70px, 12vw, 95px)',
                  borderRadius: '50%',
                  border: '1px dashed rgba(244, 114, 182, 0.35)',
                  backgroundColor: 'rgba(244, 114, 182, 0.03)',
                  padding: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  userSelect: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '5px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'var(--color-gold-dark)',
                    textTransform: 'uppercase',
                    position: 'absolute',
                    top: '8%',
                  }}
                >
                  {quinceañera.name}
                </span>

                <div
                  style={{
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    border: '1px dashed rgba(244, 114, 182, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Compass className="w-5 h-5 text-pink-400 stroke-[1.2]" />
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '5px',
                    letterSpacing: '0.1em',
                    color: 'var(--color-cream-muted)',
                    textTransform: 'uppercase',
                    position: 'absolute',
                    bottom: '8%',
                  }}
                >
                  {dayNumber} {shortMonth.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Separador perforado troquelado */}
            <div
              style={{
                width: '18px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              {/* Troqueles circulares transparentes simulados pintando el fondo perla */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-black)', // Se fusiona con el fondo
                  borderBottom: '1px solid rgba(244, 114, 182, 0.2)',
                  zIndex: 20,
                }}
              />

              <div
                style={{
                  height: '100%',
                  width: 0,
                  borderLeft: '1px dashed rgba(244, 114, 182, 0.35)',
                  margin: '12px 0',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-black)', // Se fusiona con el fondo
                  borderTop: '1px solid rgba(244, 114, 182, 0.2)',
                  zIndex: 20,
                }}
              />
            </div>

            {/* Lado derecho - Stub del ticket */}
            <div
              style={{
                width: 'clamp(65px, 15vw, 160px)',
                backgroundColor: 'rgba(244, 114, 182, 0.02)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
                borderLeft: '1px solid rgba(244, 114, 182, 0.05)',
              }}
            >
              {/* Leopardo marca de agua en el Stub */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.08,
                  pointerEvents: 'none',
                }}
              >
                <Image
                  src="/images/decorativas_v2/fondo_newyork.png"
                  alt="Watermark New York Skyline"
                  fill
                  sizes="(max-width: 768px) 80px, 160px"
                  className="object-cover object-center grayscale"
                />
              </div>

              {/* Barra rosa en el extremo derecho */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  top: 0,
                  width: '8px',
                  backgroundColor: 'var(--color-gold)',
                }}
              />

              {/* Letra vertical XV */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                  color: 'rgba(244, 114, 182, 0.25)',
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '-0.1em',
                  userSelect: 'none',
                }}
              >
                XV
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
