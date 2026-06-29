'use client';

import { useEffect, useRef } from 'react';

/**
 * Detecta cambios en el valor y dispara la animación de volteo CSS.
 * Retorna refs para las cuatro capas del flip:
 * - topCurrentRef:  mitad superior con el número actual
 * - bottomCurrentRef: mitad inferior con el número actual
 * - topNextRef:     mitad superior con el número nuevo (oculta al inicio)
 * - bottomNextRef:  mitad inferior con el número nuevo (visible al final)
 *
 * Técnica:
 * Al cambiar value:
 * 1. topNextRef muestra el nuevo número
 * 2. topCurrentRef anima rotateX de 0 a -90° (dobla hacia adelante)
 * 3. Al llegar a -90°, topCurrentRef se oculta y topNextRef completa
 *    rotateX de 90° a 0° (sube desde atrás)
 * 4. bottomCurrentRef actualiza al nuevo número
 */
export function useFlipAnimation(value: number) {
  const topCurrentRef    = useRef<HTMLDivElement>(null);
  const bottomCurrentRef = useRef<HTMLDivElement>(null);
  const topNextRef       = useRef<HTMLDivElement>(null);
  const bottomNextRef    = useRef<HTMLDivElement>(null);

  const prevValueRef = useRef<number>(value);
  const isFlipping   = useRef<boolean>(false);

  useEffect(() => {
    if (prevValueRef.current === value) return;
    if (isFlipping.current) return;

    const topCurrent    = topCurrentRef.current;
    const topNext       = topNextRef.current;
    const bottomCurrent = bottomCurrentRef.current;

    if (!topCurrent || !topNext || !bottomCurrent) return;

    isFlipping.current = true;

    // Actualizar el número "nuevo" en la capa oculta
    const nextStr = String(value).padStart(2, '0');
    topNext.textContent       = nextStr;

    // Fase 1: doblar la mitad superior actual hacia adelante
    topCurrent.style.transition = 'transform 0.25s ease-in';
    topCurrent.style.transform  = 'rotateX(-90deg)';

    const onPhase1End = () => {
      topCurrent.removeEventListener('transitionend', onPhase1End);

      // Actualizar el número actual (invisible mientras está volteado)
      topCurrent.textContent      = nextStr;
      topCurrent.style.transition = 'none';
      topCurrent.style.transform  = 'rotateX(0deg)';
      bottomCurrent.textContent   = nextStr;

      // Fase 2: el nuevo número baja desde atrás
      topNext.style.transition = 'none';
      topNext.style.transform  = 'rotateX(90deg)';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          topNext.style.transition = 'transform 0.25s ease-out';
          topNext.style.transform  = 'rotateX(0deg)';

          const onPhase2End = () => {
            topNext.removeEventListener('transitionend', onPhase2End);
            topNext.style.transition = 'none';
            topNext.style.transform  = 'rotateX(90deg)';
            isFlipping.current = false;
          };

          topNext.addEventListener('transitionend', onPhase2End, { once: true });
        });
      });
    };

    topCurrent.addEventListener('transitionend', onPhase1End, { once: true });
    prevValueRef.current = value;

  }, [value]);

  return { topCurrentRef, bottomCurrentRef, topNextRef, bottomNextRef };
}
