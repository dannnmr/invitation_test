'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface UseTextRevealOptions {
  /** Delay antes de iniciar en segundos. Default: 0 */
  delay?: number;
  /** Duración total de la secuencia en segundos. Default: 1.2 */
  duration?: number;
  /** Stagger entre caracteres en segundos. Default: 0.04 */
  stagger?: number;
  /** Si true, inicia automáticamente al montar. Si false, usar play(). Default: true */
  autoPlay?: boolean;
}

interface UseTextRevealReturn {
  ref: React.RefObject<HTMLElement | null>;
  play: () => void;
}

/**
 * Divide el texto en caracteres individuales y los anima con GSAP stagger.
 * Cada caracter entra desde abajo con ease expo.out.
 *
 * El elemento hijo debe ser un string de texto simple.
 * El hook envuelve cada caracter en un span automáticamente.
 *
 * Uso:
 *   const { ref } = useTextReveal({ delay: 0.5 });
 *   <h1 ref={ref as RefObject<HTMLHeadingElement>}>Sofía</h1>
 */
export function useTextReveal(
  options: UseTextRevealOptions = {}
): UseTextRevealReturn {
  const {
    delay    = 0,
    duration = 0.8,
    stagger  = 0.04,
    autoPlay = true,
  } = options;

  const ref       = useRef<HTMLElement>(null);
  const tlRef     = useRef<gsap.core.Timeline | null>(null);
  const splitRef  = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Obtener el texto original
    const text = el.textContent ?? '';
    el.textContent = '';
    el.setAttribute('aria-label', text); // Mantener accesibilidad

    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      
      word.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        // removed overflow: hidden to prevent font clipping
        wordSpan.appendChild(charSpan);
        splitRef.current.push(charSpan);
      });
      
      el.appendChild(wordSpan);
      
      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.innerHTML = '&nbsp;';
        spaceSpan.style.display = 'inline-block';
        el.appendChild(spaceSpan);
        splitRef.current.push(spaceSpan);
      }
    });

    // Estado inicial — caracteres abajo y transparentes
    gsap.set(splitRef.current, { y: '110%', opacity: 0 });

    // Timeline de reveal
    tlRef.current = gsap.timeline({ paused: !autoPlay, delay });

    tlRef.current.to(splitRef.current, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'expo.out',
    });

    return () => {
      tlRef.current?.kill();
      el.textContent = text;
    };
  }, [delay, duration, stagger, autoPlay]);

  function play() {
    tlRef.current?.play();
  }

  return { ref: ref as React.RefObject<HTMLElement | null>, play };
}
