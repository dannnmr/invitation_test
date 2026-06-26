'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface SplitTextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  type?: 'chars' | 'words';
  className?: string;
  style?: React.CSSProperties;
  /** Activar o desactivar ScrollTrigger */
  scrollTrigger?: boolean;
  /** Configuración de GSAP */
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Valores de transición iniciales */
  yPercent?: number;
  rotate?: number;
  scale?: number;
  skewX?: number;
  skewY?: number;
  opacity?: number;
  /** Easing para la animación */
  ease?: string;
}

export function SplitTextReveal({
  text,
  as = 'div',
  type = 'chars',
  className = '',
  style = {},
  scrollTrigger = true,
  delay = 0,
  duration = 1.2,
  stagger = 0.02,
  yPercent = 100,
  rotate = 6,
  scale = 1,
  skewX = 0,
  skewY = 3,
  opacity = 0,
  ease = 'power4.out',
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Obtener los elementos hijos a animar (.char-item o .word-item)
    const targets = el.querySelectorAll(type === 'chars' ? '.char-item' : '.word-item');
    if (!targets.length) return;

    // Configurar el estado inicial en GSAP también para sincronización perfecta
    gsap.set(targets, {
      yPercent,
      rotate,
      scale,
      skewX,
      skewY,
      opacity,
      transformOrigin: 'left bottom',
    });

    // Crear la animación de revelado de lujo
    const animation = gsap.to(targets, {
      yPercent: 0,
      rotate: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
      clearProps: 'transform,opacity,willChange',
      scrollTrigger: scrollTrigger
        ? {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          }
        : undefined,
    });

    return () => {
      animation.kill();
    };
  }, [type, scrollTrigger, delay, duration, stagger, yPercent, rotate, scale, skewX, skewY, opacity, ease]);

  const words = text.split(' ');
  const Component = as;

  // Estilo de transformación inicial para evitar parpadeos visuales (FOUC)
  const initialTransform = `translate3d(0, ${yPercent}%, 0) rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg) scale(${scale})`;

  const itemStyle: React.CSSProperties = {
    display: 'inline-block',
    transform: initialTransform,
    opacity,
    transformOrigin: 'left bottom',
    willChange: 'transform, opacity',
  };

  return (
    <Component
      ref={containerRef as any}
      className={className}
      style={{
        ...style,
        position: 'relative',
      }}
    >
      {words.map((word, wordIdx) => {
        if (type === 'chars') {
          return (
            <span
              key={wordIdx}
              className="word-wrapper"
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                whiteSpace: 'nowrap',
                paddingBottom: '0.15em',
                marginBottom: '-0.15em',
              }}
            >
              {word.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="char-item"
                  style={itemStyle}
                >
                  {char}
                </span>
              ))}
              {/* Espacio entre palabras para mantener estructura */}
              {wordIdx < words.length - 1 && (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              )}
            </span>
          );
        } else {
          // type === 'words'
          return (
            <span
              key={wordIdx}
              className="word-wrapper"
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                paddingBottom: '0.15em',
                marginBottom: '-0.15em',
              }}
            >
              <span
                className="word-item"
                style={itemStyle}
              >
                {word}
              </span>
              {/* Espacio entre palabras */}
              {wordIdx < words.length - 1 && (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              )}
            </span>
          );
        }
      })}
    </Component>
  );
}
