'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Hook para añadir un efecto de inclinación 3D (tilt) interactivo
 * y reflejo de luz (glare) a una tarjeta al pasar el cursor.
 * 
 * Configura las propiedades CSS `--mouse-x`, `--mouse-y` y `--glare-opacity`
 * en el elemento para que la interfaz pueda pintar el reflejo con gradientes.
 */
export function useCardTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Inicializar estilos 3D
    gsap.set(el, {
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    });

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = x / rect.width;
      const py = y / rect.height;

      // Calcular ángulos de rotación (máximo 15 grados)
      const rotateY = (px - 0.5) * 30; // -15 a 15 deg
      const rotateX = (0.5 - py) * 30; // -15 a 15 deg

      gsap.to(el, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Actualizar variables de luz reflejada (glare)
      el.style.setProperty('--mouse-x', `${px * 100}%`);
      el.style.setProperty('--mouse-y', `${py * 100}%`);
      el.style.setProperty('--glare-opacity', '0.25');
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      // Suavizar desaparición del reflejo
      gsap.to(el, {
        '--glare-opacity': 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return ref;
}
