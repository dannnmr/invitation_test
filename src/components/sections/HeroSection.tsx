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
  const { ref: nameRef, play: playName }    = useTextReveal({ autoPlay: false, duration: 0.5, stagger: 0.02 });
  const { ref: surnameRef, play: playSurname } = useTextReveal({ autoPlay: false, delay: 0.1, duration: 0.5, stagger: 0.02 });

  // Reveal del bloque de fecha/lugar al scroll
  const detailsRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    stagger: 0.12,
    childSelector: 'p, span',
    start: 'top 90%',
  });

  useEffect(() => {
    if (!isRevealed) return;
    // Retraso exacto para que el texto empiece a animarse justo cuando las solapas del sobre dejan ver el centro
    const t = setTimeout(() => {
      playName();
      playSurname();
    }, 500);
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
        height: '100svh',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Foto con parallax / Background ────────────────────── */}
      <div
        ref={imageRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-25%',
          bottom: '-25%',
          left: '-10%',
          right: '-10%',
          zIndex: 0,
        }}
      >
        <img
          src="/images/decorativas_v2/bg-bw2.png"
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
              radial-gradient(
                circle at center,
                rgba(0, 0, 0, 0.75) 0%,
                rgba(0, 0, 0, 0.35) 30%,
                rgba(0, 0, 0, 0.05) 70%
              )
            `,
          }}
        />
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        @keyframes heroFloatAlt {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes silverShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* ── Imágenes Decorativas Hero ────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Superior (Colgando) */}
        <img
          src="/images/decorativas_v2/bolas_disco_rosa.png"
          alt="Bolas de disco"
          style={{ position: 'absolute', top: '-15%', left: '-5%', width: 'clamp(250px, 45vw, 300px)', opacity: 0.95, animation: 'heroFloat 6s ease-in-out infinite' }}
        />
        <img
          src="/images/decorativas_v2/bolas_disco_rosa.png"
          alt="Bolas de disco"
          style={{ position: 'absolute', top: '-15%', right: '-6%', width: 'clamp(250px, 45vw, 300px)', opacity: 0.95, animation: 'heroFloat 6s ease-in-out infinite', transform: 'scaleX(-1)' }}
        />

        {/* Inferior */}
        <img
          src="/images/decorativas_v2/estatua_libertad.png"
          alt="Estatua con brillos"
          style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 'clamp(230px, 30vw, 400px)', opacity: 0.95 }}
        />
        <img
          src="/images/decorativas_v2/edificio2.png"
          alt="Edificio Rosa"
          style={{ position: 'absolute', bottom: '-8%', right: '15%', width: 'clamp(120px, 25vw, 350px)', opacity: 0.85 }}
        />
      
        <img
          src="/images/decorativas_v2/edificio2.png"
          alt="Estatua"
          style={{ position: 'absolute', bottom: '-2%', right: '-10%', width: 'clamp(160px, 20vw, 250px)', opacity: 0.95 }}
        />
      </div>

      {/* ── Contenido textual ──────────────────────────────────── */}
      <div
        style={{
          zIndex: 2,
          padding: 'clamp(2rem, 6vw, 5rem)',
          maxWidth: '800px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Eyebrow — XV Años */}
        <p
          style={{
            fontFamily:    'var(--font-dm-mono)',
            fontSize:      'clamp(0.7rem, 1.2vw, 0.9rem)',
            color:         'var(--color-gold)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom:  'clamp(2.5rem, 3vw, 2.5rem)',
            opacity:       isRevealed ? 1 : 0,
            transition:    'opacity 0.3s ease 0.1s', // Delay mínimo para que aparezca casi junto con el nombre
          }}
          aria-hidden="true"
        >
          XV Años
        </p>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          {/* XV de fondo (Watermark) */}
          <span style={{
            position: 'absolute',
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(14rem, 40vw, 26rem)',
            fontWeight: 500,
            background: 'linear-gradient(90deg, #F8C8DC 0%, #F8C8DC 40%, #ffffff 50%, #C0C0C0 60%, #F8C8DC 70%, #F8C8DC 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0.9,
            zIndex: -1,
            lineHeight: 0.8,
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-0.02em',
            top: '50%',
            transform: 'translateY(-50%)',
            filter: 'drop-shadow(0 0 15px rgba(192, 192, 192, 0.6))',
            animation: 'silverShimmer 6s linear infinite'
          }}>
            XV
          </span>

          {/* Nombre — animado letra por letra */}
          <h1
            ref={nameRef as React.RefObject<HTMLHeadingElement>}
            style={{
              fontFamily:   'var(--font-cormorant)',
              fontSize:     'clamp(4.5rem, 12vw, 8.5rem)',
              fontWeight:   600,
              color:        'var(--color-cream)',
              lineHeight:   1,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '0.15em',
              textShadow: '0 5px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0,0,0,0.8)' 
            }}
          >
            {firstName}
          </h1>
        </div>
        </div>

        {/* Frase / Cita */}
        <p
          ref={surnameRef as React.RefObject<HTMLParagraphElement>}
          style={{
            fontFamily:   'var(--font-cormorant)',
            fontStyle:    'italic',
            fontSize:     'clamp(1rem, 1.2vw, 1.4rem)',
            fontWeight:   400,
            color:        'rgba(255, 255, 255, 0.85)',
            lineHeight:   1.5,
            marginBottom: 'clamp(2rem, 5vw, 4rem)',
            marginTop:    'auto',
            maxWidth:     '340px', /* Reduced width */
            opacity:      isRevealed ? 1 : 0,
            transition:   'opacity 0.8s ease 0.8s',
            padding: '0.8rem 1.2rem', /* Reduced padding */
            backgroundColor: 'rgba(0, 0, 0, 0.35)', /* Dark glass */
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(247, 177, 199, 0.3)', /* Rose gold border */
            borderRadius: '4px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            textAlign: 'center'
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
