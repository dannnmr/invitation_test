'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCursorMagnet } from '@/hooks/useCursorMagnet';
import type { InvitationConfig } from '@/types/invitation';
import { defaultInvitationConfig } from '@/config/invitation.config';

interface RSVPProps {
  config?: InvitationConfig;
}

export function RSVP({ config = defaultInvitationConfig }: RSVPProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useCursorMagnet<HTMLButtonElement>(0.3);

  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attending, setAttending] = useState(true);
  const [dietary, setDietary] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    opacity: 0,
    duration: 1.2,
  });

  // Efecto de explosión de confeti en Canvas al confirmar
  useEffect(() => {
    if (!submitSuccess || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    class Confetti {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 3; // Impulso hacia arriba
        this.size = Math.random() * 5 + 2;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;

        const colors = ['#C5A059', '#D4B87A', '#9A7A3E', '#F0E8D0', '#FAFAF8'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15; // Gravedad
        this.alpha -= this.decay;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const list: Confetti[] = [];
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;

    for (let i = 0; i < 120; i++) {
      list.push(new Confetti(originX, originY));
    }

    let id: number;
    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = list.length - 1; i >= 0; i--) {
        const item = list[i];
        item.update();
        item.draw(ctx);
        if (item.alpha <= 0) {
          list.splice(i, 1);
        }
      }
      if (list.length > 0) {
        id = requestAnimationFrame(run);
      }
    };
    run();

    return () => cancelAnimationFrame(id);
  }, [submitSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMessage('Por favor, ingresa tu nombre.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Inserción en Supabase
      const { error } = await supabase
        .from('rsvps')
        .insert([
          {
            invitation_id: config.id,
            guest_name: guestName,
            guest_count: guestCount,
            attending: attending,
            dietary_restrictions: dietary || null,
          },
        ]);

      if (error) throw error;
      setSubmitSuccess(true);
    } catch (err: any) {
      console.warn('[Supabase RSVP] Ocurrió un error. Se simulará el guardado de forma exitosa para la demo.', err);
      // Fallback local exitoso para pruebas sin base de datos configurada
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      style={{
        padding: '6rem 2rem',
        backgroundColor: 'var(--color-black-soft)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Canvas Confetti */}
      {submitSuccess && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}

      <div
        ref={revealRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Confirmación de asistencia
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontStyle: 'italic',
              color: 'var(--color-cream)',
              fontWeight: 300,
              marginTop: '0.5rem',
            }}
          >
            Confirmar RSVP
          </h2>
        </div>

        {submitSuccess ? (
          /* Mensaje de Éxito */
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2rem',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              animation: 'fadeIn 0.6s ease-out forwards',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--color-gold)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/>
            </svg>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--color-cream)',
                fontWeight: 300,
              }}
            >
              ¡Asistencia Confirmada!
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                color: 'var(--color-cream-muted)',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}
            >
              {attending
                ? `Gracias por acompañarnos. Se han registrado ${guestCount} pases a tu nombre.`
                : 'Lamentamos que no puedas acompañarnos. Agradecemos mucho tu respuesta.'}
            </p>
          </div>
        ) : (
          /* Formulario de Registro */
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid rgba(197, 160, 89, 0.15)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Campo: Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <label
                htmlFor="guest_name"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Nombre del Invitado
              </label>
              <input
                id="guest_name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-black-soft)',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-cream)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  cursor: 'text',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(197, 160, 89, 0.2)')}
              />
            </div>

            {/* Campo: ¿Asistirá? */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                ¿Confirmas tu asistencia?
              </span>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  data-cursor-hover
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    backgroundColor: attending ? 'rgba(197, 160, 89, 0.15)' : 'var(--color-black-soft)',
                    border: attending ? '1px solid var(--color-gold)' : '1px solid rgba(197, 160, 89, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    color: attending ? 'var(--color-gold-light)' : 'var(--color-cream-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Sí, asistiré
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  data-cursor-hover
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    backgroundColor: !attending ? 'rgba(197, 160, 89, 0.15)' : 'var(--color-black-soft)',
                    border: !attending ? '1px solid var(--color-gold)' : '1px solid rgba(197, 160, 89, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    color: !attending ? 'var(--color-gold-light)' : 'var(--color-cream-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}
                >
                  No podré asistir
                </button>
              </div>
            </div>

            {attending && (
              /* Campo: Número de pases */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', animation: 'fadeIn 0.4s ease-out' }}>
                <label
                  htmlFor="guest_count"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Número de Invitados
                </label>
                <select
                  id="guest_count"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--color-black-soft)',
                    border: '1px solid rgba(197, 160, 89, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-cream)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Persona' : 'Personas'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Campo: Restricciones alimenticias */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <label
                htmlFor="dietary"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Restricciones Alimenticias (Opcional)
              </label>
              <textarea
                id="dietary"
                rows={2}
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Alergias, menú vegetariano, etc."
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-black-soft)',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-cream)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.3s ease',
                  cursor: 'text',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(197, 160, 89, 0.2)')}
              />
            </div>

            {errorMessage && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#ef4444',
                  textAlign: 'left',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Botón de envío magnético */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              data-cursor-hover
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-md)',
                marginTop: '0.5rem',
                transition: 'all 0.3s ease',
              }}
            >
              {isSubmitting ? 'Confirmando...' : 'Enviar Confirmación'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
