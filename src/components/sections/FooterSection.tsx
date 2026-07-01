'use client';

import Image from 'next/image';
import { defaultInvitationConfig } from '@/config/invitation.config';

/**
 * Sección de pie de página (Footer).
 */
export function FooterSection() {
  const { quinceañera } = defaultInvitationConfig;

  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        padding: '1rem clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Imagen de fondo de Nueva York */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <Image 
          src="/images/decorativas_v2/bg_newyork.jpg" 
          alt="NY Background Footer" 
          fill 
          className="object-cover" 
          style={{ objectPosition: 'bottom' }}
        />
        {/* Degradado negro para oscurecer y atenuar la imagen */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)' }} />
      </div>

      <div
        className="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left"
      >
        {/* Lado izquierdo - Info de la Quinceañera */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              Exclusive Pass
            </span>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', boxShadow: '0 2px 4px rgba(0,0,0,0.8)' }} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'clamp(3.5rem, 8vw, 4.5rem)',
              color: '#FFFFFF',
              fontWeight: 400,
              lineHeight: 1.1,
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              userSelect: 'none',
              textShadow: '0 4px 15px rgba(0,0,0,0.8)'
            }}
          >
            {quinceañera.name}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 5,
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
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
            padding: '0.47rem 1.75rem',
            backgroundColor: '#FAFAFA',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04), 0 2px 10px rgba(0, 0, 0, 0.02)',
            textDecoration: 'none',
            maxWidth: '380px',
            width: '100%',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(247, 177, 199, 0.5)';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(247, 177, 199, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.04), 0 2px 10px rgba(0, 0, 0, 0.02)';
            e.currentTarget.style.backgroundColor = '#FAFAFA';
          }}
        >
          {/* Detalles del ticket */}
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0 }}>
            <span style={{ fontSize: '0.5rem', fontFamily: 'var(--font-dm-mono)', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Digital Invitation Design
            </span>
            <span style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 900, color: '#111111', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.02em' }}>
              Daniela Miranda
            </span>
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-sans)', color: '#666666', marginTop: '4px', fontWeight: 500 }}>
              ¿Quieres una invitación como esta?
            </span>
          </div>

          {/* Botón de Acción */}
          <div
            style={{
              backgroundColor: '#111111',
              color: '#FFFFFF',
              padding: '0.6rem 1.2rem',
              borderRadius: '24px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111111';
            }}
          >
            <span>Escribir</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </a>
      </div>
    </footer>
  );
}
