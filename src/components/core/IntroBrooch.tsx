'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { SplitTextReveal } from '@/components/core/SplitTextReveal';

interface IntroBroochProps {
  onOpen?: () => void;
}

/**
 * Pantalla de entrada con sobre de lujo y broche interactivo.
 * 
 * Flujo:
 * 1. Muestra el sobre cerrado completo como fondo inicial.
 * 2. El broche central y los textos con SplitTextReveal entran con rebote inercial.
 * 3. Al hacer clic en el broche:
 *    - Se reproduce el sonido de sobre.
 *    - Se detona un estallido masivo de partículas doradas en Canvas.
 *    - El broche escala y se desvanece.
 *    - El sobre completo se oculta, y las mitades izquierda/derecha se abren deslizándose hacia los lados.
 *    - Se activa el callback onOpen para iniciar el clip-path de revelado de la invitación inferior.
 */
export function IntroBrooch({ onOpen }: IntroBroochProps) {
  const containerRef     = useRef<HTMLDivElement>(null);
  const canvasRef        = useRef<HTMLCanvasElement>(null);
  const sobreCompletoRef = useRef<HTMLDivElement>(null);
  const leftFlapRef      = useRef<HTMLDivElement>(null);
  const rightFlapRef     = useRef<HTMLDivElement>(null);
  const broochRef        = useRef<HTMLButtonElement>(null);
  const titleRef         = useRef<HTMLDivElement>(null);
  
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

    // Sistema de partículas doradas interactivo en 2D
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      gravity: number;
      drag: number;
      decay: number;
      active: boolean;

      constructor(w: number, h: number, isBurst: boolean = false) {
        this.x = w / 2;
        this.y = h / 2;
        this.active = true;

        if (isBurst) {
          // Explosión radial del broche al abrirse
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 4;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed - 2.5; // Leve impulso ascendente
          this.size = Math.random() * 4.5 + 1.8;
          this.alpha = 1.0;
          this.gravity = 0.16;
          this.drag = 0.97;
          this.decay = Math.random() * 0.016 + 0.008;
        } else {
          // Destellos lentos gravitando alrededor del broche cerrado
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 90 + 20;
          this.x = w / 2 + Math.cos(angle) * radius;
          this.y = h / 2 + Math.sin(angle) * radius;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3 - 0.15;
          this.size = Math.random() * 2 + 0.6;
          this.alpha = Math.random() * 0.6 + 0.15;
          this.gravity = 0;
          this.drag = 1.0;
          this.decay = Math.random() * 0.006 + 0.002;
        }

        const colors = ['#D4B87A', '#C5A059', '#F0E8D0', '#FAFAF8', '#8E9F93'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.alpha -= this.decay;
        if (this.alpha <= 0) {
          this.active = false;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.shadowBlur = 8;
        c.shadowColor = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    let particles: Particle[] = [];
    const ambientCount = 35;

    // Generar partículas ambientales iniciales
    for (let i = 0; i < ambientCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height, false));
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Añadir destellos ambientales si no ha sido abierto
      if (particles.filter(p => !p.gravity).length < ambientCount && !sobreCompletoRef.current?.style.opacity) {
        particles.push(new Particle(canvas.width, canvas.height, false));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.active) {
          p.draw(ctx);
        } else {
          particles.splice(i, 1);
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Animación de entrada inicial del broche
    gsap.set(sobreCompletoRef.current, { opacity: 1 });
    gsap.set(broochRef.current, { scale: 0, opacity: 0, rotate: -35 });
    gsap.set(titleRef.current, { opacity: 0, y: -25 });

    const introTl = gsap.timeline({ delay: 0.2 });
    introTl.to(broochRef.current, {
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration: 1.6,
      ease: 'elastic.out(1, 0.75)',
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
    }, '-=0.8');

    // Pulsación suave continua para incentivar el click
    gsap.to(broochRef.current, {
      scale: 1.04,
      duration: 2.0,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: 1.8,
    });

    // Añadir trigger de explosión al elemento DOM
    (canvas as any).triggerBurst = () => {
      for (let i = 0; i < 90; i++) {
        particles.push(new Particle(canvas.width, canvas.height, true));
      }
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      introTl.kill();
    };
  }, [hasCheckedSession, isOpen]);

  const handleOpen = () => {
    if (isOpen) return;

    // Matar animaciones previas del broche
    gsap.killTweensOf(broochRef.current);

    // Explosión de partículas en canvas
    const canvas = canvasRef.current;
    if (canvas && (canvas as any).triggerBurst) {
      (canvas as any).triggerBurst();
    }

    // Sonido sutil de apertura
    const sound = new Audio('/audio/open.mp3');
    sound.volume = 0.4;
    sound.play().catch(() => {
      console.warn('[IntroBrooch] Audio bloqueado por el navegador.');
    });

    // Timeline GSAP coordinado para abrir el sobre físico
    const exitTl = gsap.timeline({
      onComplete: () => {
        setIsOpen(true);
        sessionStorage.setItem('brooch_opened', 'true');
        onOpen?.();
      }
    });

    // 1. Ocultar el sobre completo estático de inmediato para revelar las capas traseras
    exitTl.to(sobreCompletoRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: 'none',
    })
    // 2. Animar el broche central (escala gigante, rotación libre y fade out)
    .to(broochRef.current, {
      scale: 1.7,
      opacity: 0,
      rotate: 12,
      duration: 0.8,
      ease: 'power2.out',
    }, '<')
    // 3. Desvanecer título
    .to(titleRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power3.in',
    }, '<')
    // 4. Desplazamiento lateral de las dos mitades del sobre
    .to(leftFlapRef.current, {
      xPercent: -105,
      duration: 1.8,
      ease: 'power3.inOut',
    }, '-=0.3')
    .to(rightFlapRef.current, {
      xPercent: 105,
      duration: 1.8,
      ease: 'power3.inOut',
    }, '<')
    // 5. Fade out del canvas y contenedor
    .to(canvasRef.current, {
      opacity: 0,
      duration: 0.8,
    }, '-=1.0')
    .to(containerRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.8,
      ease: 'power2.inOut',
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
        zIndex: 9999, // Supera todos los elementos
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 1. Fondo completo del Sobre Cerrado inicial */}
      <div
        ref={sobreCompletoRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/sobre_completo_textura.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0,
          transform: 'scale(1.15)', // Escalado adaptado
        }}
      />

      {/* 2. Capa Lateral Izquierda (Se desliza a la izquierda) */}
      <div
        ref={leftFlapRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/sobre_izquierdo_textura.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          transform: 'scale(1.15)',
        }}
      />

      {/* 3. Capa Lateral Derecha (Se desliza a la derecha) */}
      <div
        ref={rightFlapRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/sobre_derecho_textura2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          transform: 'scale(1.15)',
        }}
      />

      {/* Canvas para explosión de destellos */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Textos Informativos de Invitación */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute',
          top: '15%',
          textAlign: 'center',
          zIndex: 15,
        }}
      >
        <SplitTextReveal
          text="Te invitamos a celebrar"
          as="span"
          type="words"
          scrollTrigger={false}
          delay={0.6}
          duration={1.0}
          stagger={0.06}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
          }}
        />
        <SplitTextReveal
          text="Mis XV Años"
          as="h2"
          type="chars"
          scrollTrigger={false}
          delay={0.9}
          duration={1.2}
          stagger={0.04}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.2rem',
            color: 'var(--color-cream)',
            marginTop: '0.5rem',
            letterSpacing: '0.05em',
          }}
        />
      </div>

      {/* Broche / Wax Seal Clickable Central */}
      <button
        ref={broochRef}
        onClick={handleOpen}
        aria-label="Abrir invitación"
        data-cursor-hover
        style={{
          position: 'relative',
          zIndex: 20,
          width: 'min(380px, 75vw)',
          height: 'min(380px, 75vw)',
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          backgroundImage: 'url(/images/logo_brochev2.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: 'none', // Delega al CustomCursor
          outline: 'none',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
