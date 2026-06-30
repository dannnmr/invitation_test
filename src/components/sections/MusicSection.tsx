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
        backgroundColor: '#fbfbf7', // Fondo oscuro
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 1.5rem 5rem 1.5rem', // Sin altura forzada
        position: 'relative', 
        overflow: 'hidden'
      }}
    >
      {/* Imagen de fondo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }}>
        <Image 
          src="/images/decorativas_v2/bg_newyork_rosa.png" 
          alt="NY Rosa Background" 
          fill 
          className="object-cover" 
          style={{ objectPosition: 'center' }}
        />
        {/* Degradado superior e inferior para fusionarlo mejor */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #fdfbf7 0%, transparent 20%, transparent 80%, #fdfbf7 100%)' }} />
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
              // Surcos del vinilo en tonos más oscuros para distinguirlo
              background: 'repeating-radial-gradient(circle, rgba(17,17,17,0.05) 0, rgba(17,17,17,0.08) 2px, transparent 3px, transparent 4px)',
              border: '1px solid #111', // Borde negro evidente solicitado
              boxShadow: '0 10px 20px rgba(17,17,17,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              rotate: vinylRotation // Animación interactiva de giro vinculada al scroll
            }}
          >
            {/* Puntos de anclaje visual (en color negro) */}
            <div style={{ position: 'absolute', top: '10px', left: '20px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111' }} />
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '5px', height: '5px', borderRadius: '50%', border: '1.5px solid #111' }} />
            
            {/* Sombra asimétrica gris oscuro */}
            <div style={{ position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%', background: 'linear-gradient(90deg, rgba(17,17,17,0.15) 0%, transparent 100%)' }} />

            {/* Etiqueta central combinando el rosa del Hero (#F8C8DC) y negro */}
            <div style={{ position: 'relative', zIndex: 2, width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(90deg, #F8C8DC 50%, #111 50%)', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #111' }} />
            </div>
          </motion.div>
        </div>

        {/* Textos tipográficos usando el rosa original (#F8C8DC) pero con sombra para legibilidad si es necesario, aunque en texto suele verse bien. Usaremos el rosa. */}
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#111', backgroundColor: '#F8C8DC', padding: '0.2rem 0.6rem', borderRadius: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, display: 'inline-block', marginBottom: '0.8rem' }}>
          Playlist
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 8vw, 5rem)', fontWeight: 400, color: '#111', lineHeight: 1, marginBottom: '0.1rem' }}>
          Música
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#666', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 2rem auto' }}>
          ¿Qué canción no puede faltar en la fiesta? 
        </p>

        {/* Card Redondeada (Pill) exclusiva para el Input y Botón */}
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          
          <div style={{ 
            display: 'flex', alignItems: 'center', 
            background: '#fff', 
            border: '0.3px solid #111', // Borde negro para consistencia con el vinilo
            borderRadius: '50px',
            padding: '0.3rem 0.3rem 0.3rem 1.5rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)'
          }}>
            <input 
              type="text" 
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="Ej. New York - Bad Bunny"
              disabled={isSubmitting || isSuccess}
              style={{ 
                flex: 1, backgroundColor: 'transparent', border: 'none', 
                color: '#111', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', outline: 'none' 
              }}
            />
            
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess} 
              style={{ 
                width: '45px', height: '45px', borderRadius: '50%',
                backgroundColor: (isSubmitting || isSuccess) ? '#eaeaea' : '#F8C8DC', // Rosa Hero
                border: '0.5px solid #111', // Borde negro sutil en el botón
                color: '#111', // Icono negro para contraste perfecto con el rosa claro
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: (isSubmitting || isSuccess) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {isSubmitting ? (
                <RotateCw className="w-5 h-5 animate-spin" color="#111" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Send className="w-4 h-4" style={{ marginLeft: '-2px' }} />
              )}
            </button>
          </div>
          
          {/* Mensajes de error o éxito */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#e06666', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', margin: '0.5rem 0 0 0', fontWeight: 600 }}>
                {error}
              </motion.p>
            )}
            {isSuccess && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#111', fontSize: '0.75rem', fontFamily: 'var(--font-dm-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: '0.5rem 0 0 0' }}>
                ¡Sugerencia agregada!
              </motion.p>
            )}
          </AnimatePresence>
        </form>

      </div>
    </section>
  );
}
