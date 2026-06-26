'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { formatEventDate } from '@/lib/utils';
import type { InvitationConfig } from '@/types/invitation';
import { defaultInvitationConfig } from '@/config/invitation.config';

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
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const dateRef    = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

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

    // Animación de entrada inicial del texto del Hero
    const introTl = gsap.timeline({ delay: 0.2 });
    introTl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
      '-=1.0'
    )
    .fromTo(dateRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
      '-=0.8'
    );

    return () => {
      parallax.kill();
      introTl.kill();
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

      {/* Contenido Editorial Textual */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '0 2rem',
          textAlign: 'center',
        }}
      >
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Mis Quince Años
        </p>

        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.5rem, 12vw, 8rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--color-cream)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          {quinceañera.name}
        </h1>

        <p
          ref={dateRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
            color: 'var(--color-cream-muted)',
            letterSpacing: '0.08em',
            marginTop: '1rem',
          }}
        >
          {formatEventDate(event.date)}
        </p>
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
        <style jsx global>{`
          @keyframes scrollLine {
            0% {
              transform: translateY(-100%);
            }
            70% {
              transform: translateY(200%);
            }
            100% {
              transform: translateY(200%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
