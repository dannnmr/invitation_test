'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
import type { InvitationConfig } from '@/types/invitation';

interface ParentsSectionProps {
  config: InvitationConfig;
}

export function ParentsSection({ config }: ParentsSectionProps) {
  return <ParentsOption3 config={config} />;
}

function ParentsOption1({ config }: ParentsSectionProps) {
  const { parents } = config;
  if (!parents) return null;
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#111', border: '1px solid #333', padding: '10px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        <div style={{ border: '2px solid #d4af37', padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#151515', backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          
          <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: '3rem', color: '#d4af37' }}>{parents.topLabel || 'Con la bendición de mis padres'}</h2>

          <div style={{ margin: '3rem 0' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#888', letterSpacing: '4px', textTransform: 'uppercase' }}>Mis Padres</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', marginTop: '0.5rem' }}>{parents.fatherName} & {parents.motherName}</p>
          </div>

          {parents.godparents && parents.godparents.length > 0 && (
            <div>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#555', margin: '2rem auto' }} />
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#888', letterSpacing: '4px', textTransform: 'uppercase' }}>Mis Padrinos</span>
              {parents.godparents.map((g, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#eee', marginTop: '0.5rem' }}>{g}</p>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

function ParentsOption2({ config }: ParentsSectionProps) {
  const { parents } = config;
  if (!parents) return null;
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
      {/* Spotlight Effect CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .spotlight {
          background: radial-gradient(circle at 50% 0%, rgba(244, 114, 182, 0.15) 0%, transparent 60%);
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
        }
      `}} />
      <div className="spotlight" />
      
      <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '600px' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.8rem', color: '#fbcfe8', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Bendición & Agradecimiento
        </p>
        <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: '4rem', color: '#fff', marginTop: '1rem', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
          {parents.topLabel || 'Con la bendición de mis padres'}
        </h2>
        
    

        <div style={{ marginTop: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff' }}>{parents.fatherName}</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff' }}>& {parents.motherName}</p>
        </div>

        {parents.godparents && parents.godparents.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#888', letterSpacing: '4px', textTransform: 'uppercase' }}>Padrinos</span>
            {parents.godparents.map((g, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#ccc', marginTop: '0.5rem' }}>{g}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ParentsOption3({ config }: ParentsSectionProps) {
  const { parents } = config;
  if (!parents) return null;

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const blockRef = useScrollReveal<HTMLDivElement>({
    y: 35,
    stagger: 0.15,
    childSelector: '.reveal-item',
  });

  return (
    <section
      aria-label="Bendición de padres"
      style={{
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          pointerEvents: 'none',
          opacity: 0.15,
          color: 'var(--color-gold)',
        }}
      >
        <Sparkles className="w-8 h-8 text-pink-300 animate-pulse" />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          pointerEvents: 'none',
          opacity: 0.12,
          color: 'var(--color-gold-metallic)',
        }}
      >
        <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          textAlign: 'center',
          zIndex: 5,
        }}
      >
        <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
              color: 'var(--color-gold)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Bendición & Agradecimiento
          </p>
          
          <h2
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'clamp(3rem, 7vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--color-gold-dark)',
              lineHeight: 1.1,
            }}
          >
            {parents.topLabel || 'Con la bendición de mis padres'}
          </h2>
        </div>

        <div
          ref={blockRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2.5rem',
          }}
        >
    

          <div className="reveal-item" style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-cream-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Mis Padres
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-cream)',
                }}
              >
                {parents.fatherName} & {parents.motherName}
              </p>
            </div>
          </div>

          <div
            className="reveal-item"
            aria-hidden="true"
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: 'rgba(244, 114, 182, 0.25)',
            }}
          />

          {parents.godparents && parents.godparents.length > 0 && (
            <div className="reveal-item" style={{ width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-cream-muted)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Mis Padrinos
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {parents.godparents.map((godparent, idx) => (
                    <p
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                        fontStyle: 'italic',
                        fontWeight: 300,
                        color: 'var(--color-cream)',
                      }}
                    >
                      {godparent}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
