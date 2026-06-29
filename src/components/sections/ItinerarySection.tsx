'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Martini, Camera, Utensils, Music, Cake, Sparkles } from 'lucide-react';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
import type { InvitationConfig } from '@/types/invitation';

interface ItinerarySectionProps {
  config: InvitationConfig;
}

const ItineraryIcon = ({ iconName }: { iconName?: string }) => {
  const className = 'w-5 h-5 text-[#F8C8DC] stroke-[1.5]';
  if (!iconName) return <Sparkles className={className} />;

  if (iconName.includes('🥂') || iconName.includes('champagne')) return <Martini className={className} />;
  if (iconName.includes('📸') || iconName.includes('camera') || iconName.includes('Ingreso')) return <Camera className={className} />;
  if (iconName.includes('🍽️') || iconName.includes('cena') || iconName.includes('dinner')) return <Utensils className={className} />;
  if (iconName.includes('🪩') || iconName.includes('fiesta') || iconName.includes('party')) return <Music className={className} />;
  if (iconName.includes('🎂') || iconName.includes('torta') || iconName.includes('cake')) return <Cake className={className} />;

  return <Sparkles className={className} />;
};

export function ItinerarySection({ config }: ItinerarySectionProps) {
  return <ItineraryOption1 config={config} />;
}

