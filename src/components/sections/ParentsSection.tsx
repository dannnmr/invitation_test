'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { InvitationConfig } from '@/types/invitation';

interface ParentsSectionProps {
  config: InvitationConfig;
}

function DiamondStar({ color, size, top, left, right, bottom, delay }: any) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom,
      width: size, height: size,
      filter: `drop-shadow(0 0 8px ${color})`,
      animation: `diamondShine 4s ease-in-out infinite ${delay}s`,
      zIndex: 0
    }}>
      <div style={{
        width: '100%', height: '100%',
        backgroundColor: color,
        clipPath: 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)'
      }} />
    </div>
  );
}

export function ParentsSection({ config }: ParentsSectionProps) {
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
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-black)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .spotlight-opt3 {
          background: radial-gradient(circle at 50% 0%, rgba(224, 191, 184, 0.15) 0%, transparent 60%);
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
        }
        @keyframes diamondShine {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}} />
      <div className="spotlight-opt3" />

      {/* Estrellas decorativas */}
      <DiamondStar color="#C0C0C0" size="35px" top="15%" left="15%" delay="0" />
      <DiamondStar color="var(--color-gold)" size="40px" bottom="5%" right="5%" delay="1" />
      <DiamondStar color="#C0C0C0" size="20px" top="30%" right="20%" delay="2" />
      <DiamondStar color="var(--color-gold)" size="30px" bottom="5%" left="30%" delay="0.5" />
      <DiamondStar color="#C0C0C0" size="15px" top="70%" left="10%" delay="1.5" />

      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', zIndex: 1 }}>
        <p
          ref={headerRef}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            opacity: 0.9
          }}
        >
          {parents.topLabel || 'Con la bendición de mis padres'}
        </p>

        <div ref={blockRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div className="reveal-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', color: 'var(--color-cream)', lineHeight: 1 }}>
              {parents.fatherName}
            </p>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--color-gold)', margin: '0.2rem 0', fontStyle: 'italic' }}>
              &
            </span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', color: 'var(--color-cream)', lineHeight: 1 }}>
              {parents.motherName}
            </p>
          </div>

          {parents.godparents && parents.godparents.length > 0 && (
            <div className="reveal-item" style={{ marginTop: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', color: 'var(--color-cream-muted)', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                Mis Padrinos
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {parents.godparents.map((g, idx) => (
                  <p key={idx} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', color: 'var(--color-cream)', lineHeight: 1 }}>
                    {g}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
