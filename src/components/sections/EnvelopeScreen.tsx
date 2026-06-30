'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface EnvelopeScreenProps {
  /** Ref del contenedor del contenido principal — se revela al abrir */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** Callback cuando la animación termina y el sobre debe desmontarse */
  onComplete: () => void;
  /** Callback cuando el usuario toca el botón de abrir (para iniciar animaciones de fondo inmediatamente) */
  onStartOpen?: () => void;
}

export function EnvelopeScreen({ onComplete, onStartOpen }: EnvelopeScreenProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isOpening) {
      const timer = setTimeout(() => {
        setIsClosed(true);
        onComplete();
      }, 1500); // Esperar a que las solapas se abran por completo
      return () => clearTimeout(timer);
    }
  }, [isOpening, onComplete]);

  const handleOpen = () => {
    setIsOpening(true);
    if (onStartOpen) {
      onStartOpen();
    }
  };

  if (isClosed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'auto',
        backgroundColor: 'transparent', // Se cambió a transparente para mostrar el Hero detrás
      }}
    >
      {/* Background Sobre Completo */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              minHeight: '100vh',
              zIndex: 20,
              backgroundColor: 'transparent',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src="/images/invitation/bg_rosa.png"
              alt="Sobre"
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.15)', // Replicado de la otra plantilla
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Envelope */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          zIndex: 10,
        }}
        initial={{ x: 0 }}
        animate={{ x: isOpening ? "-100%" : 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        <Image
          src="/images/invitation/lado_izquierdo_rosa.png"
          alt="Sobre izquierdo"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.15)', // Replicado de la otra plantilla
          }}
        />
      </motion.div>

      {/* Right Envelope */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          zIndex: 10,
        }}
        initial={{ x: 0 }}
        animate={{ x: isOpening ? "100%" : 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        <Image
          src="/images/invitation/lado_derecho_rosa.png"
          alt="Sobre derecho"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.15)', // Replicado de la otra plantilla
          }}
        />
      </motion.div>

      {/* Seal / Clasp */}
      <AnimatePresence>
        {!isOpening && (
          <motion.button
            onClick={handleOpen}
            animate={{
              scale: [1, 1.03, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.92 }}
            exit={{ scale: 1.8, opacity: 0 }}
            style={{
              position: 'absolute',
              zIndex: 30,
              width: '240px',
              height: '240px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
            }}
          >
            <Image
              src="/images/invitation/broche_luciana.png"
              alt="Abrir invitación"
              fill
              sizes="(max-width: 768px) 120px, 120px"
              priority
              style={{ objectFit: 'contain' }}
            />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Hint de interacción */}
      <AnimatePresence>
        {!isOpening && (
          <motion.p
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: 0,
              width: '100%',
              textAlign: 'center',
              zIndex: 30,
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              pointerEvents: 'none',
            }}
          >
            Toca para abrir
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
