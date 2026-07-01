'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRSVPForm } from '@/hooks/useRSVPForm';
import type { InvitationConfig } from '@/types/invitation';

interface RSVPSectionProps {
  config: InvitationConfig;
}

export function RSVPSection({ config }: RSVPSectionProps) {
  const [confirmedName, setConfirmedName] = useState('');
  const { formData, formState, errorMessage, submitBtnRef, handleChange, handleSubmit } = useRSVPForm({ invitationId: config.id, onSuccess: setConfirmedName });

  return (
    <section style={{ backgroundColor: 'var(--color-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Sin fondo degradado por solicitud del usuario */}

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', maxWidth: '420px',
          // Fondo oscuro de cristal
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(247, 177, 199, 0.4)', borderRadius: '30px',
          padding: '2.5rem 1.5rem', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(247, 177, 199, 0.05)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', position: 'relative', zIndex: 10
        }}
      >
        {/* Destello de cristal en el borde superior */}
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(247, 177, 199, 0.8), transparent)' }} />

        {formState !== 'success' ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
                Lista de Invitados
              </span>
              <h2 style={{ fontFamily: 'var(--font-vibes)', fontSize: 'clamp(4rem, 9vw, 6rem)', fontWeight: 400, color: 'var(--color-cream)', lineHeight: 1, marginBottom: '0.5rem' }}>
                RSVP
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto' }}>
                Por favor, confírmanos tu presencia antes del 16 de Junio.
              </p>
            </motion.div>
            
            {/* Input Lineal Minimalista */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}
            >
              <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Nombre Completo</label>
              <div style={{ position: 'relative' }}>
                <input type="text" value={formData.guestName} onChange={(e) => handleChange('guestName', e.target.value)} placeholder="Ej. Daniela Hernandez" disabled={formState === 'submitting'}
                  style={{ 
                    width: '100%', backgroundColor: 'transparent', border: 'none', 
                    borderBottom: '2px solid rgba(247, 177, 199, 0.3)', // Rose gold suave
                    padding: '0.5rem 0', color: 'var(--color-cream)', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' 
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderBottomColor = 'var(--color-gold)'; e.currentTarget.style.boxShadow = '0 10px 15px -10px rgba(247, 177, 199, 0.4)'; }} 
                  onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(247, 177, 199, 0.3)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
            </motion.div>
            
            <AnimatePresence>
              {errorMessage && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#ff6b6b', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', textAlign: 'center', margin: '-1rem 0 0 0' }}>
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
            
            {/* Botón Editorial de Alto Contraste */}
            <motion.button 
              ref={submitBtnRef} type="submit" disabled={formState === 'submitting'}
              whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)' }} whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              style={{ 
                position: 'relative', overflow: 'hidden',
                backgroundColor: 'var(--color-gold)', // Fondo rose gold
                border: 'none', borderRadius: '50px', color: 'var(--color-black)', // Texto en negro para contraste
                cursor: 'pointer', fontFamily: 'var(--font-dm-mono)', fontSize: '0.85rem', letterSpacing: '0.2em', padding: '1rem', 
                textTransform: 'uppercase', width: '100%', boxShadow: '0 10px 20px rgba(247, 177, 199, 0.15)' 
              }}
            >
              {/* Shimmer Blanco Brillante encima para ese toque premium */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)', transform: 'skewX(-20deg)', zIndex: 1 }}
              />
              <span style={{ position: 'relative', zIndex: 2, fontWeight: 800 }}>{formState === 'submitting' ? 'Enviando...' : 'Confirmar Asistencia'}</span>
            </motion.button>
          </form>
        ) : (
          /* Mensaje de Éxito Consolidado */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', padding: '1rem 0' }}
          >
            <motion.div 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid rgba(247, 177, 199, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', fontSize: '2rem', marginBottom: '0.5rem', boxShadow: '0 0 30px rgba(247, 177, 199, 0.2)', background: 'rgba(247, 177, 199, 0.1)' }}
            >
              ✓
            </motion.div>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}>
              ¡Te esperamos!
            </span>
            <h2 style={{ fontFamily: 'var(--font-vibes)', fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 300, color: 'var(--color-cream)', lineHeight: 1 }}>
              Confirmado
            </h2>
            <div style={{ width: '40px', height: '1.5px', backgroundColor: 'var(--color-gold)', margin: '0.5rem 0' }} />
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, maxWidth: '360px' }}>
              Gracias {confirmedName}, tu respuesta ha sido guardada. Nos hace muy felices saber que nos acompañarás.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}