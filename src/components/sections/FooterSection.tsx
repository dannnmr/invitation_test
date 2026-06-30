'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { defaultInvitationConfig } from '@/config/invitation.config';

/**
 * Sección de pie de página (Footer).
 */
export function FooterSection() {
  const { quinceañera } = defaultInvitationConfig;

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-black)',
        padding: '3rem clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Imagen de fondo de Nueva York */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none', zIndex: 0 }}>
        <Image 
          src="/images/decorativas_v2/bg_newyork.jpg" 
          alt="NY Background Footer" 
          fill 
          className="object-cover" 
          style={{ objectPosition: 'center' }}
        />
        {/* Degradado para oscurecer y fusionar con el fondo */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-black) 0%, transparent 50%, var(--color-black) 100%)' }} />
      </div>

     

      <div
        className="relative z-10 w-full max-w-[850px] flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-center md:text-left"
      >
        {/* Lado izquierdo - Info de la Quinceañera */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-gold-dark)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Exclusive Pass
            </span>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-gold)' }} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'clamp(3rem, 7vw, 4rem)',
              color: 'var(--color-cream)',
              fontWeight:400,
              lineHeight: 1.1,
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              userSelect: 'none',
            }}
          >
            {quinceañera.name}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-cream-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom:5
            }}
          >
            no dejes que te lo cuenten
          </p>
        </div>

        {/* Lado derecho - Contact Card del Diseñador */}
        <a
          href="https://wa.me/59168183484?text=Hola%20Daniela!%20Me%20gustaría%20saber%20más%20sobre%20tus%20diseños%20de%20invitaciones%20digitales."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid rgba(244, 114, 182, 0.2)',
            borderRadius: '18px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
            textDecoration: 'none',
            maxWidth: '360px',
            width: '100%',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(244, 114, 182, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.2)';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.02)';
          }}
        >
          {/* Detalles del ticket */}
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0 }}>
            <span style={{ fontSize: '7.5px', fontFamily: 'var(--font-dm-mono)', fontWeight: 800, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Digital Invitation Design
            </span>
            <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 900, color: 'var(--color-cream)', textTransform: 'uppercase', marginTop: '2px', letterSpacing: '0.05em' }}>
              Daniela Miranda
            </span>
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-sans)', color: 'var(--color-cream-muted)', marginTop: '2px' }}>
              ¿Quieres una invitación como esta?
            </span>
          </div>

          {/* Botón de Acción */}
          <div
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-cream)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            <span>Contacto</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </a>
      </div>
    </footer>
  );
}
