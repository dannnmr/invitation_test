'use client';

import { useEffect }        from 'react';
import Image                from 'next/image';
import { useHeroParallax }  from '@/hooks/useHeroParallax';
import { useTextReveal }    from '@/hooks/useTextReveal';
import { useScrollReveal }  from '@/hooks/useScrollReveal';
import { ScrollIndicator }  from '@/components/ui/ScrollIndicator';
import { formatEventDate }  from '@/lib/utils';
import type { InvitationConfig } from '@/types/invitation';
import { transform } from 'framer-motion';

interface HeroSectionProps {
  config: InvitationConfig;
  /** Si true, inicia las animaciones de texto (llamar cuando el sobre ya cerró) */
  isRevealed: boolean;
}

/**
 * Sección hero de la invitación.
 */
export function HeroSection({ config, isRevealed }: HeroSectionProps) {
  const { quinceañera, event } = config;

  const { containerRef, imageRef } = useHeroParallax();

  // Reveal del nombre — se activa cuando isRevealed cambia a true
  const { ref: nameRef, play: playName }    = useTextReveal({ autoPlay: false, stagger: 0.05 });
  const { ref: surnameRef, play: playSurname } = useTextReveal({ autoPlay: false, delay: 0.2, stagger: 0.04 });

  // Reveal del bloque de fecha/lugar al scroll
  const detailsRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    stagger: 0.12,
    childSelector: 'p, span',
    start: 'top 90%',
  });

  useEffect(() => {
    if (!isRevealed) return;
    // Pequeño delay para que el clip-path termine primero
    const t = setTimeout(() => {
      playName();
      playSurname();
    }, 400);
    return () => clearTimeout(t);
  }, [isRevealed, playName, playSurname]);

  // Separar nombre completo en nombre y apellido
  const nameParts   = quinceañera.fullName.split(' ');
  const firstName   = nameParts.slice(0, 1).join(' ');
  const lastName    = nameParts.slice(1).join(' ');

  return (
    <section
      ref={containerRef}
      aria-label={`Hero — XV Años de ${quinceañera.fullName}`}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* ── Foto con parallax / Background ────────────────────── */}
      <div
        ref={imageRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-15% 0',   // Espacio extra para el parallax
          zIndex: 0,
        }}
      >
        <img
          src="/images/decorativas_v2/bg_newyork_rosa.png"
          alt="New York Skyline"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradiente sobre la foto — permite legibilidad del texto */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to right,
                rgba(250, 250, 250, 0.96) 0%,
                rgba(250, 250, 250, 0.85) 45%,
                rgba(250, 250, 250, 0.25) 100%
              ),
              linear-gradient(
                to top,
                rgba(250, 250, 250, 0.85) 0%,
                transparent 60%
              )
            `,
          }}
        />
      </div>

      {/* ── Contenido textual ──────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(2rem, 6vw, 5rem)',
          maxWidth: '700px',
        }}
      >
        {/* Eyebrow — XV Años */}
        <p
          style={{
            fontFamily:    'var(--font-dm-mono)',
            fontSize:      'clamp(0.65rem, 1.2vw, 0.8rem)',
            color:         'var(--color-gold)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom:  'clamp(1rem, 2vw, 1.5rem)',
            opacity:       isRevealed ? 1 : 0,
            transition:    'opacity 0.6s ease 0.3s',
          }}
          aria-hidden="true"
        >
          XV Años
        </p>

        {/* Nombre — animado letra por letra */}
        <h1
          ref={nameRef as React.RefObject<HTMLHeadingElement>}
          style={{
            fontFamily:   'var(--font-pinyon)',
            fontSize:     'clamp(4.5rem, 11vw, 10rem)',
            fontWeight:   300,
            color:        'var(--color-gold)',
            lineHeight:   0.9,
            marginBottom: '0.15em',
            overflow:     'hidden',
            textShadow:   '0 4px 10px rgba(0,0,0,0.05)',
          }}
        >
          {firstName}
        </h1>

        {/* Frase / Cita */}
        <p
          ref={surnameRef as React.RefObject<HTMLParagraphElement>}
          style={{
            fontFamily:   'var(--font-inter)',
            fontSize:     'clamp(0.9rem, 1.5vw, 1.2rem)',
            fontWeight:   300,
            color:        'var(--color-cream)',
            lineHeight:   1.6,
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            overflow:     'hidden',
            maxWidth:     '500px',
            opacity:      isRevealed ? 1 : 0,
            transition:   'opacity 0.8s ease 0.8s',
          }}
        >
          {config.parents?.invitationText}
        </p>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────── */}
      {isRevealed && <ScrollIndicator />}
    </section>
  );
}
