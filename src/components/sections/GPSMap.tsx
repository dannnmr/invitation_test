'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCursorMagnet } from '@/hooks/useCursorMagnet';
import type { InvitationConfig } from '@/types/invitation';
import { SplitTextReveal } from '@/components/core/SplitTextReveal';
import { defaultInvitationConfig } from '@/config/invitation.config';

// Importar Mapbox en el cliente únicamente para evitar fallos de SSR
import 'mapbox-gl/dist/mapbox-gl.css';

interface GPSMapProps {
  config?: InvitationConfig;
}

/**
 * Sección de Mapa GPS.
 * Embebe Mapbox GL JS con tema dark-gold y animación de entrada inercial sobre el Pin de localización.
 * Si no hay Token configurado en las variables de entorno, muestra una vista de fallback de alta calidad.
 */
export function GPSMap({ config = defaultInvitationConfig }: GPSMapProps) {
  const { event } = config;
  const { venue } = event;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const buttonRef = useCursorMagnet<HTMLAnchorElement>(0.3);

  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const isValid = !!token && token !== 'your_mapbox_token' && token.trim() !== '';
    setMapboxToken(isValid ? token : null);
  }, []);

  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 35,
    opacity: 0,
    duration: 1.2,
  });

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current || mapRef.current) return;

    let mapInstance: any = null;

    // Cargar dinámicamente mapbox-gl para prevenir problemas de compilación en SSR
    import('mapbox-gl').then((mapboxglModule) => {
      const mapboxgl = mapboxglModule.default;
      mapboxgl.accessToken = mapboxToken;

      try {
        mapInstance = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/navigation-night-v1', // Estilo oscuro premium de navegación
          center: venue.coordinates,
          zoom: 14,
          scrollZoom: false, // Desactivar zoom al hacer scroll para no entorpecer la navegación
        });

        mapRef.current = mapInstance;

        // Añadir control de navegación
        mapInstance.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

        // Elemento custom para el marcador
        const el = document.createElement('div');
        el.className = 'mapbox-marker-pin';
        el.style.width = '36px';
        el.style.height = '36px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = 'var(--color-black)';
        el.style.border = '2px solid var(--color-gold)';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.boxShadow = '0 0 15px var(--color-gold)';
        el.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-gold)">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
          </svg>
        `;

        new mapboxgl.Marker(el)
          .setLngLat(venue.coordinates)
          .addTo(mapInstance);

        // Animación de Zoom y Fly-To inercial cuando el usuario hace scroll
        import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: mapContainerRef.current,
              start: 'top 80%',
              once: true,
              onEnter: () => {
                mapInstance.flyTo({
                  zoom: 15.5,
                  speed: 0.8,
                  curve: 1.2,
                  essential: true
                });
                // Animar la vibración del marcador
                gsap.fromTo(el, 
                  { scale: 0.5, opacity: 0 },
                  { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
                );
              }
            }
          });
        });

      } catch (err) {
        console.error('Error inicializando Mapbox:', err);
        setMapError(true);
      }
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
      mapRef.current = null;
    };
  }, [mapboxToken, venue.coordinates]);

  // Si no hay token de Mapbox o falló la carga, se usa un mockup interactivo elegante.
  const showFallback = !mapboxToken || mapError;

  return (
    <section
      style={{
        padding: '6rem 2rem',
        backgroundColor: 'var(--color-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        ref={revealRef}
        style={{
          maxWidth: '600px',
          marginBottom: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <SplitTextReveal
          text="Ubicación"
          as="span"
          type="words"
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
          text={venue.name}
          as="h2"
          type="chars"
          stagger={0.04}
          rotate={5}
          skewY={3}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontStyle: 'italic',
            color: 'var(--color-cream)',
            fontWeight: 300,
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--color-cream-muted)',
            fontStyle: 'italic',
            maxWidth: '35ch',
            lineHeight: 1.6,
          }}
        >
          {venue.address}
        </p>
      </div>

      {/* Contenedor del Mapa */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: '450px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid rgba(197, 160, 89, 0.2)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {showFallback ? (
          /* Mockup de Mapa Vectorial Elegante */
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(circle at center, rgba(30, 20, 40, 0.8) 0%, rgba(10, 0, 5, 0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '2rem',
            }}
          >
            {/* Retícula simulando mapa */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.08,
                backgroundImage: `
                  linear-gradient(to right, var(--color-gold) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--color-gold) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
              aria-hidden="true"
            />

            {/* Pin de Mapa Animado Mock */}
            <div
              ref={pinRef}
              className="pulse-glow-marker"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 160, 89, 0.1)',
                border: '1px dashed var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-gold)">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
              </svg>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-cream-muted)',
                opacity: 0.6,
                zIndex: 2,
                maxWidth: '40ch',
                lineHeight: 1.5,
              }}
            >
              Para ver el mapa interactivo en vivo, configura la clave de Mapbox en tu entorno local.
            </p>

            <a
              ref={buttonRef}
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.8rem',
                border: '1px solid var(--color-gold)',
                backgroundColor: 'transparent',
                color: 'var(--color-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
            >
              Abrir en Google Maps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3Zm-2 16H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7Z"/>
              </svg>
            </a>
          </div>
        ) : (
          /* Contenedor oficial para Mapbox GL JS */
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </section>
  );
}
