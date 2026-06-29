'use client';

import { useState } from 'react';
import { useRSVPForm } from '@/hooks/useRSVPForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
import type { InvitationConfig } from '@/types/invitation';

interface RSVPSectionProps {
  config: InvitationConfig;
}

export function RSVPSection({ config }: RSVPSectionProps) {
  return <RSVPOption4 config={config} />;
}

function RSVPOption1({ config }: RSVPSectionProps) {
  const [confirmedName, setConfirmedName] = useState('');
  const { formData, formState, errorMessage, submitBtnRef, handleChange, handleSubmit } = useRSVPForm({
    invitationId: config.id,
    onSuccess: (name) => setConfirmedName(name),
  });

  const isSuccess = formState === 'success';

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eef2f5', padding: '2rem' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '700px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', overflow: 'hidden', position: 'relative' }}>
        
        {/* Lado Principal del Boleto */}
        <div style={{ flex: 1, padding: '3rem', position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '2rem', color: '#111', textTransform: 'uppercase', letterSpacing: '2px' }}>ADMIT ONE</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#666', marginTop: '1rem', fontSize: '0.9rem' }}>Please RSVP by June 16th to secure your entry.</p>

          {!isSuccess ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.5rem' }}>GUEST NAME</label>
                <input 
                  type="text" 
                  value={formData.guestName}
                  onChange={(e) => handleChange('guestName', e.target.value)}
                  placeholder="Enter full name"
                  disabled={formState === 'submitting'}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none' }}
                />
              </div>
              {errorMessage && <p style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errorMessage}</p>}
            </form>
          ) : (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-pinyon)', fontSize: '3rem', color: '#d4af37' }}>Confirmed</h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: '#111', fontSize: '1rem' }}>See you there, {confirmedName}!</p>
            </div>
          )}
        </div>

        {/* Línea Perforada */}
        <div style={{ width: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundImage: 'linear-gradient(#ccc 50%, transparent 50%)', backgroundSize: '100% 20px', backgroundRepeat: 'repeat-y' }} />

        {/* Stub (Trozo arrancable) */}
        <div style={{ 
          width: '200px', 
          backgroundColor: '#fafafa', 
          padding: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
          transform: isSuccess ? 'translateY(100px) rotate(10deg)' : 'translateY(0)',
          opacity: isSuccess ? 0 : 1
        }}>
          {!isSuccess && (
            <button 
              onClick={(e) => { e.preventDefault(); handleSubmit(); }}
              disabled={formState === 'submitting'}
              style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-dm-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
            >
              {formState === 'submitting' ? '...' : 'TEAR'}
            </button>
          )}
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: '#eee', writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginTop: '2rem' }}>VIP</span>
        </div>
      </div>
    </section>
  );
}

