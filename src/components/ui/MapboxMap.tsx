'use client';

import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  coordinates: [number, number]; // [lng, lat]
  venueName:   string;
  zoom?:       number;
}

/**
 * Mapa Mapbox con estilo dark personalizado y pin dorado animado.
 *
 * Carga Mapbox GL JS de forma dinámica (dynamic import) para evitar
 * errores de SSR — Mapbox accede a window y navigator directamente.
 *
 * Flujo:
 * 1. Canvas negro mientras carga
 * 2. Mapa inicializa en coordenadas del venue
 * 3. Marker dorado aparece con animación de bounce
 * 4. Popup con nombre del venue al hacer clic en el marker
 *
 * Importante: requiere NEXT_PUBLIC_MAPBOX_TOKEN en .env.local
 */
export function MapboxMap({ coordinates, venueName, zoom = 15 }: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<unknown>(null);
  const initializingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current || initializingRef.current) return;

    initializingRef.current = true;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error('[MapboxMap] Falta NEXT_PUBLIC_MAPBOX_TOKEN en .env.local');
      return;
    }

    // Dynamic import — evita SSR errors
    import('mapbox-gl').then((mapboxgl) => {
      if (!containerRef.current) return;

      mapboxgl.default.accessToken = token;

      const map = new mapboxgl.default.Map({
        container:   containerRef.current,
        style:       'mapbox://styles/mapbox/dark-v11',
        center:      coordinates,
        zoom:        zoom - 2,    // Inicia alejado para el fly-in
        pitch:       40,
        bearing:     -10,
        antialias:   true,
        interactive: true,
      });

      mapRef.current = map;

      map.on('load', () => {
        // Personalizar colores del mapa base
        try {
          // Fondo más oscuro
          if (map.getLayer('background')) {
            map.setPaintProperty('background', 'background-color', '#0A0005');
          }
          // Agua más oscura
          if (map.getLayer('water')) {
            map.setPaintProperty('water', 'fill-color', '#060010');
          }
          // Parques
          if (map.getLayer('landuse')) {
            map.setPaintProperty('landuse', 'fill-color', '#0D0A10');
          }
        } catch (_) {
          // Capas pueden no existir en todos los tiles
        }

        // Fly-in al venue
        map.flyTo({
          center:   coordinates,
          zoom,
          pitch:    50,
          bearing:  -5,
          duration: 2000,
          essential: true,
        });

        // Crear marker dorado personalizado
        const markerEl = document.createElement('div');
        markerEl.setAttribute('role', 'img');
        markerEl.setAttribute('aria-label', `Ubicación de ${venueName}`);
        Object.assign(markerEl.style, {
          width:           '32px',
          height:          '42px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 42'%3E%3Cpath d='M16 0C7.163 0 0 7.163 0 16c0 10 16 26 16 26S32 26 32 16C32 7.163 24.837 0 16 0z' fill='%23F472B6'/%3E%3Ccircle cx='16' cy='16' r='6' fill='%23FFFFFF'/%3E%3C/svg%3E")`,
          backgroundSize:  'contain',
          backgroundRepeat:'no-repeat',
          cursor:          'pointer',
          filter:          'drop-shadow(0 4px 12px rgba(244,114,182,0.5))',
          animation:       'markerBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
          animationDelay:  '2s',
        });

        // Inyectar keyframe del bounce del marker
        if (!document.getElementById('marker-style')) {
          const style = document.createElement('style');
          style.id = 'marker-style';
          style.textContent = `
            @keyframes markerBounce {
              from { transform: translateY(-20px); opacity: 0; }
              to   { transform: translateY(0);     opacity: 1; }
            }
          `;
          document.head.appendChild(style);
        }

        // Popup con nombre del venue
        const popup = new mapboxgl.default.Popup({
          offset:    [0, -42],
          className: 'xv-map-popup',
        }).setHTML(`
          <div style="
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            color: #F472B6;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 6px 10px;
            background: #FFFFFF;
            border: 0.5px solid rgba(244,114,182,0.4);
            border-radius: 4px;
            white-space: nowrap;
          ">${venueName}</div>
        `);

        new mapboxgl.default.Marker({ element: markerEl })
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map);

        // Mostrar popup automáticamente después del fly-in
        setTimeout(() => popup.addTo(map), 2500);
      });
    });

    // Inyectar CSS base de Mapbox solo una vez
    if (!document.getElementById('mapbox-css')) {
      const link = document.createElement('link');
      link.id   = 'mapbox-css';
      link.rel  = 'stylesheet';
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css';
      document.head.appendChild(link);
    }

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, [coordinates, venueName, zoom]);

  return (
    <div
      ref={containerRef}
      style={{
        width:        '100%',
        height:       '100%',
        minHeight:    '400px',
        borderRadius: '4px',
        overflow:     'hidden',
        backgroundColor: '#FAFAFA', // Fondo mientras carga
      }}
    />
  );
}
