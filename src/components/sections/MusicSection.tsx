'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, RotateCw, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Sección de Playlist / Sugerencias de música.
 * 
 * Contiene:
 * - Tocadiscos de vinilo interactivo que gira continuamente.
 * - Formulario premium para sugerir canciones de fiesta.
 * - Ecualizador gráfico animado.
 * - Sincronización Supabase (tabla 'canciones') + Google Sheets.
 */
export function MusicSection() {
  const [song, setSong] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const formBoxRef = useScrollReveal<HTMLDivElement>({ y: 40, delay: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song.trim()) {
      setError('Por favor, escribe una canción.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Inserción en Supabase (Ericka usa la tabla 'canciones' con campo 'cancion')
      const { error: sbError } = await supabase
        .from('canciones')
        .insert([{ cancion: song.trim() }]);

      if (sbError) throw sbError;

      // Sync con Google Sheets en segundo plano
      submitToGoogleSheets('song', { cancion: song.trim() })
        .catch((gsError) => console.error('Error syncing song to Google Sheets:', gsError));

      setIsSuccess(true);
      setSong('');
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err: any) {
      console.error('Supabase error:', err);
      setError('Error al enviar la sugerencia. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const visualizerBars = Array.from({ length: 24 });

  return (
    <section
      aria-label="Sugerencias de música"
      style={{
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
      }}
    >
      {/* Background Soft Glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Safari Leopard decor */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          pointerEvents: 'none',
          opacity: 0.15,
          color: 'var(--color-gold)',
        }}
      >
        <Sparkles className="w-8 h-8 text-pink-300 animate-pulse" />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '850px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
        }}
      >
        {/* Contenedor Tocadiscos + Formulario */}
        <div
          ref={formBoxRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            width: '100%',
          }}
        >
          {/* Vinyl interactive widget */}
          <div
            style={{
              position: 'relative',
              width: '130px',
              height: '130px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* Record player base (white/scrapbook style) */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                backgroundColor: 'var(--color-surface)',
                border: '1.5px solid rgba(244, 114, 182, 0.2)',
                borderRadius: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                pointerEvents: 'none',
                transform: 'rotate(-2deg)',
              }}
            >
              {/* Corners screws */}
              <div style={{ position: 'absolute', top: 6, left: 6, width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(244, 114, 182, 0.3)' }} />
              <div style={{ position: 'absolute', top: 6, right: 6, width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(244, 114, 182, 0.3)' }} />
              <div style={{ position: 'absolute', bottom: 6, left: 6, width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(244, 114, 182, 0.3)' }} />
              <div style={{ position: 'absolute', bottom: 6, right: 6, width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(244, 114, 182, 0.3)' }} />
            </div>

            {/* Tape decor */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                left: '-10px',
                width: '36px',
                height: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderLeft: '1px dashed rgba(244, 114, 182, 0.15)',
                borderRight: '1px dashed rgba(244, 114, 182, 0.15)',
                transform: 'rotate(-15deg)',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            />

            {/* Vinyl */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                willChange: 'transform',
                position: 'relative',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#1C1C1C',
                border: '5px solid #111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                zIndex: 10,
              }}
            >
              {/* Grooves */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.03) 60deg, transparent 120deg, rgba(255,255,255,0.04) 180deg, transparent 240deg, rgba(255,255,255,0.04) 300deg, transparent 360deg)',
                  pointerEvents: 'none',
                }}
              />

              {/* Label Central (Gold/Pink) */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3)',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-black)', zIndex: 10 }} />
                <span style={{ position: 'absolute', fontSize: '4px', fontWeight: 800, color: 'var(--color-black)', top: '4px', letterSpacing: '0.15em', fontFamily: 'var(--font-dm-mono)' }}>PLAYLIST</span>
                <span style={{ position: 'absolute', fontSize: '3.5px', fontWeight: 600, color: 'var(--color-black)', bottom: '4px', letterSpacing: '0.1em', fontFamily: 'var(--font-dm-mono)' }}>SAFARI</span>
              </div>
            </motion.div>

            {/* Tonearm */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-5px',
                width: '32px',
                height: '64px',
                transformOrigin: 'top left',
                transform: 'rotate(-5deg)',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              {/* Pivot */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '12px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid rgba(244, 114, 182, 0.2)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)' }} />
              </div>
              {/* Metal arm */}
              <div
                style={{
                  width: '2px',
                  height: '44px',
                  background: 'linear-gradient(to bottom, #d4d4d4, #a3a3a3)',
                  borderRadius: '99px',
                  marginLeft: '19px',
                  marginTop: '8px',
                }}
              />
              {/* Needle */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '6px',
                  width: '6px',
                  height: '8px',
                  backgroundColor: '#1E1E1E',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '2px', height: '2px', backgroundColor: 'var(--color-gold)', borderRadius: '50%' }} />
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div
            style={{
              flex: 1,
              maxWidth: '460px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Cabecera */}
            <div style={{ marginBottom: '1.5rem', width: '100%' }}>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-gold-dark)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}
              >
                La Playlist
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-pinyon)',
                  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                  color: 'var(--color-gold-dark)',
                  lineHeight: 1.1,
                  marginBottom: '0.75rem',
                }}
              >
                Sugerir Canción
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--color-cream-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                ¿Qué canción no puede faltar en la pista de baile?
              </p>
            </div>

            {/* Input Pill */}
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '4px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid rgba(244, 114, 182, 0.25)',
                  borderRadius: '50px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
                  transition: 'border-color 0.3s',
                }}
              >
                <input
                  id="song"
                  name="song"
                  type="text"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  placeholder="Escribe el nombre de la canción o artista..."
                  disabled={isSubmitting || isSuccess}
                  autoComplete="off"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '0 1rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--color-cream)',
                    height: '40px',
                  }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--color-gold)',
                    border: 'none',
                    borderRadius: '50%',
                    color: 'var(--color-black)',
                    cursor: (isSubmitting || isSuccess) ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {isSubmitting ? (
                    <RotateCw className="w-4 h-4 animate-spin text-white" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              {/* Animación del ecualizador */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'center',
                  gap: '3px',
                  height: '16px',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  marginTop: '0.5rem',
                }}
              >
                {visualizerBars.map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: '2px',
                      height: '16px',
                      backgroundColor: 'rgba(244, 114, 182, 0.25)',
                      borderRadius: '99px',
                      originY: 1,
                    }}
                    animate={{
                      scaleY: isSubmitting
                        ? [0.1, 1, 0.1]
                        : isSuccess
                          ? [0.3, 0.3, 0.3]
                          : [0.2, (Math.floor(Math.random() * 10) + 2) / 12, 0.2],
                      backgroundColor: isSuccess ? '#22c55e' : 'var(--color-gold)',
                    }}
                    transition={{
                      duration: isSubmitting ? 0.3 : 0.5 + (i % 4) * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Mensajes de feedback */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    style={{
                      color: '#d9534f',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-dm-mono)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginTop: '0.25rem',
                    }}
                  >
                    {error}
                  </motion.p>
                )}
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    style={{
                      color: '#2baf60',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-dm-mono)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginTop: '0.25rem',
                    }}
                  >
                    ¡Tu sugerencia fue agregada con éxito!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
