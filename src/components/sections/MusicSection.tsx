'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, RotateCw, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { Send, CheckCircle2, RotateCw } from 'lucide-react';

export function MusicSection() {
  const [song, setSong] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  
  // Ligar el giro del vinilo al scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const vinylRotation = useTransform(scrollYProgress, [0, 1], [0, 720]); // 2 vueltas completas

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song.trim()) {
      setError('Por favor, escribe una canción.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: sbError } = await supabase
        .from('canciones')
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
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#0a0a0a', 
        color: '#fff', 
        position: 'relative', 
        overflow: 'hidden',
        padding: '2rem'
      }}
    >
      
      {/* Disco Giratorio en el lado derecho */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          right: '-15vw', 
          top: '50%', 
          y: '-50%',
          width: 'clamp(300px, 45vw, 600px)', 
          height: 'clamp(300px, 45vw, 600px)', 
          borderRadius: '50%', 
          backgroundColor: '#111', 
          border: '8px solid #222', 
          boxShadow: '0 0 40px rgba(0,0,0,0.8)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 1,
          rotate: vinylRotation
        }}
      >
        <div style={{ width: '90%', height: '90%', borderRadius: '50%', background: 'conic-gradient(#111, #222, #111, #222, #111)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', height: '30%', borderRadius: '50%', backgroundColor: '#f472b6', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000' }} />
          </div>
        </div>
      </motion.div>

      {/* Contenido Izquierdo */}
      <div style={{ position: 'relative', zIndex: 2, marginRight: 'auto', marginLeft: 'clamp(2rem, 10vw, 8rem)', maxWidth: '400px' }}>
        <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: 'clamp(3.5rem, 7vw, 5rem)', color: '#fff', lineHeight: 1 }}>The<br/>Playlist</h2>
        <p style={{ fontFamily: 'var(--font-dm-mono)', color: '#aaa', marginTop: '1rem', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Suggest a Song</p>

        <form onSubmit={handleSubmit} style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #555', paddingBottom: '0.5rem' }}>
            <input 
              type="text" 
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="Song name or artist..."
              disabled={isSubmitting || isSuccess}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
            />
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess} 
              style={{ background: 'none', border: 'none', color: '#f472b6', cursor: (isSubmitting || isSuccess) ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            >
              {isSubmitting ? (
                <RotateCw className="w-5 h-5 animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: '#f87171', fontSize: '0.75rem', fontFamily: 'var(--font-dm-mono)', marginTop: '0.5rem' }}>
                {error}
              </motion.p>
            )}
            {isSuccess && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: '#4ade80', fontSize: '0.75rem', fontFamily: 'var(--font-dm-mono)', marginTop: '0.5rem' }}>
                ¡Agregada a la playlist!
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
