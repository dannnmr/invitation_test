'use client';

import { useCallback, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface EnvelopeRefs {
  envelopeBaseRef: React.RefObject<HTMLImageElement | null>;
  leftFlapRef:     React.RefObject<HTMLImageElement | null>;
  rightFlapRef:    React.RefObject<HTMLImageElement | null>;
  brochRef:        React.RefObject<HTMLImageElement | null>;
  particlesRef?:    React.RefObject<HTMLCanvasElement | null>;
  overlayRef:      React.RefObject<HTMLDivElement | null>;
  contentRef:      React.RefObject<HTMLDivElement | null>;
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
      envelopeBaseRef,
      leftFlapRef,
      rightFlapRef,
      brochRef,
      particlesRef,
      overlayRef,
      contentRef,
    } = refs;

    const envelopeBase = envelopeBaseRef.current;
    const leftFlap   = leftFlapRef.current;
    const rightFlap  = rightFlapRef.current;
    const broch      = brochRef.current;
    const canvas     = particlesRef?.current;
    const overlay    = overlayRef.current;
    const content    = contentRef.current;

    if (!envelopeBase || !leftFlap || !rightFlap || !overlay || !content) return;

    // Preparar el contenido — directamente visible
    gsap.set(content, {
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

    // 2. Sobre completo inicial - desaparecer para que no se vea doble con las aletas
    tl.set(envelopeBase, { opacity: 0 }, broch ? '-=0.1' : '0');

    // 3. Solapa izquierda — deslizar hacia la izquierda
    tl.to(leftFlap, {
      xPercent: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '-=0.1');

    // 4. Solapa derecha — deslizar hacia la derecha
    tl.to(rightFlap, {
      xPercent: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '<'); // Animación simultánea

    // 5. Overlay — fade out
    tl.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
    }, '-=0.6');

    // 6. Contenido - ya está visible, no necesitamos animar el clipPath

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
