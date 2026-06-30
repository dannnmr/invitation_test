'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Martini, Camera, Utensils, Music, Cake, Sparkles } from 'lucide-react';
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
        
        // El punto está en el centro de la pantalla, así que cuando el item cruce el centro, animamos.
        // Importamos ScrollTrigger de gsap usando el objeto global configurado
        const ScrollTrigger = (gsap as any).core.globals().ScrollTrigger;
        if (ScrollTrigger) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 55%', // Se activa un pelito antes de llegar al centro exacto
            onEnter: () => {
              if (circle) gsap.to(circle, { backgroundColor: '#f2d4d8ff', borderColor: '#f2d4d8ff', duration: 0.4, ease: 'power2.out' });
              // Usamos un tono de rosa más oscuro (#B5838D) para que el texto sea muy legible
              if (title) gsap.to(title, { color: '#B5838D', duration: 0.4, ease: 'power2.out' });
            },
            onLeaveBack: () => {
              if (circle) gsap.to(circle, { backgroundColor: '#fdfbf7', borderColor: '#C0C0C0', duration: 0.4, ease: 'power2.out' });
              if (title) gsap.to(title, { color: '#111', duration: 0.4, ease: 'power2.out' });
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '3rem 1.5rem', backgroundColor: '#fdfbf7', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', color: '#B5838D', letterSpacing: '0.3em', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Nuestra noche</p>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#111', fontSize: 'clamp(3.8rem, 9vw, 4.5rem)', lineHeight: 1, fontWeight: 400 }}>Itinerario</h2>
      </div>
      
      <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', paddingLeft: '35px' }}>
        {/* Vía plateada */}
        <div style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '1px', backgroundColor: '#C0C0C0' }} />
        {/* Punto en tránsito rosa pastel con glow */}
        <div ref={dotRef} style={{ position: 'absolute', left: '11.5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F8C8DC', boxShadow: '0 0 10px rgba(248, 200, 220, 0.8)', zIndex: 10, transform: 'translateY(-50%)' }} />

        {itinerary?.map((item, idx) => (
          <div key={idx} className="itinerary-item" style={{ position: 'relative', paddingBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ position: 'absolute', left: '-22.5px', top: '15px', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111', zIndex: 5 }} />
            
            {/* Círculo para ícono */}
            <div className="icon-circle" style={{ 
              width: '45px', height: '45px', borderRadius: '50%', 
              backgroundColor: '#fdfbf7', border: '1px solid #C0C0C0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, overflow: 'hidden'
            }}>
              <ItineraryIcon iconName={item.icon} color="#111" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: '-2px' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', color: '#B5838D', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{item.time}</span>
              <h3 className="itinerary-title" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', fontWeight: 600, margin: '0.1rem 0', color: '#111', textTransform: 'uppercase' }}>{item.title}</h3>
              {item.description && <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.2rem' }}>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

