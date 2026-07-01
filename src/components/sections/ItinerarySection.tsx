'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Martini, Camera, Utensils, Music, Cake, Sparkles } from 'lucide-react';
import { CSSSparkle } from '@/components/ui/CSSSparkle';
import type { InvitationConfig } from '@/types/invitation';

interface ItinerarySectionProps {
  config: InvitationConfig;
}

const ItineraryIcon = ({ iconName, color = '#111' }: { iconName?: string, color?: string }) => {
  const className = `w-6 h-6 stroke-[1.2]`;
  if (!iconName) return <Sparkles className={className} style={{ color }} />;

  if (iconName.endsWith('.png') || iconName.endsWith('.jpg') || iconName.endsWith('.webp')) {
    return (
      <img
        src={iconName}
        alt="Icon"
        className="itinerary-img"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    );
  }


  return <Sparkles className={className} style={{ color }} />;
};

export function ItinerarySection({ config }: ItinerarySectionProps) {
  const { itinerary } = config;
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !dotRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Animar el punto bajando por la línea
      gsap.fromTo(
        dotRef.current,
        { top: '0%' },
        {
          top: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );

      // 2. Animar cada ítem al ser alcanzado por el punto
      const items = gsap.utils.toArray('.itinerary-item');
      items.forEach((item: any) => {
        const circle = item.querySelector('.icon-circle');
        const title = item.querySelector('.itinerary-title');
        const img = item.querySelector('.itinerary-img');
        
        // El punto está en el centro de la pantalla, así que cuando el item cruce el centro, animamos.
        // Importamos ScrollTrigger de gsap usando el objeto global configurado
        const ScrollTrigger = (gsap as any).core.globals().ScrollTrigger;
        if (ScrollTrigger) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 55%', // Se activa un pelito antes de llegar al centro exacto
            onEnter: () => {
              if (circle) gsap.to(circle, { backgroundColor: 'rgba(224, 191, 184, 0.15)', borderColor: 'var(--color-gold)', duration: 0.4, ease: 'power2.out' });
              // Texto resalta en Rose Gold con resplandor (Glow)
              if (title) gsap.to(title, { color: 'var(--color-gold)', textShadow: '0 0 12px rgba(224, 191, 184, 0.8)', duration: 0.4, ease: 'power2.out' });
              // Icono pasa de blanco a su color original con resplandor Rose Gold
              if (img) gsap.to(img, { filter: 'grayscale(0) brightness(1) drop-shadow(0 0 8px rgba(224, 191, 184, 0.9))', duration: 0.4, ease: 'power2.out' });
            },
            onLeaveBack: () => {
              if (circle) gsap.to(circle, { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: '#C0C0C0', duration: 0.4, ease: 'power2.out' });
              // Vuelve a blanco puro sin resplandor
              if (title) gsap.to(title, { color: 'var(--color-cream)', textShadow: '0 0 0px rgba(224, 191, 184, 0)', duration: 0.4, ease: 'power2.out' });
              // Icono vuelve a blanco metálico
              if (img) gsap.to(img, { filter: 'grayscale(1) brightness(2) drop-shadow(0 0 0px rgba(224, 191, 184, 0))', duration: 0.4, ease: 'power2.out' });
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '3rem 1.5rem', backgroundColor: 'var(--color-black)', position: 'relative', overflow: 'hidden' }}>
      {/* Sparkles Ambientales */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <CSSSparkle size={15} color="#EAEAEA" top="5%" left="10%" delay="0s" points={8} />
        <CSSSparkle size={20} color="var(--color-gold)" top="30%" right="15%" delay="1s" points={4} />
        <CSSSparkle size={18} color="#EAEAEA" bottom="40%" left="20%" delay="0.5s" points={4} />
        <CSSSparkle size={25} color="var(--color-gold)" bottom="10%" right="10%" delay="1.5s" points={8} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-gold)', letterSpacing: '0.3em', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Nuestra noche</p>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)', fontSize: 'clamp(3.8rem, 9vw, 4.5rem)', lineHeight: 1, fontWeight: 400 }}>Itinerario</h2>
      </div>
      
      <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', paddingLeft: '35px' }}>
        {/* Vía plateada */}
        <div style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '1px', backgroundColor: '#C0C0C0' }} />
        {/* Punto en tránsito rose gold con glow */}
        <div ref={dotRef} style={{ position: 'absolute', left: '11.5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', boxShadow: '0 0 10px rgba(224, 191, 184, 0.8)', zIndex: 10, transform: 'translateY(-50%)' }} />

        {itinerary?.map((item, idx) => (
          <div key={idx} className="itinerary-item" style={{ position: 'relative', paddingBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ position: 'absolute', left: '-22.5px', top: '15px', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-cream)', zIndex: 5 }} />
            
            {/* Círculo para ícono - Estilo glassmorphism */}
            <div className="icon-circle" style={{ 
              width: '45px', height: '45px', borderRadius: '50%', 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #C0C0C0',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, overflow: 'hidden'
            }}>
              <ItineraryIcon iconName={item.icon} color="var(--color-cream)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: '-2px' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{item.time}</span>
              <h3 className="itinerary-title" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', fontWeight: 600, margin: '0.1rem 0', color: 'var(--color-cream)', textTransform: 'uppercase' }}>{item.title}</h3>
              {item.description && <p style={{ color: 'var(--color-cream-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

