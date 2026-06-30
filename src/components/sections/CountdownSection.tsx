'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useCountdown } from '@/hooks/useCountdown';
import { gsap } from '@/lib/gsap';
import type { InvitationConfig } from '@/types/invitation';

interface CountdownSectionProps {
  config: InvitationConfig;
}

export function CountdownSection({ config }: CountdownSectionProps) {
  const countdown = useCountdown(config.event.date);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
    const ctx = gsap.context(() => {
      // Cascada de aparición mucho más suave, sutil y elegante
      gsap.from('.time-capsule', {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      // Animación del taxi: se mueve de IZQUIERDA a DERECHA basado en el scroll
      gsap.to('.taxi-scroll', {
        x: '120vw', // Se moverá hacia la derecha cruzando toda la pantalla
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', // Empieza cuando la sección entra al viewport
          end: 'bottom 20%', // Termina casi al salir
          scrub: 2, // Scrub más alto para que el movimiento sea más suave y dure más tiempo
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const items = [
    { label: 'DÍAS', value: isMounted ? countdown.days : 0 },
    { label: 'HRS', value: isMounted ? countdown.hours : 0 },
    { label: 'MIN', value: isMounted ? countdown.minutes : 0 },
    { label: 'SEG', value: isMounted ? countdown.seconds : 0 },
  ];

  return (
    <section ref={containerRef} style={{ padding: '6rem 1.5rem', backgroundColor: '#fdfbf7', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Estilos globales para la animación CSS de levitación */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatAnimation {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(248, 200, 220, 0.25) 0%, transparent 80%)', filter: 'blur(30px)', zIndex: 0 }} />
      
      <div style={{ zIndex: 1, textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
        {/* Moño decorativo de fondo en la izquierda */}
        <div style={{ position: 'absolute', left: '-120px', top: '-35px', width: '280px', height: '280px', opacity: 1, zIndex: -1 }}>
          <Image 
            src="/images/decorativas_v2/moño.png" 
            alt="Lazo decorativo" 
            fill 
            style={{ objectFit: 'contain' }} 
          />
        </div>
        
        <p style={{ fontFamily: 'var(--font-dm-mono)', color: '#B5838D', letterSpacing: '0.3em', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Empieza la cuenta</p>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#111', fontSize: 'clamp(3.5rem, 9vw, 5rem)', lineHeight: 1, fontWeight: 400 }}>Falta muy poco</h2>
      </div>

      <div style={{ display: 'flex', gap: '1rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item, idx) => (
          // Contenedor externo para la entrada suave (GSAP)
          <div key={idx} className="time-capsule" style={{ perspective: '1000px' }}>
            {/* Contenedor interno para la levitación constante (CSS) */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: 'clamp(70px, 18vw, 90px)', height: 'clamp(100px, 25vw, 130px)',
              backgroundColor: 'transparent',
              border: '1px solid #C0C0C0',
              borderRadius: '50px',
              animation: `floatAnimation 4s ease-in-out infinite`,
              animationDelay: `${idx * 0.3}s` 
            }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 500, color: '#111', lineHeight: 1 }}>{String(item.value).padStart(2, '0')}</span>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#B5838D', letterSpacing: '0.1em', marginTop: '0.5rem' }}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Taxi interactivo que se mueve con el scroll */}
      <div 
        className="taxi-scroll" 
        style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '-150px', // Comienza fuera de la pantalla a la izquierda
          width: '150px', 
          height: '70px', 
          zIndex: 10 
        }}
      >
        <Image 
          src="/images/decorativas_v2/taxi.png" 
          alt="New York Taxi" 
          fill 
          sizes="(max-width: 768px) 150px, 150px"
          style={{ objectFit: 'contain' }} 
        />
      </div>
    </section>
  );
}
