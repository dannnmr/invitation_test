'use client';

import { useCallback, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface EnvelopeRefs {
  envelopeRef:    React.RefObject<SVGSVGElement | null>;
  topFlapRef:     React.RefObject<SVGPathElement | null>;
  bottomFlapRef:  React.RefObject<SVGPathElement | null>;
  brochRef:       React.RefObject<SVGGElement | null>;
  particlesRef:   React.RefObject<HTMLCanvasElement | null>;
  overlayRef:     React.RefObject<HTMLDivElement | null>;
  contentRef:     React.RefObject<HTMLDivElement | null>;
}

interface UseEnvelopeAnimationReturn {
  playOpenSequence: () => void;
}

/**
 * Orquesta la secuencia completa de apertura del sobre.
 *
 * Timeline:
 * 0.0s  — broche gira y desaparece
 * 0.4s  — solapa superior sube (rotateX)
 * 0.6s  — solapa inferior baja
 * 0.9s  — sobre escala hacia afuera
 * 1.2s  — sobre fade out
 * 1.4s  — clip-path revela el contenido
 * 2.2s  — partículas fade out
 * 3.2s  — secuencia completa
 */
export function useEnvelopeAnimation(
  refs: EnvelopeRefs,
  onComplete: () => void
): UseEnvelopeAnimationReturn {

  const hasPlayed = useRef(false);

  const playOpenSequence = useCallback(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    const {
      envelopeRef,
      topFlapRef,
      bottomFlapRef,
      brochRef,
      particlesRef,
      overlayRef,
      contentRef,
    } = refs;

    const envelope   = envelopeRef.current;
    const topFlap    = topFlapRef.current;
    const bottomFlap = bottomFlapRef.current;
    const broch      = brochRef.current;
    const canvas     = particlesRef.current;
    const overlay    = overlayRef.current;
    const content    = contentRef.current;

    if (!envelope || !topFlap || !bottomFlap || !overlay || !content) return;

    // Preparar el contenido — oculto con clip-path
    gsap.set(content, {
      clipPath: 'inset(50% 0% 50% 0%)',
      opacity: 1,
    });

    const tl = gsap.timeline({ onComplete });

    // 1. Broche — girar y desaparecer
    if (broch) {
      tl.to(broch, {
        rotation: 180,
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'back.in(2)',
        transformOrigin: 'center center',
      });
    }

    // 2. Solapa superior — rotar hacia arriba (perspectiva 3D)
    tl.to(topFlap, {
      rotateX: -180,
      duration: 0.5,
      ease: 'power2.inOut',
      transformOrigin: 'center bottom',
      transformPerspective: 600,
    }, broch ? '-=0.1' : '0');

    // 3. Solapa inferior — rotar hacia abajo
    tl.to(bottomFlap, {
      rotateX: 180,
      duration: 0.5,
      ease: 'power2.inOut',
      transformOrigin: 'center top',
      transformPerspective: 600,
    }, '-=0.4');

    // 4. Sobre completo — escalar y desvanecer
    tl.to(envelope, {
      scale: 1.08,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, '-=0.1');

    // 5. Overlay — fade out
    tl.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.out',
    }, '-=0.1');

    // 6. Contenido — clip-path se expande revelando la invitación
    tl.to(content, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.0,
      ease: 'expo.inOut',
    }, '-=0.2');

    // 7. Canvas de partículas — fade out
    if (canvas) {
      tl.to(canvas, {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.out',
      }, '-=0.8');
    }

  }, [refs, onComplete]);

  return { playOpenSequence };
}
