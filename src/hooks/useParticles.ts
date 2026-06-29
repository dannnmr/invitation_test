'use client';

import { useEffect, useRef } from 'react';
import { lerp } from '@/lib/utils';

interface Particle {
  x:       number;
  y:       number;
  vx:      number;
  vy:      number;
  radius:  number;
  alpha:   number;
  speed:   number;
  angle:   number;
  orbitR:  number;
  orbitX:  number;
  orbitY:  number;
}

interface UseParticlesOptions {
  count?:       number;
  color?:       string;
  maxRadius?:   number;
}

/**
 * Sistema de partículas doradas en Canvas 2D.
 * Las partículas orbitan alrededor del centro con movimiento orgánico.
 * Al llamar converge(), todas se mueven hacia el centro (efecto de apertura).
 *
 * Retorna el ref del canvas y la función converge.
 */
export function useParticles(options: UseParticlesOptions = {}) {
  const {
    count     = 80,
    color     = '#C5A059',
    maxRadius = 3,
  } = options;

  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const particles   = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas al viewport
    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Inicializar partículas en órbitas aleatorias
    particles.current = Array.from({ length: count }, () => {
      const cx     = canvas.width  / 2;
      const cy     = canvas.height / 2;
      const orbitR = 80 + Math.random() * 220;
      const angle  = Math.random() * Math.PI * 2;

      return {
        x:      cx + Math.cos(angle) * orbitR,
        y:      cy + Math.sin(angle) * orbitR,
        vx:     0,
        vy:     0,
        radius: 0.5 + Math.random() * maxRadius,
        alpha:  0.2 + Math.random() * 0.6,
        speed:  0.002 + Math.random() * 0.004,
        angle,
        orbitR,
        orbitX: cx,
        orbitY: cy,
      };
    });

    // Loop de animación
    function draw() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        // Movimiento orbital
        p.angle += p.speed;
        const targetX = p.orbitX + Math.cos(p.angle) * p.orbitR;
        const targetY = p.orbitY + Math.sin(p.angle) * p.orbitR;

        // Lerp para movimiento suave
        p.x = lerp(p.x, targetX, 0.05);
        p.y = lerp(p.y, targetY, 0.05);

        // Pulso de alpha
        p.alpha = 0.2 + Math.abs(Math.sin(p.angle * 2)) * 0.6;

        // Dibujar partícula con glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = color;
        ctx.fillStyle   = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [count, color, maxRadius]);

  /**
   * Hace que todas las partículas converjan al centro.
   * Llamar justo antes de la animación del sobre.
   */
  function converge() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    particles.current.forEach((p) => {
      p.orbitR = lerp(p.orbitR, 0, 0.8);
      p.orbitX = cx;
      p.orbitY = cy;
    });
  }

  return { canvasRef, converge };
}
