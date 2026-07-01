'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
import { CSSSparkle } from '@/components/ui/CSSSparkle';
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
    <section 
      aria-label="Pases Backstage VIP"
      style={{ 
        minHeight: 'auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'var(--color-black)', 
        padding: '6rem 2rem', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Soft Glow to enhance the VIP pass */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(247, 177, 199, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <CSSSparkle size={20} color="var(--color-gold)" top="20%" left="15%" delay="0s" points={8} />
        <CSSSparkle size={30} color="#EAEAEA" top="10%" right="20%" delay="1s" points={4} />
        <CSSSparkle size={24} color="var(--color-gold)" bottom="30%" left="10%" delay="0.5s" points={4} />
        <CSSSparkle size={15} color="#EAEAEA" bottom="20%" right="15%" delay="1.5s" points={8} />
        <CSSSparkle size={18} color="var(--color-gold)" top="50%" right="5%" delay="0.2s" points={4} />
      </div>

      {/* Bolas de Disco Colgantes */}
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '2%',
          width: 'clamp(100px, 20vw, 150px)',
          height: 'clamp(100px, 20vw, 150px)',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.9,
          transformOrigin: 'top center',
        }}
      >
        <Image 
          src="/images/decorativas_v2/chrome_starts.png"
          alt="Disco ball"
          fill
          sizes="(max-width: 768px) 150px, 200px"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      <motion.div
        animate={{ rotate: [3, -3, 3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-5%',
          right: '5%',
          width: 'clamp(150px, 30vw, 220px)',
          height: 'clamp(150px, 30vw, 220px)',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.85,
          transformOrigin: 'top center',
          transform: 'scaleX(-1)'
        }}
      >
        <Image 
          src="/images/decorativas_v2/boladisco2.png"
          alt="Disco ball"
          fill
          sizes="(max-width: 768px) 220px, 300px"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      <motion.div 
        initial={{ rotate: -3 }}
        animate={{ rotate: 3 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
      >
        {/* Lanyard de Cinta Enroscada */}
        <div style={{ 
          position: 'absolute', 
          zIndex: 1, 
          bottom: '100%', 
          left: '50%', 
          transform: 'translate(-100%, 15px)', 
          width: '100vw', 
          height: '100px', 
          pointerEvents: 'none' 
        }}>
          {/* SVG responsivo que alinea su borde derecho con el centro exacto de la tarjeta (left: 50%) */}
          <svg width="100%" height="100%" viewBox="0 0 1000 150" preserveAspectRatio="none" style={{ filter: 'drop-shadow(0px 8px 6px rgba(0,0,0,0.8))' }}>
            <defs>
              <linearGradient id="cintaFront" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f7b1c7" />
                <stop offset="50%" stopColor="#ffe4ec" />
                <stop offset="100%" stopColor="#f7b1c7" />
              </linearGradient>
              <linearGradient id="cintaBack" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8c5b6b" />
                <stop offset="50%" stopColor="#b57a8f" />
                <stop offset="100%" stopColor="#8c5b6b" />
              </linearGradient>
            </defs>
            
            {/* Un lazo compacto con un giro completo (360 grados) formando un rizo elegante */}
            
            {/* 1. Parte trasera del rizo */}
            <path d="M 750 80 C 825 40, 700 0, 650 40" fill="none" stroke="url(#cintaBack)" strokeWidth="18" strokeLinecap="round" />
            
            {/* 2. Cinta ascendente principal (viene desde la izquierda y forma la base del giro) */}
            <path d="M 0 100 C 400 150, 600 150, 750 80" fill="none" stroke="url(#cintaFront)" strokeWidth="18" strokeLinecap="round" />
            
            {/* 3. Cinta frontal descendente (cierra el bucle cruzando sobre la principal y baja al clip en Y=150) */}
            <path d="M 650 40 C 600 80, 900 120, 1000 150" fill="none" stroke="url(#cintaFront)" strokeWidth="18" strokeLinecap="square" />
          </svg>
        </div>
        
        {/* Clip Metálico Mejorado */}
        <div style={{ 
          width: '24px', 
          height: '35px', 
          border: '3px solid #d4d4d8', 
          borderRadius: '10px 10px 16px 16px', 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(180,180,180,0.5))',
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,1), 0 2px 4px rgba(0,0,0,0.5)',
          position: 'relative', 
          top: '-15px', 
          zIndex: 2,
          transform: 'rotate(-5deg)', // ligero ángulo para acompañar la cinta
          transformOrigin: 'top center'
        }} />
        
        {/* Credencial VIP Física (Ultra-Compacta) */}
        <div style={{ 
          width: '260px', 
          height: '300px', 
          backgroundColor: '#050505', 
          borderRadius: '10px', 
          border: '1px solid rgba(247, 177, 199, 0.4)', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 8px 15px rgba(0,0,0,0.5), inset 0 0 15px rgba(247, 177, 199, 0.05)', 
          position: 'relative', 
          top: '-25px', 
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1.5rem 1.25rem 1.25rem 1.25rem',
          overflow: 'hidden'
        }}>
          {/* Background image New York B/W */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.75, pointerEvents: 'none' }}>
            <Image 
              src="/images/decorativas_v2/fondo_newyork.webp" 
              alt="NY Background" 
              fill 
              sizes="(max-width: 768px) 260px, 260px"
              className="object-cover grayscale" 
              style={{ objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #050505 75%)' }} />
          </div>

          {/* Troquelado superior para el clip */}
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            width: '45px', 
            height: '8px', 
            backgroundColor: 'var(--color-black)', // Transparencia simulada pintando del color de fondo general
            borderRadius: '8px', 
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)',
            zIndex: 10 
          }} />

          {/* VIP PASS header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', zIndex: 5 }}>
            <Compass className="w-5 h-5 drop-shadow-md" style={{ color: 'var(--color-gold)' }} />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.15em', margin: 0, lineHeight: 1 }}>VIP</h2>
          </div>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.3em', fontWeight: 600, zIndex: 5, marginTop: '0.2rem' }}>BACKSTAGE</span>
          
          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(247, 177, 199, 0.5), transparent)', margin: '0.75rem 0', zIndex: 5 }} />

          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem', letterSpacing: '0.15em', zIndex: 5, textTransform: 'uppercase', fontWeight: 600 }}>
            {passes.topLabel || 'ACCESS GRANTED'}
          </p>
          
          {/* Nro de Personas (Reemplaza el nombre) */}
          <h3 style={{ fontFamily: 'var(--font-pinyon)', fontSize: '2rem', color: 'var(--color-gold)', margin: '0.5rem 0', textAlign: 'center', zIndex: 5, textShadow: '0 2px 8px rgba(0,0,0,0.8)', lineHeight: 1.1 }}>
            {passes.quantity} Persona
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.75rem', zIndex: 5, borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 0', marginTop: '0.25rem' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)', display: 'block', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.15rem' }}>DATE</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#fff', fontWeight: 900, letterSpacing: '0.05em' }}>{dayNumber} {shortMonth.toUpperCase()}</span>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div style={{ textAlign: 'center', flex: 1 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)', display: 'block', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.15rem' }}>TIME</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#fff', fontWeight: 900, letterSpacing: '0.05em' }}>{event.receptionTime}</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', zIndex: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Realistic Barcode */}
            <div style={{ 
              width: '90%', 
              height: '35px', 
              backgroundColor: '#fff',
              padding: '3px',
              borderRadius: '2px',
              display: 'flex',
              gap: '2px',
              alignItems: 'stretch',
              justifyContent: 'center'
            }}>
              {/* Generamos barras aleatorias fijas para el diseño del código de barras */}
              {[3, 1, 4, 2, 1, 3, 2, 4, 1, 1, 3, 2, 1, 4, 2, 2, 1, 3, 1].map((w, i) => (
                <div key={i} style={{ width: `${w * 1.5}px`, backgroundColor: '#000', height: '100%' }} />
              ))}
            </div>
         
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Opción 2: Diseño Original (Pase Horizontal Perlado adaptado a oscuro)
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
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(247, 177, 199, 0.15)',
      }}
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(247, 177, 199, 0.05) 0%, transparent 70%)',
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
              color: 'var(--color-cream)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '18px',
              border: '1px solid rgba(247, 177, 199, 0.4)',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(247, 177, 199, 0.05)',
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
                  background: 'radial-gradient(circle at 70% 50%, rgba(247, 177, 199, 0.05) 0%, transparent 80%)',
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
                        color: 'var(--color-cream)',
                        textTransform: 'uppercase',
                        lineHeight: 1,
                      }}
                    >
                      VIP PASS
                    </h3>
                    <Compass className="w-5 h-5 md:w-7 md:h-7 stroke-[1.5]" style={{ color: 'var(--color-gold)' }} />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--color-gold)',
                        border: 'none',
                        color: 'var(--color-black)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
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
                        color: 'rgba(255,255,255,0.7)',
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
                        color: 'rgba(255,255,255,0.5)',
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
                        color: 'rgba(255,255,255,0.5)',
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
                  border: '1px dashed rgba(247, 177, 199, 0.4)',
                  backgroundColor: 'rgba(247, 177, 199, 0.05)',
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
                    color: 'var(--color-cream)',
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
                    border: '1px dashed rgba(247, 177, 199, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Compass className="w-5 h-5 stroke-[1.2]" style={{ color: 'var(--color-gold)' }} />
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '5px',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
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
                  borderBottom: '1px solid rgba(247, 177, 199, 0.4)',
                  zIndex: 20,
                }}
              />

              <div
                style={{
                  height: '100%',
                  width: 0,
                  borderLeft: '1px dashed rgba(247, 177, 199, 0.4)',
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
                  borderTop: '1px solid rgba(247, 177, 199, 0.4)',
                  zIndex: 20,
                }}
              />
            </div>

            {/* Lado derecho - Stub del ticket */}
            <div
              style={{
                width: 'clamp(65px, 15vw, 160px)',
                backgroundColor: 'rgba(247, 177, 199, 0.05)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
                borderLeft: '1px solid rgba(247, 177, 199, 0.1)',
              }}
            >
              {/* Leopardo marca de agua en el Stub */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.15,
                  pointerEvents: 'none',
                  mixBlendMode: 'lighten'
                }}
              >
                <Image
                  src="/images/decorativas_v2/fondo_newyork.webp"
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
                  color: 'rgba(247, 177, 199, 0.25)',
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
