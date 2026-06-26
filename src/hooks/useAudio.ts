'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAudioOptions {
  src: string;
  volume?: number;
  loop?: boolean;
  fadeDuration?: number;
}

interface UseAudioReturn {
  isPlaying: boolean;
  toggle: () => void;
  setVolume: (volume: number) => void;
}

/**
 * Controla el audio ambient de la invitación con fade in/out elegante.
 * Usa la Web Audio API directamente para evitar dependencia de Howler en SSR.
 */
export function useAudio({
  src,
  volume = 0.3,
  loop = true,
  fadeDuration = 1500,
}: UseAudioOptions): UseAudioReturn {
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const fadeRef    = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Solo en el cliente
    if (typeof window === 'undefined') return;

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src, loop]);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch(() => {
      // Autoplay bloqueado — el usuario debe interactuar primero
      console.warn('[useAudio] Autoplay bloqueado. Requiere interacción del usuario.');
    });

    const start     = Date.now();
    const startVol  = audio.volume;
    const targetVol = volume;

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    function step() {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / fadeDuration, 1);
      audio!.volume  = startVol + (targetVol - startVol) * progress;

      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step);
      }
    }

    fadeRef.current = requestAnimationFrame(step);
    setIsPlaying(true);
  }, [volume, fadeDuration]);

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const start    = Date.now();
    const startVol = audio.volume;

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    function step() {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / fadeDuration, 1);
      audio!.volume  = startVol * (1 - progress);

      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        audio!.pause();
      }
    }

    fadeRef.current = requestAnimationFrame(step);
    setIsPlaying(false);
  }, [fadeDuration]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [isPlaying, fadeIn, fadeOut]);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  }, []);

  return { isPlaying, toggle, setVolume };
}
