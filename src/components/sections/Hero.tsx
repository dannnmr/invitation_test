'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { formatEventDate } from '@/lib/utils';
import type { InvitationConfig } from '@/types/invitation';
import { defaultInvitationConfig } from '@/config/invitation.config';
import { SplitTextReveal } from '@/components/core/SplitTextReveal';

interface HeroProps {
  config?: InvitationConfig;
}

/**
 * Hero principal de la invitación.
 * Presenta una foto con parallax profundo, el nombre estilizado de la quinceañera,
 * la fecha del evento y un indicador animado de scroll.
 */
export function Hero({ config = defaultInvitationConfig }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);

  const { quinceañera, event } = config;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    // Efecto Parallax Profundo en la imagen de fondo
    const parallax = gsap.to(image, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      parallax.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-black)',
      }}
    >
      {/* Contenedor de la Imagen con Parallax */}
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '120%',
          backgroundImage: `linear-gradient(to bottom, rgba(10, 0, 5, 0.4) 0%, rgba(10, 0, 5, 0.85) 100%), url(${quinceañera.photoUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Contenido Editorial Textual con SplitTextReveal */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '0 2rem',
          textAlign: 'center',
        }}
      >
        <SplitTextReveal
          text="Mis Quince Años"
          as="p"
          type="words"
          scrollTrigger={false}
          delay={0.2}
          duration={1.0}
          stagger={0.08}
          yPercent={100}
          skewY={2}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        />

        <SplitTextReveal
          text={quinceañera.name}
          as="h1"
          type="chars"
          scrollTrigger={false}
          delay={0.4}
          duration={1.5}
          stagger={0.06}
          yPercent={100}
          rotate={8}
          skewY={5}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.5rem, 12vw, 8rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--color-cream)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        />

        <SplitTextReveal
          text={formatEventDate(event.date)}
          as="p"
          type="words"
          scrollTrigger={false}
          delay={1.0}
          duration={1.2}
          stagger={0.05}
          yPercent={80}
          skewY={0}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
            color: 'var(--color-cream-muted)',
            letterSpacing: '0.08em',
            marginTop: '0.5rem',
          }}
        />
      </div>

      {/* Indicador de Scroll Animado */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-cream-muted)',
          }}
        >
          Desplazar
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            backgroundColor: 'var(--color-gold)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              backgroundColor: 'var(--color-white)',
              animation: 'scrollLine 2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
