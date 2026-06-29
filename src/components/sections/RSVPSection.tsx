'use client';

import { useState } from 'react';
import { useRSVPForm } from '@/hooks/useRSVPForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { InvitationConfig } from '@/types/invitation';

interface RSVPSectionProps {
  config: InvitationConfig;
}

/**
 * Sección de confirmación de asistencia (RSVP).
 * 
 * Características:
 * - Formulario premium con estilo minimalista oscuro y detalles dorados.
 * - Validación y gestión de estado (idle, submitting, success, error) con useRSVPForm.
 * - Morphing suave a pantalla de confirmación exitosa.
 * - Stepper de invitados interactivo con botones magnéticos.
 */
export function RSVPSection({ config }: RSVPSectionProps) {
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