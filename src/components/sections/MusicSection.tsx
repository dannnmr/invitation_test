'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, RotateCw, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';

export function MusicSection() {
  const [activeOption, setActiveOption] = useState(1);
  return (
    <div style={{ position: 'relative' }}>
      <SectionVariantSwitcher activeOption={activeOption} onChange={setActiveOption} optionsCount={3} />
      {activeOption === 1 && <MusicOption1 />}
      {activeOption === 2 && <MusicOption2 />}
      {activeOption === 3 && <MusicOption3 />}
    </div>
  );
}

function MusicOption1() {
  const [song, setSong] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!song) return;
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSong(''); }, 1500);
  };

  return (
    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Disco Gigante Girando */}
      <div style={{ position: 'absolute', right: '-20vw', top: '50%', transform: 'translateY(-50%)', width: '80vh', height: '80vh', borderRadius: '50%', backgroundColor: '#111', border: '10px solid #222', boxShadow: '0 0 50px rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <div style={{ width: '90%', height: '90%', borderRadius: '50%', background: 'conic-gradient(#111, #222, #111, #222, #111)', animation: 'spin 10s linear infinite' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', height: '30%', borderRadius: '50%', backgroundColor: '#f472b6', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000' }} />
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginLeft: '10vw', maxWidth: '500px' }}>
        <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: 'clamp(4rem, 8vw, 6rem)', color: '#fff', lineHeight: 1 }}>The<br/>Playlist</h2>
        <p style={{ fontFamily: 'var(--font-dm-mono)', color: '#aaa', marginTop: '1rem', letterSpacing: '2px', fontSize: '0.9rem' }}>SUGGEST A SONG</p>

        <form onSubmit={handleSubmit} style={{ marginTop: '3rem', display: 'flex', gap: '1rem', borderBottom: '2px solid #555', paddingBottom: '0.5rem' }}>
          <input 
            type="text" 
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="Song name or artist..."
            style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '1.2rem' }}
          />
          <button type="submit" disabled={isSubmitting} style={{ background: 'none', border: 'none', color: '#f472b6', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 'bold' }}>
            {isSubmitting ? '...' : 'ADD'}
          </button>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}

function MusicOption2() {
  const [song, setSong] = useState('');
  const [faderValue, setFaderValue] = useState(0);

  const handleFaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFaderValue(val);
    if (val === 100 && song) {
      setTimeout(() => {
        setSong('');
        setFaderValue(0);
      }, 1000);
    }
  };

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#181818', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#222', padding: '3rem 2rem', borderRadius: '15px', border: '4px solid #111', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'Helvetica', fontWeight: 900, color: '#ddd', fontSize: '1.5rem', letterSpacing: '5px' }}>MIXER</h2>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[1,2,3,4,5].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: i < 4 ? '#2ecc71' : (i === 4 ? '#f1c40f' : '#e74c3c'), opacity: faderValue > (i * 20) ? 1 : 0.2 }} />)}
          </div>
        </div>

        <input 
          type="text" 
          value={song}
          onChange={(e) => setSong(e.target.value)}
          placeholder="TYPE SONG HERE..."
          style={{ width: '100%', backgroundColor: '#111', border: '2px solid #333', color: '#0f0', padding: '1rem', fontFamily: 'var(--font-dm-mono)', fontSize: '1rem', borderRadius: '5px', outline: 'none', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-dm-mono)', color: '#888', fontSize: '0.7rem' }}>SLIDE UP TO SEND</span>
          {/* Fader Track */}
          <div style={{ position: 'relative', width: '40px', height: '150px', backgroundColor: '#111', borderRadius: '20px', border: '2px solid #000', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '4px', height: '100%', backgroundColor: '#000' }} />
            <input 
              type="range" 
              min="0" max="100" 
              value={faderValue}
              onChange={handleFaderChange}
              style={{
                position: 'absolute',
                width: '150px',
                height: '40px',
                transform: 'rotate(-90deg)',
                top: '55px',
                appearance: 'none',
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            {/* Custom thumb styles using dangerouslySetInnerHTML to target the range thumb pseudo-elements since React inline styles can't do it */}
            <style dangerouslySetInnerHTML={{ __html: `
              input[type=range]::-webkit-slider-thumb {
                appearance: none;
                width: 40px;
                height: 60px;
                background: linear-gradient(90deg, #555, #888, #555);
                border: 2px solid #111;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: 0 5px 10px rgba(0,0,0,0.8);
              }
            `}} />
          </div>
        </div>

      </div>
    </section>
  );
}

/**
 * Opción 3: Diseño Original (Vinilo Giratorio)
 */
export function MusicOption3() {
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
