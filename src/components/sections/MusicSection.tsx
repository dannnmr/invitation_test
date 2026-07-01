'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { Send, CheckCircle2, RotateCw } from 'lucide-react';
import Image from 'next/image';

export function MusicSection() {
  const [song, setSong] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  
  // Animación de rotación ligada al scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  // Gira 720 grados a lo largo del scroll
  const vinylRotation = useTransform(scrollYProgress, [0, 1], [0, 720]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song.trim()) {
      setError('Por favor, escribe el nombre de una canción.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: sbError } = await supabase
        .from('canciones2')
        .insert([{ cancion: song.trim() }]);

      if (sbError) throw sbError;

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

  return (
    <section 
      ref={sectionRef}
      style={{ 
        backgroundColor: 'var(--color-black)', // Fondo oscuro
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 1.5rem 5rem 1.5rem', // Sin altura forzada
        position: 'relative', 
        overflow: 'hidden'
      }}
    >
      {/* Imagen de fondo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}>
        <Image 
          src="/images/decorativas_v2/bg-new-rosa.png" 
          alt="NY Rosa Background" 
          fill 
          className="object-cover" 
          style={{ objectPosition: 'center' }}
        />
        {/* Degradado superior e inferior para fusionarlo mejor */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--color-black) 0%, transparent 20%, transparent 80%, var(--color-black) 100%)' }} />
      </div>
      <div style={{
        width: '100%', maxWidth: '600px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        position: 'relative', zIndex: 10
      }}>

        {/* Disco de Vinilo animado con el scroll */}
        <div style={{ position: 'relative', width: '90px', height: '90px', marginBottom: '1.5rem' }}>
          <motion.div 
            style={{ 
              width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden',
              // Surcos del vinilo adaptados a noche
              background: 'repeating-radial-gradient(circle, #050505 0, #111 2px, #0a0a0a 3px, #1a1a1a 4px)',
              border: '1px solid rgba(247, 177, 199, 0.3)', // Borde rose gold sutil
              boxShadow: '0 10px 20px rgba(0,0,0,0.8), 0 0 15px rgba(247, 177, 199, 0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              rotate: vinylRotation // Animación interactiva de giro vinculada al scroll
            }}
          >
            {/* Puntos de anclaje visual */}
            <div style={{ position: 'absolute', top: '10px', left: '20px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '5px', height: '5px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.1)' }} />
            
            {/* Sombra asimétrica */}
            <div style={{ position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)' }} />

            {/* Etiqueta central rose gold y negra */}
            <div style={{ position: 'relative', zIndex: 2, width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(90deg, var(--color-gold) 50%, #222 50%)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#050505', border: '1px solid rgba(247, 177, 199, 0.5)' }} />
            </div>
          </motion.div>
        </div>

        {/* Textos tipográficos */}
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-black)', backgroundColor: 'var(--color-gold)', padding: '0.2rem 0.6rem', borderRadius: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 800, display: 'inline-block', marginBottom: '0.8rem' }}>
          Playlist
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 8vw, 5rem)', fontWeight: 400, color: 'var(--color-cream)', lineHeight: 1, marginBottom: '0.1rem' }}>
          Música
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 2rem auto' }}>
          ¿Qué canción no puede faltar en la fiesta? 
        </p>

        {/* Card Redondeada (Pill) exclusiva para el Input y Botón */}
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          
          <div style={{ 
            display: 'flex', alignItems: 'center', 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid rgba(247, 177, 199, 0.4)', // Borde rose gold
            borderRadius: '50px',
            padding: '0.3rem 0.3rem 0.3rem 1.5rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(247, 177, 199, 0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <input 
              type="text" 
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="Ej. New York - Bad Bunny"
              disabled={isSubmitting || isSuccess}
              style={{ 
                flex: 1, backgroundColor: 'transparent', border: 'none', 
                color: 'var(--color-cream)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', outline: 'none' 
              }}
            />
            
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess} 
              style={{ 
                width: '45px', height: '45px', borderRadius: '50%',
                backgroundColor: (isSubmitting || isSuccess) ? '#333' : 'var(--color-gold)', // Rose Gold
                border: 'none',
                color: (isSubmitting || isSuccess) ? 'rgba(255,255,255,0.5)' : 'var(--color-black)', // Icono negro
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: (isSubmitting || isSuccess) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: (isSubmitting || isSuccess) ? 'none' : '0 0 15px rgba(247, 177, 199, 0.4)'
              }}
            >
              {isSubmitting ? (
                <RotateCw className="w-5 h-5 animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Send className="w-4 h-4" style={{ marginLeft: '-2px' }} />
              )}
            </button>
          </div>
          
          {/* Mensajes de error o éxito */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#ff6b6b', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', margin: '0.5rem 0 0 0', fontWeight: 600 }}>
                {error}
              </motion.p>
            )}
            {isSuccess && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontFamily: 'var(--font-dm-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: '0.5rem 0 0 0' }}>
                ¡Sugerencia agregada!
              </motion.p>
            )}
          </AnimatePresence>
        </form>

      </div>
    </section>
  );
}
