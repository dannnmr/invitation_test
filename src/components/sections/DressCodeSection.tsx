'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { SectionVariantSwitcher } from '@/components/ui/SectionVariantSwitcher';
import type { InvitationConfig } from '@/types/invitation';

interface DressCodeSectionProps {
  config: InvitationConfig;
}

export function DressCodeSection({ config }: DressCodeSectionProps) {
  const [activeOption, setActiveOption] = useState(1);
  return (
    <div style={{ position: 'relative' }}>
      <SectionVariantSwitcher activeOption={activeOption} onChange={setActiveOption} optionsCount={4} />
      {activeOption === 1 && <DressCodeOption1 config={config} />}
      {activeOption === 2 && <DressCodeOption2 config={config} />}
      {activeOption === 3 && <DressCodeOption3 config={config} />}
      {activeOption === 4 && <DressCodeOption4 config={config} />}
    </div>
  );
}

function DressCodeOption1({ config }: DressCodeSectionProps) {
  const { dressCode } = config;
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', padding: '2rem', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '800px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#fbcfe8', fontWeight: 300 }}>Fashion Week</h2>
        <p style={{ fontFamily: 'var(--font-dm-mono)', color: '#888', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>{dressCode.description}</p>
        
        {/* SVG Silhouettes */}
        <div style={{ display: 'flex', gap: '3rem', margin: '3rem 0', opacity: 0.8 }}>
          <svg width="60" height="200" viewBox="0 0 60 200" fill="none" stroke="#f472b6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '500', strokeDashoffset: '0', animation: 'draw 3s ease-out forwards' }}>
            {/* Simple elegant female silhouette croquis */}
            <path d="M30 10 C35 10 38 15 35 25 C30 30 25 35 20 45 C15 60 20 80 30 100 C40 120 45 150 40 180 M30 10 C25 10 22 15 25 25 C30 30 35 35 40 45 C45 60 40 80 30 100 C20 120 15 150 20 180" />
            <circle cx="30" cy="15" r="8" />
          </svg>
          <svg width="60" height="200" viewBox="0 0 60 200" fill="none" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '500', strokeDashoffset: '0', animation: 'draw 3s ease-out forwards 0.5s' }}>
            {/* Simple elegant male silhouette croquis */}
            <path d="M30 15 C40 15 45 20 45 30 C45 45 35 50 30 60 C25 80 20 110 20 180 M30 15 C20 15 15 20 15 30 C15 45 25 50 30 60 C35 80 40 110 40 180" />
            <circle cx="30" cy="15" r="8" />
          </svg>
        </div>

        <div style={{ width: '2px', height: '40px', backgroundColor: '#333' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          {dressCode.colors?.map((color, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: color, border: '1px solid rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', color: '#666', textTransform: 'uppercase' }}>Color {idx + 1}</span>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', color: '#aaa', fontStyle: 'italic', fontSize: '0.9rem', maxWidth: '400px', lineHeight: 1.6 }}>{dressCode.notes}</p>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes draw {
          from { stroke-dashoffset: 500; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </section>
  );
}

function DressCodeOption2({ config }: DressCodeSectionProps) {
  const { dressCode } = config;
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8e8e8', padding: '2rem' }}>
      <div style={{ backgroundColor: '#fff', padding: '4rem', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', maxWidth: '600px', border: '1px solid #ddd' }}>
        <h2 style={{ fontFamily: 'Helvetica', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#000', textTransform: 'uppercase', letterSpacing: '-1px' }}>
          Fabric Swatches
        </h2>
        
        <p style={{ fontFamily: 'Georgia', fontStyle: 'italic', color: '#555', fontSize: '1.2rem', textAlign: 'center' }}>
          {dressCode.description}. {dressCode.notes}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {dressCode.colors?.map((color, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Swatch shadow / texture illusion */}
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                backgroundColor: color,
                boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.4), 0 10px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                zIndex: 2
              }} />
              {/* Etiqueta de sastre */}
              <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#f4f4f4', padding: '4px 12px', border: '1px solid #ccc', fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', color: '#333', zIndex: 3, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DressCodeOption3({ config }: DressCodeSectionProps) {
  const { dressCode } = config;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section 
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111', color: '#fff', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Contenido oculto revelado */}
      <div style={{ textAlign: 'center', zIndex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-pinyon)', fontSize: 'clamp(4rem, 10vw, 6rem)', color: '#fbcfe8' }}>Dress Code</h2>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{dressCode.description}</h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {dressCode.colors?.map((c, i) => <div key={i} style={{ width: '30px', height: '30px', backgroundColor: c, borderRadius: '50%' }} />)}
        </div>
        <p style={{ color: '#888', maxWidth: '400px' }}>{dressCode.notes}</p>
      </div>

      {/* Cortina Izquierda */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', backgroundColor: '#050505', zIndex: 10,
        boxShadow: '10px 0 30px rgba(0,0,0,0.8)',
        transition: 'transform 1.5s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '2rem'
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', color: '#fff', opacity: !isOpen ? 1 : 0, transition: 'opacity 0.3s', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '4px' }}>TAP TO OPEN</span>
      </div>

      {/* Cortina Derecha */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', backgroundColor: '#050505', zIndex: 10,
        boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
        transition: 'transform 1.5s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '2rem'
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', color: '#fff', opacity: !isOpen ? 1 : 0, transition: 'opacity 0.3s', writingMode: 'vertical-rl', letterSpacing: '4px' }}>DRESS CODE</span>
      </div>
    </section>
  );
}

/**
 * Opción 4: Diseño Original (Editorial Vogue)
 */
export function DressCodeOption4({ config }: DressCodeSectionProps) {
  const { dressCode } = config;

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const contentRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    stagger: 0.12,
    childSelector: '.reveal-item',
    delay: 0.2,
  });

  return (
    <section
      aria-label="Código de vestimenta"
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
      {/* Fondo decorativo de línea dorada vertical fina */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '0.5px',
          backgroundColor: 'rgba(244, 114, 182, 0.1)',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      />

      {/* Cabecera */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 4.5rem)',
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
          El Estilo
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-pinyon)',
            fontSize: 'clamp(3rem, 7vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--color-gold-dark)',
          }}
        >
          Código de Vestimenta
        </h2>
      </div>

      {/* Caja de contenido central */}
      <div
        ref={contentRef}
        style={{
          width: '100%',
          maxWidth: '650px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid rgba(244, 114, 182, 0.15)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
          zIndex: 5,
        }}
      >
        {/* Icono de Perchero / Vestimenta */}
        <div
          className="reveal-item"
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'var(--color-gold)',
            opacity: 0.8,
          }}
        >
          👗
        </div>

        {/* Tipo de Dress Code */}
        <div className="reveal-item" style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-cream-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Sugerencia de Estilo
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 300,
              color: 'var(--color-gold-dark)',
              marginTop: '0.5rem',
              textTransform: 'capitalize',
            }}
          >
            {dressCode.description}
          </h3>
        </div>

        {/* Separador decorativo */}
        <div
          className="reveal-item"
          aria-hidden="true"
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'rgba(244, 114, 182, 0.25)',
          }}
        />

        {/* Paleta de Colores Sugerida */}
        {dressCode.colors && dressCode.colors.length > 0 && (
          <div
            className="reveal-item"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              width: '100%',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-cream-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Paleta de Colores Sugerida
            </span>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '0.5rem',
              }}
            >
              {dressCode.colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </div>
        )}

        {/* Notas Adicionales */}
        {dressCode.notes && (
          <div
            className="reveal-item"
            style={{
              textAlign: 'center',
              backgroundColor: 'rgba(244, 114, 182, 0.04)',
              borderLeft: '2px solid var(--color-gold)',
              padding: '1rem 1.5rem',
              maxWidth: '480px',
              borderRadius: '2px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--color-cream)',
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              {dressCode.notes}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