function ItineraryOption1({ config }: ItinerarySectionProps) {
  const { itinerary } = config;
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !dotRef.current) return;
    const ctx = gsap.context(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '5rem 1.5rem', backgroundColor: '#fdfbf7', color: '#111', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-dm-mono)', color: '#8b0000', letterSpacing: '2px', fontSize: '0.8rem' }}>TRANSIT ROUTE</h2>
      </div>
      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', paddingLeft: '40px' }}>
        {/* Vía */}
        <div style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '2px', backgroundColor: '#ddd' }} />
        {/* Punto en tránsito */}
        <div ref={dotRef} style={{ position: 'absolute', left: '9px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f472b6', boxShadow: '0 0 15px rgba(244, 114, 182, 0.5)', zIndex: 10, transform: 'translateY(-50%)' }} />

        {itinerary?.map((item, idx) => (
          <div key={idx} style={{ position: 'relative', paddingBottom: '3rem' }}>
            <div style={{ position: 'absolute', left: '-29px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fdfbf7', border: '2px solid #aaa', zIndex: 5 }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', color: '#8b0000', fontSize: '0.8rem' }}>{item.time}</span>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#111' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ItineraryOption2({ config }: ItinerarySectionProps) {
  const { itinerary } = config;
  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', color: '#d4af37', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '4rem' }}>Itinerary Pass</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '400px' }}>
        {itinerary?.map((item, idx) => (
          <div key={idx} style={{
            position: 'relative',
            backgroundColor: '#d4af37',
            clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)',
            padding: '1.5rem',
            color: '#000',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15px', backgroundColor: '#111' }} />
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', opacity: 0.8, marginTop: '0.5rem' }}>{item.description}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontWeight: 'bold', backgroundColor: '#000', color: '#d4af37', padding: '4px 8px', fontSize: '0.8rem' }}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ItineraryOption3({ config }: ItinerarySectionProps) {
  const { itinerary } = config;
  return (
    <section style={{ 
      padding: '5rem 1.5rem', 
      backgroundColor: '#111', 
      position: 'relative',
      boxShadow: 'inset 40px 0 100px -20px #000, inset -40px 0 100px -20px #000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ fontFamily: 'var(--font-dm-mono)', color: '#fbcfe8', letterSpacing: '5px', fontSize: '0.8rem', opacity: 0.6, marginBottom: '4rem' }}>THE TUNNEL</h2>
      <div style={{ position: 'relative', width: '100%', maxWidth: '500px', paddingLeft: '40px' }}>
        {/* Neon Light Tube */}
        <div style={{ position: 'absolute', left: '18px', top: 0, bottom: 0, width: '4px', backgroundColor: '#fff', boxShadow: '0 0 20px 5px #f472b6, 0 0 40px #f472b6' }} />
        
        {itinerary?.map((item, idx) => (
          <div key={idx} style={{ position: 'relative', paddingBottom: '4rem' }}>
            <div style={{ position: 'absolute', left: '-27px', top: '5px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 0 15px #fff' }} />
            <div style={{ backgroundColor: 'rgba(20,20,20,0.8)', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', color: '#f472b6', fontSize: '0.9rem', textShadow: '0 0 5px #f472b6' }}>{item.time}</span>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: '#fff', margin: '0.5rem 0' }}>{item.title}</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Opción 4: Diseño Original
 */
function ItineraryOption4({ config }: ItinerarySectionProps) {
  const { itinerary } = config;
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Detección de diseño responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animación de la línea dorada con scroll (scrub)
  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });

  return (
    <section
      ref={containerRef}
      aria-label="Itinerario del evento"
      style={{
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* Cabecera de la Sección */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 7vw, 5rem)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          El Programa
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-pinyon)',
            fontSize: 'clamp(3rem, 7vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--color-gold-dark)',
            marginBottom: '1rem',
          }}
        >
          Itinerario del Evento
        </h2>
      </div>

      {/* Contenedor del Timeline */}
      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          padding: isMobile ? '0 0 0 40px' : '0',
          zIndex: 5,
        }}
      >
        {/* Línea de fondo tenue */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: isMobile ? '12px' : '50%',
            top: '0',
            bottom: '0',
            width: '1px',
            backgroundColor: 'rgba(244, 114, 182, 0.15)',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            zIndex: 1,
          }}
        />

        {/* Línea rosa animada con scroll */}
        <div
          ref={lineRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: isMobile ? '11px' : '50%',
            top: '0',
            bottom: '0',
            width: '3px',
            backgroundColor: 'var(--color-gold)',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            transformOrigin: 'top center',
            zIndex: 2,
            boxShadow: '0 0 10px rgba(244, 114, 182, 0.3)',
          }}
        />

        {/* Elementos */}
        {itinerary?.map((item, idx) => {
          const isLeft = !isMobile && idx % 2 === 0;

          // Animación individual al scroll
          const cardRef = useScrollReveal<HTMLDivElement>({
            y: 40,
            duration: 0.9,
            start: 'top 90%',
          });

          return (
            <div
              key={idx}
              ref={cardRef}
              style={{
                display: 'flex',
                justifyContent: isMobile ? 'flex-start' : isLeft ? 'flex-end' : 'flex-start',
                width: isMobile ? '100%' : '50%',
                marginLeft: isMobile ? '0' : isLeft ? '0' : '50%',
                paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
                position: 'relative',
                zIndex: 3,
              }}
            >
              {/* Punto indicador del nodo */}
              <div
                style={{
                  position: 'absolute',
                  left: isMobile ? '-28px' : isLeft ? 'auto' : '-10px',
                  right: isLeft ? '-10px' : 'auto',
                  top: '12px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-black)',
                  border: '2px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 4,
                  boxShadow: '0 0 8px rgba(244, 114, 182, 0.2)',
                }}
              />

              {/* Contenido / Card */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid rgba(244, 114, 182, 0.12)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginRight: isLeft ? '2rem' : '0',
                  marginLeft: !isLeft ? '2rem' : '0',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                  textAlign: isLeft ? 'right' : 'left',
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(244, 114, 182, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.12)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.04)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexDirection: isLeft ? 'row-reverse' : 'row',
                  }}
                >
                  {/* Ícono vectorial decorativo */}
                  <div
                    style={{
                      position: 'relative',
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      backgroundColor: 'rgba(248, 200, 220, 0.08)',
                      border: '1px solid rgba(248, 200, 220, 0.15)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ItineraryIcon iconName={item.icon} />
                  </div>

                  {/* Textos del evento */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Hora */}
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.85rem',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.time}
                    </span>

                    {/* Título */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--color-cream)',
                        marginTop: '0.2rem',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Descripción */}
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        color: 'var(--color-cream-muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
