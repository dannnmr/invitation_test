'use client';

import { useState, useEffect } from 'react';

const SESSION_KEY = 'xv-envelope-opened';

/**
 * Controla si el sobre ya fue abierto en esta sesión.
 * - Primera visita: showEnvelope = true
 * - Recarga o navegación posterior: showEnvelope = false
 *
 * Usa sessionStorage (se limpia al cerrar el tab).
 */
export function useEnvelopeSession() {
  const [showEnvelope, setShowEnvelope] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(SESSION_KEY) === 'true';
    setShowEnvelope(!alreadyOpened);
  }, []);

  function markAsOpened() {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setShowEnvelope(false);
  }

  return { showEnvelope, markAsOpened };
}
