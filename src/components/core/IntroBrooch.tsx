'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface IntroBroochProps {
  onOpen?: () => void;
}

/**
 * Pantalla de entrada con el broche animado.
 *
 * Flujo:
 * 1. Pantalla negra total.
 * 2. Partículas doradas en Canvas convergen hacia el centro.
 * 3. Se revela el broche (SVG dividido en mitad izquierda y derecha).
 * 4. Clic para abrir: reproduce sonido de apertura y las mitades se separan lateralmente.
 * 5. Se oculta el overlay y se activa el callback onOpen para revelar el contenido inferior.
 * 6. Guarda el estado en sessionStorage para saltarse esta intro al recargar.
 */
export function IntroBrooch({ onOpen }: IntroBroochProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const broochLeft   = useRef<SVGSVGElement>(null);
  const broochRight  = useRef<SVGSVGElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const clickHintRef = useRef<HTMLButtonElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    // Verificar si ya se abrió en esta sesión
    if (typeof window !== 'undefined') {
      const opened = sessionStorage.getItem('brooch_opened') === 'true';
      if (opened) {
        setIsOpen(true);
        onOpen?.();
      }
      setHasCheckedSession(true);
    }
  }, [onOpen]);

  useEffect(() => {
    if (!hasCheckedSession || isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar dimensiones del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Sistema de partículas doradas
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      angle: number;
      distance: number;
      speed: number;
      size: number;
      alpha: number;
      convergeFactor: number;

      constructor(w: number, h: number) {
        this.targetX = w / 2;
        this.targetY = h / 2;
        this.angle = Math.random() * Math.PI * 2;
        // Distancia inicial aleatoria
        this.distance = Math.random() * Math.max(w, h) * 0.6 + 200;
        this.speed = Math.random() * 0.015 + 0.005;
        this.size = Math.random() * 2.5 + 0.8;
        this.alpha = Math.random() * 0.6 + 0.3;
        this.convergeFactor = Math.random() * 0.02 + 0.01;
        
        // Coordenadas iniciales
        this.x = this.targetX + Math.cos(this.angle) * this.distance;
        this.y = this.targetY + Math.sin(this.angle) * this.distance;
      }

      update(converge: boolean, width: number, height: number) {
        this.targetX = width / 2;
        this.targetY = height / 2;

        if (converge) {
          // Convergen gradualmente al centro
          this.distance -= this.distance * this.convergeFactor * 2.5;
          if (this.distance < 2) this.distance = 2;
        } else {
          // Órbita normal con leve atracción hacia el centro
          this.distance -= 0.2;
          if (this.distance < 60) this.distance = 150 + Math.random() * 100;
        }

        this.angle += this.speed;
        this.x = this.targetX + Math.cos(this.angle) * this.distance;
        this.y = this.targetY + Math.sin(this.angle) * this.distance;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = '#D4B87A';
        c.shadowBlur = 8;
        c.shadowColor = '#C5A059';
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let convergeActive = false;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(convergeActive, canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Timeline de GSAP para la secuencia de entrada del broche
    const entryTl = gsap.timeline({
      onStart: () => {
        // Iniciar convergencia de partículas al final de la entrada
        gsap.delayedCall(1, () => {
          convergeActive = true;
        });
      }
    });

    // 1. Ocultar broche e indicaciones inicialmente
    gsap.set([broochLeft.current, broochRight.current], { scale: 0.7, opacity: 0 });
    gsap.set(titleRef.current, { opacity: 0, y: -20 });
    gsap.set(clickHintRef.current, { opacity: 0, scale: 0.9 });

    // 2. Revelar broche y títulos en stagers
    entryTl.to(titleRef.current, { opacity: 1, y: 0, duration: 1.5, delay: 0.5 })
           .to([broochLeft.current, broochRight.current], {
             scale: 1,
             opacity: 1,
             duration: 1.8,
             stagger: 0.1,
             ease: 'power3.out'
           }, '-=0.8')
           .to(clickHintRef.current, {
             opacity: 1,
             scale: 1,
             duration: 1.2,
             ease: 'expo.out'
           }, '-=0.5');

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      entryTl.kill();
    };
  }, [hasCheckedSession, isOpen]);

  const handleOpen = () => {
    if (isOpen) return;

    // Reproducir sonido de apertura
    const sound = new Audio('/audio/open.mp3');
    sound.volume = 0.4;
    sound.play().catch(() => {
      console.warn('[IntroBrooch] Audio bloqueado en interacción.');
    });

    // Animación de separación del broche y fade-out de la intro
    const exitTl = gsap.timeline({
      onComplete: () => {
        setIsOpen(true);
        sessionStorage.setItem('brooch_opened', 'true');
        onOpen?.();
      }
    });

    exitTl.to(clickHintRef.current, { opacity: 0, y: 20, duration: 0.5 })
          .to(titleRef.current, { opacity: 0, y: -20, duration: 0.5 }, '<')
          .to(broochLeft.current, { x: -200, opacity: 0, duration: 1.2, ease: 'power3.in' }, '-=0.2')
          .to(broochRight.current, { x: 200, opacity: 0, duration: 1.2, ease: 'power3.in' }, '<')
          .to(canvasRef.current, { opacity: 0, duration: 1 }, '-=0.8')
          .to(containerRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 1,
            ease: 'power2.inOut'
          }, '-=0.5');
  };

  if (!hasCheckedSession || isOpen) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-black)',
        zIndex: 'calc(var(--z-loader) - 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Canvas para partículas doradas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Título superior */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute',
          top: '15%',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Te invitamos a celebrar
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: 'var(--color-cream)',
            marginTop: '0.5rem',
            letterSpacing: '0.05em',
          }}
        >
          Mis XV Años
        </h2>
      </div>

      {/* Broche SVG Central */}
      <div
        style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Mitad izquierda del broche */}
        <svg
          ref={broochLeft}
          width="120"
          height="240"
          viewBox="0 0 120 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transformOrigin: 'right center' }}
        >
          <path
            d="M120 20C90 20 50 60 50 120C50 180 90 220 120 220V240C70 240 20 190 20 120C20 50 70 0 120 0V20Z"
            fill="url(#goldGradLeft)"
          />
          <circle cx="90" cy="120" r="10" fill="var(--color-gold)" />
          <path d="M120 70C100 70 80 90 80 120C80 150 100 170 120 170V190C90 190 60 160 60 120C60 80 90 50 120 50V70Z" fill="url(#goldGradLeft)" opacity="0.6"/>
          <defs>
            <linearGradient id="goldGradLeft" x1="20" y1="120" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--color-gold-dark)" />
              <stop offset="50%" stopColor="var(--color-gold-light)" />
              <stop offset="100%" stopColor="var(--color-gold)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Mitad derecha del broche */}
        <svg
          ref={broochRight}
          width="120"
          height="240"
          viewBox="0 0 120 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transformOrigin: 'left center' }}
        >
          <path
            d="M0 20C30 20 70 60 70 120C70 180 30 220 0 220V240C50 240 100 190 100 120C100 50 50 0 0 0V20Z"
            fill="url(#goldGradRight)"
          />
          <circle cx="30" cy="120" r="10" fill="var(--color-gold)" />
          <path d="M0 70C20 70 40 90 40 120C40 150 20 170 0 170V190C30 190 60 160 60 120C60 80 30 50 0 50V70Z" fill="url(#goldGradRight)" opacity="0.6"/>
          <defs>
            <linearGradient id="goldGradRight" x1="0" y1="120" x2="100" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--color-gold)" />
              <stop offset="50%" stopColor="var(--color-gold-light)" />
              <stop offset="100%" stopColor="var(--color-gold-dark)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Botón táctil / clic para abrir */}
      <button
        ref={clickHintRef}
        onClick={handleOpen}
        aria-label="Abrir invitación"
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          backgroundColor: 'transparent',
          border: '1px solid var(--color-gold)',
          color: 'var(--color-gold)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
      >
        Toque para abrir
      </button>
    </div>
  );
}
