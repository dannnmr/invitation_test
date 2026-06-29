'use client';

import { useEffect, useRef, useState } from 'react';

import { EnvelopeScreen }           from '@/components/sections/EnvelopeScreen';
import { HeroSection }              from '@/components/sections/HeroSection';
import { ParentsSection }           from '@/components/sections/ParentsSection';
import { CountdownSection }         from '@/components/sections/CountdownSection';
import { ItinerarySection }         from '@/components/sections/ItinerarySection';
import { LocationSection }          from '@/components/sections/LocationSection';
import { PassesSection }            from '@/components/sections/PassesSection';
import { DressCodeSection }         from '@/components/sections/DressCodeSection';
import { GiftRegistrySection }      from '@/components/sections/GiftRegistrySection';
import { MusicSection }             from '@/components/sections/MusicSection';
import { GallerySection }           from '@/components/sections/GallerySection';
import { SaveTheDateSection }       from '@/components/sections/SaveTheDateSection';
import { RSVPSection }              from '@/components/sections/RSVPSection';
import { FooterSection }            from '@/components/sections/FooterSection';
import { useEnvelopeSession }       from '@/hooks/useEnvelopeSession';
import { defaultInvitationConfig }  from '@/config/invitation.config';

export default function HomePage() {
  const [isRevealed, setIsRevealed] = useState(false);

  const { showEnvelope, markAsOpened } = useEnvelopeSession();
  const contentRef = useRef<HTMLDivElement>(null);

  // Use an effect to reveal immediately if envelope shouldn't be shown
  useEffect(() => {
    // Evitar que el navegador restaure el scroll anterior
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Forzar el scroll al inicio siempre que cargue la página
    window.scrollTo(0, 0);

    if (!showEnvelope) {
      setIsRevealed(true);
    }
  }, [showEnvelope]);

  useEffect(() => {
    if (showEnvelope) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    } else {
      document.body.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [showEnvelope]);

  function handleEnvelopeComplete() {
    markAsOpened();
    setIsRevealed(true);
  }

  return (
    <>
      {showEnvelope && (
        <EnvelopeScreen
          contentRef={contentRef}
          onComplete={handleEnvelopeComplete}
        />
      )}

      <div
        ref={contentRef}
        style={{
          opacity:    isRevealed || !showEnvelope ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      >
        {/* 01 — Hero */}
        <HeroSection
          config={defaultInvitationConfig}
          isRevealed={isRevealed}
        />

        {/* 02 — Bendición de Padres y Padrinos */}
        <ParentsSection config={defaultInvitationConfig} />

        {/* 03 — Cuenta Regresiva */}
        <CountdownSection config={defaultInvitationConfig} />

        {/* 04 — Itinerario */}
        <ItinerarySection config={defaultInvitationConfig} />

        {/* 05 — Ubicación */}
        <LocationSection config={defaultInvitationConfig} />

        {/* 06 — Pases de Acceso */}
        <PassesSection config={defaultInvitationConfig} />

        {/* 07 — Código de Vestimenta */}
        <DressCodeSection config={defaultInvitationConfig} />

        {/* 08 — Mesa de Regalos */}
        <GiftRegistrySection />

        {/* 09 — Sugerencias de Música */}
        <MusicSection />

        {/* 10 — Galería de Fotos Mural */}
        <GallerySection />

        {/* 11 — Save The Date */}
        <SaveTheDateSection />

        {/* 12 — RSVP (Confirmación) */}
        <RSVPSection config={defaultInvitationConfig} />

        {/* 13 — Footer */}
        <FooterSection />
      </div>
    </>
  );
}
