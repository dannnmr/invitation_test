'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useCountdown } from '@/hooks/useCountdown';
import { gsap } from '@/lib/gsap';
import { CSSSparkle } from '@/components/ui/CSSSparkle';
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
    <section ref={containerRef} style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--color-black)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatAnimation {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes sparkleTwinkle {
          0%, 100% { transform: scale(0.5); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes silverShineSweep {
          0% { transform: translateX(-150%) skewX(-45deg); opacity: 0; }
          1% { opacity: 1; }
          12% { transform: translateX(250%) skewX(-45deg); opacity: 1; }
          13% { opacity: 0; }
          100% { transform: translateX(250%) skewX(-45deg); opacity: 0; }
        }
      `}} />

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {/* Destellos nítidos CSS en lugar de humo difuso o iconos SVG */}
        <CSSSparkle size={20} color="var(--color-gold)" top="20%" left="15%" delay="0s" points={8} />
        <CSSSparkle size={30} color="#EAEAEA" top="10%" right="20%" delay="1s" points={4} />
        <CSSSparkle size={24} color="var(--color-gold)" bottom="30%" left="10%" delay="0.5s" points={4} />
        <CSSSparkle size={15} color="#EAEAEA" bottom="20%" right="15%" delay="1.5s" points={8} />
        <CSSSparkle size={18} color="var(--color-gold)" top="50%" right="5%" delay="0.2s" points={4} />
      </div>
      
      <div style={{ zIndex: 1, textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
        {/* Moño decorativo de fondo en la izquierda */}
        <div style={{ position: 'absolute', left: '-120px', top: '-35px', width: '280px', height: '280px', opacity: 0.75, zIndex: -1 }}>
          <Image 
            src="/images/decorativas_v2/moño.png" 
            alt="Lazo decorativo" 
            fill 
            style={{ objectFit: 'contain' }} 
          />
        </div>
        
        <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-gold)', letterSpacing: '0.3em', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.8)' }}>Empieza la cuenta</p>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)', fontSize: 'clamp(3.5rem, 9vw, 5rem)', lineHeight: 1, fontWeight: 400, textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)' }}>Falta muy poco</h2>
      </div>

      <div style={{ display: 'flex', gap: '1rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item, idx) => (
          // Contenedor externo para la entrada suave (GSAP)
          <div key={idx} className="time-capsule" style={{ perspective: '1000px' }}>
            {/* Contenedor interno para la levitación constante (CSS) */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: 'clamp(70px, 18vw, 90px)', height: 'clamp(100px, 25vw, 130px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(224, 191, 184, 0.6)',
              borderTop: '1px solid rgba(255, 255, 255, 0.5)', /* Reflejo nítido superior */
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              animation: `floatAnimation 4s ease-in-out infinite`,
              animationDelay: `${idx * 1.2}s`,
              position: 'relative',
              overflow: 'hidden' /* Necesario para la animación de barrido */
            }}>
              {/* Animación de barrido plateado (Shine)
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7), transparent)',
                animation: `silverShineSweep 6s infinite ${idx * 0.5}s`,
                zIndex: 0, pointerEvents: 'none'
              }} /> */}

              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 500, color: 'var(--color-cream)', lineHeight: 1, zIndex: 1 }}>{String(item.value).padStart(2, '0')}</span>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginTop: '0.5rem', fontWeight: 'bold', zIndex: 1 }}>{item.label}</span>
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
