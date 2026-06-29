'use client';

import { useCallback, useRef, useState } from 'react';
import { gsap }         from '@/lib/gsap';
import { submitRSVP }   from '@/lib/rsvp';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import type { RSVPFormData, RSVPFormState } from '@/types/invitation';

interface UseRSVPFormOptions {
  invitationId: string;
  onSuccess?:   (guestName: string) => void;
}

interface UseRSVPFormReturn {
  formData:     RSVPFormData;
  formState:    RSVPFormState;
  errorMessage: string;
  submitBtnRef: React.RefObject<HTMLButtonElement | null>;
  handleChange: (field: keyof RSVPFormData, value: string | number) => void;
  handleSubmit: () => Promise<void>;
}

/**
 * Lógica completa del formulario RSVP.
 * Maneja estado, validación, envío a Supabase,
 * y dispara la animación de partículas al confirmar.
 */
export function useRSVPForm({
  invitationId,
  onSuccess,
}: UseRSVPFormOptions): UseRSVPFormReturn {
  const [formData, setFormData] = useState<RSVPFormData>({
    guestName:           '',
    guestCount:          1,
    dietaryRestrictions: '',
  });

  const [formState,    setFormState]    = useState<RSVPFormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleChange = useCallback(
    (field: keyof RSVPFormData, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errorMessage) setErrorMessage('');
    },
    [errorMessage]
  );

  const fireParticles = useCallback(() => {
    const btn = submitBtnRef.current;
    if (!btn) return;

    const rect    = btn.getBoundingClientRect();
    const originX = rect.left + rect.width  / 2;
    const originY = rect.top  + rect.height / 2;

    // Crear 40 partículas en el DOM temporalmente
    const particles = Array.from({ length: 40 }, () => {
      const el = document.createElement('div');
      const size = 4 + Math.random() * 6;
      Object.assign(el.style, {
        position:        'fixed',
        width:           `${size}px`,
        height:          `${size}px`,
        borderRadius:    '50%',
        backgroundColor: Math.random() > 0.5 ? '#F472B6' : '#FBCFE8',
        pointerEvents:   'none',
        zIndex:          9999,
        left:            `${originX}px`,
        top:             `${originY}px`,
      });
      document.body.appendChild(el);
      return el;
    });

    // Animar hacia afuera con GSAP
    particles.forEach((el) => {
      const angle    = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 120;

      gsap.to(el, {
        x:        Math.cos(angle) * distance,
        y:        Math.sin(angle) * distance - 40,
        opacity:  0,
        scale:    0,
        duration: 0.8 + Math.random() * 0.4,
        ease:     'power2.out',
        onComplete: () => el.remove(),
      });
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    // Validación
    if (!formData.guestName.trim()) {
      setErrorMessage('Por favor ingresa tu nombre.');
      return;
    }

    setFormState('submitting');
    setErrorMessage('');

    try {
      await submitRSVP({
        invitationId,
        guestName:           formData.guestName.trim(),
        guestCount:          formData.guestCount,
        attending:           true,
        dietaryRestrictions: formData.dietaryRestrictions.trim() || undefined,
      });

      // Sincronizar con Google Sheets en segundo plano
      submitToGoogleSheets('guest', { nombre: formData.guestName.trim() })
        .catch(err => console.error('[Google Sheets Sync] Error:', err));

      fireParticles();
      setFormState('success');
      onSuccess?.(formData.guestName.trim());

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido.';
      setErrorMessage(message);
      setFormState('error');

      // Shake del botón en error
      if (submitBtnRef.current) {
        gsap.fromTo(
          submitBtnRef.current,
          { x: -6 },
          { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
        );
      }
    }
  }, [formData, invitationId, fireParticles, onSuccess]);

  return {
    formData,
    formState,
    errorMessage,
    submitBtnRef,
    handleChange,
    handleSubmit,
  };
}
