'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { gsap } from '@/lib/gsap';
import { PageLoader } from '@/components/core/PageLoader';
import { IntroBrooch } from '@/components/core/IntroBrooch';

// Importar secciones de contenido
import { Hero } from '@/components/sections/Hero';
import { Countdown } from '@/components/sections/Countdown';
import { Itinerary } from '@/components/sections/Itinerary';
import { DressCode } from '@/components/sections/DressCode';
import { Gifts } from '@/components/sections/Gifts';
import { GPSMap } from '@/components/sections/GPSMap';
import { RSVP } from '@/components/sections/RSVP';
import { MusicSuggestions } from '@/components/sections/MusicSuggestions';
import { Tickets } from '@/components/sections/Tickets';
import { LiveGallery } from '@/components/sections/LiveGallery';

import { defaultInvitationConfig } from '@/config/invitation.config';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // 1. Revisar si la invitación ya fue abierta en la sesión
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const opened = sessionStorage.getItem('brooch_opened') === 'true';
      if (opened) {
        setIsOpen(true);
        // Si ya está abierta, revelar el contenido directamente
        gsap.set(mainContentRef.current, {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          visibility: 'visible',
        });
      }
    }
  }, []);

  // 2. Animación de revelación (clip-path horizontal) al abrir el sobre
  const handleBroochOpen = () => {
    setIsOpen(true);

    const mainContent = mainContentRef.current;
    if (!mainContent) return;

    // Forzar la visibilidad del contenedor antes de la animación
    gsap.set(mainContent, { visibility: 'visible' });

    // Animación de clip-path: De línea horizontal en medio a rectángulo completo
    gsap.fromTo(mainContent,
      {
        opacity: 0,
        clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
      },
      {
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 2.2,
        ease: 'power3.inOut',
        delay: 0.2,
        onComplete: () => {
          // Limpiar la propiedad para evitar conflictos de renderizado o scroll
          gsap.set(mainContent, { clearProps: 'clipPath' });
        }
      }
    );
  };

  return (
    <>
      {/* 1. Loader de porcentaje inicial */}
      <PageLoader onComplete={() => setIsLoading(false)} />

      {/* 2. Broche / Sobre de entrada animado */}
      {!isLoading && (
        <IntroBrooch onOpen={handleBroochOpen} />
      )}

      {/* 3. Secciones de la Invitación (Contenido) */}
      <div
        ref={mainContentRef}
        id="main-content"
        style={{
          opacity: 0,
          visibility: 'hidden',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: 'var(--color-black)',
        }}
      >
        <Hero config={defaultInvitationConfig} />
        <Countdown config={defaultInvitationConfig} />
        <Itinerary />
        <DressCode config={defaultInvitationConfig} />
        <Gifts config={defaultInvitationConfig} />
        <GPSMap config={defaultInvitationConfig} />
        <RSVP config={defaultInvitationConfig} />
        <MusicSuggestions config={defaultInvitationConfig} />
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-gold)' }}>Cargando Pases...</div>}>
          <Tickets config={defaultInvitationConfig} />
        </Suspense>
        <LiveGallery config={defaultInvitationConfig} />
      </div>
    </>
  );
}