function RSVPOption2({ config }: RSVPSectionProps) {
  const [confirmedName, setConfirmedName] = useState('');
  const { formData, formState, errorMessage, submitBtnRef, handleChange, handleSubmit } = useRSVPForm({
    invitationId: config.id,
    onSuccess: (name) => setConfirmedName(name),
  });

  const isSuccess = formState === 'success';

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#181818', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#222', borderRadius: '15px', padding: '3rem', border: '2px solid #333', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', textAlign: 'center', position: 'relative' }}>
        
        <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: '4rem', color: '#d4af37', marginBottom: '1rem' }}>R.S.V.P</h2>
        <p style={{ fontFamily: 'var(--font-sans)', color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>Tu presencia es nuestro mayor regalo.</p>

        {!isSuccess ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <input 
              type="text" 
              value={formData.guestName}
              onChange={(e) => handleChange('guestName', e.target.value)}
              placeholder="Nombre y Apellido"
              disabled={formState === 'submitting'}
              style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #555', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1.2rem', textAlign: 'center', outline: 'none' }}
            />
            {errorMessage && <p style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errorMessage}</p>}
            
            <button 
              type="submit"
              disabled={formState === 'submitting'}
              style={{ 
                marginTop: '2rem', 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                backgroundColor: '#8b0000', 
                color: '#fff', 
                border: '4px solid #5a0000', 
                cursor: 'pointer', 
                fontFamily: 'var(--font-pinyon)', 
                fontSize: '2rem', 
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s',
                transform: formState === 'submitting' ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              Seal
            </button>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '1rem' }}>Click to Stamp</span>
          </form>
        ) : (
          <div style={{ marginTop: '3rem', animation: 'fadeIn 1s ease' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#8b0000', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid #5a0000', boxShadow: '0 10px 30px rgba(139,0,0,0.4)' }}>
              <span style={{ fontFamily: 'var(--font-pinyon)', fontSize: '3rem', color: '#fff' }}>M</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', color: '#fff', marginTop: '2rem' }}>¡Confirmado!</h3>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#aaa', fontSize: '1rem', marginTop: '0.5rem' }}>Gracias, {confirmedName}.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function RSVPOption3({ config }: RSVPSectionProps) {
  const [confirmedName, setConfirmedName] = useState('');
  const { formData, formState, errorMessage, submitBtnRef, handleChange, handleSubmit } = useRSVPForm({
    invitationId: config.id,
    onSuccess: (name) => setConfirmedName(name),
  });

  const isSuccess = formState === 'success';

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1a', padding: '2rem' }}>
      {/* Tablet Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        height: '600px', 
        backgroundColor: '#000', 
        borderRadius: '30px', 
        border: '12px solid #333', 
        boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.1)', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Tablet Top Bezel */}
        <div style={{ height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '4px', backgroundColor: '#222', borderRadius: '5px' }} />
        </div>

        {/* Tablet Screen */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderTop: '2px solid #444', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.5rem', color: '#111', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #111', paddingBottom: '0.5rem' }}>GUEST LIST APP</h2>
          
          <p style={{ fontFamily: 'var(--font-sans)', color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>Enter guest details to confirm attendance.</p>

          {!isSuccess ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ marginTop: 'auto', marginBottom: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>Full Name</label>
                <input 
                  type="text" 
                  value={formData.guestName}
                  onChange={(e) => handleChange('guestName', e.target.value)}
                  placeholder="e.g. John Doe"
                  disabled={formState === 'submitting'}
                  style={{ width: '100%', padding: '1rem', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none' }}
                />
              </div>
              {errorMessage && <p style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errorMessage}</p>}
              
              <button 
                type="submit"
                disabled={formState === 'submitting'}
                style={{ 
                  marginTop: '1rem', 
                  width: '100%', 
                  padding: '1rem', 
                  backgroundColor: '#111', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontFamily: 'var(--font-sans)', 
                  fontWeight: 800,
                  fontSize: '1rem', 
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
              >
                {formState === 'submitting' ? 'Processing...' : 'CHECK IN'}
              </button>
            </form>
          ) : (
            <div style={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#2ecc71', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', color: '#111', marginTop: '1rem' }}>Guest Checked In</h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: '#666', fontSize: '1rem', marginTop: '0.5rem' }}>{confirmedName} is confirmed.</p>
            </div>
          )}

        </div>

        {/* Tablet Home Button */}
        <div style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '2px solid #444' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #444' }} />
        </div>

      </div>
    </section>
  );
}

/**
 * Opción 4: Diseño original de RSVP
 */
function RSVPOption4({ config }: RSVPSectionProps) {
  const [confirmedName, setConfirmedName] = useState('');

  const {
    formData,
    formState,
    errorMessage,
    submitBtnRef,
    handleChange,
    handleSubmit,
  } = useRSVPForm({
    invitationId: config.id,
    onSuccess: (name) => {
      setConfirmedName(name);
    },
  });

  const sectionRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const formBoxRef = useScrollReveal<HTMLDivElement>({ y: 20, delay: 0.15 });

  const isSuccess = formState === 'success';

  return (
    <section
      ref={sectionRef}
      aria-label="Confirmación de asistencia (RSVP)"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Detalle decorativo de fondo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={formBoxRef}
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid rgba(244, 114, 182, 0.15)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 2.5rem)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.5s ease',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {!isSuccess ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Cabecera */}
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-gold)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Lista de Invitados
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-pinyon)',
                  fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                  fontWeight: 300,
                  color: 'var(--color-gold-dark)',
                  lineHeight: 1.1,
                  marginBottom: '0.75rem',
                }}
              >
                RSVP
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  color: 'var(--color-cream-muted)',
                  lineHeight: 1.5,
                  maxWidth: '380px',
                  margin: '0 auto',
                }}
              >
                Por favor, confírmanos tu presencia antes del 16 de Junio.
              </p>
            </div>

            {/* Input Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label
                htmlFor="guestName"
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-cream-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Nombre Completo
              </label>
              <input
                id="guestName"
                type="text"
                value={formData.guestName}
                onChange={(e) => handleChange('guestName', e.target.value)}
                placeholder="Ej. Daniela Hernandez"
                disabled={formState === 'submitting'}
                style={{
                  backgroundColor: 'var(--color-black-soft)',
                  border: '1px solid rgba(244, 114, 182, 0.2)',
                  borderRadius: '4px',
                  padding: '0.85rem 1rem',
                  color: 'var(--color-cream)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s, background-color 0.3s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.2)';
                  e.currentTarget.style.backgroundColor = 'var(--color-black-soft)';
                }}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p
                style={{
                  color: '#e06666',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-sans)',
                  textAlign: 'center',
                  marginTop: '-0.5rem',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              ref={submitBtnRef}
              type="submit"
              disabled={formState === 'submitting'}
              style={{
                backgroundColor: 'var(--color-gold)',
                border: '1px solid var(--color-gold)',
                borderRadius: '4px',
                color: 'var(--color-black)',
                cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                padding: '1rem',
                textTransform: 'uppercase',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                outline: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                if (formState !== 'submitting') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-gold)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(244, 114, 182, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (formState !== 'submitting') {
                  e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                  e.currentTarget.style.color = 'var(--color-black)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {formState === 'submitting' ? 'Enviando...' : 'Confirmar Asistencia'}
            </button>
          </form>
        ) : (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              animation: 'fadeIn 0.8s ease forwards',
            }}
          >
            {/* Icono de Check */}
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '1px solid rgba(244, 114, 182, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
              }}
            >
              ✓
            </div>

            <span
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-gold-dark)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              ¡Te esperamos!
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-pinyon)',
                fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                fontWeight: 300,
                color: 'var(--color-gold-dark)',
                lineHeight: 1.1,
              }}
            >
              Confirmado
            </h2>

            <div
              style={{
                width: '40px',
                height: '1px',
                backgroundColor: 'rgba(244, 114, 182, 0.3)',
                margin: '0.5rem 0',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--color-cream-muted)',
                lineHeight: 1.6,
                maxWidth: '360px',
              }}
            >
              Tu respuesta ha sido guardada. Nos hace muy felices saber que nos acompañarás en esta noche inolvidable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}