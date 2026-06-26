'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { InvitationConfig } from '@/types/invitation';
import { defaultInvitationConfig } from '@/config/invitation.config';

interface TicketsProps {
  config?: InvitationConfig;
}

/**
 * Sección de Pases / Boletos.
 * Genera un código QR dinámico mediante qrcode.react utilizando parámetros de URL personalizados
 * o valores por defecto. Incorpora un diseño de ticket premium y animación de escaneo láser.
 */
export function Tickets({ config = defaultInvitationConfig }: TicketsProps) {
  // Leer parámetros de URL si están disponibles (Ej. ?n=Familia+Mendoza&p=4)
  const searchParams = useSearchParams();
  const guestName = searchParams.get('n') || 'Invitado de Honor';
  const passesCount = searchParams.get('p') || '2';

  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 35,
    opacity: 0,
    duration: 1.2,
  });

  // Generar URL única para validación QR
  const [qrValidationUrl, setQrValidationUrl] = useState(`https://invitation-system.com/verify?id=${config.id}`);

  useEffect(() => {
    setQrValidationUrl(`${window.location.origin}/verify?id=${config.id}&n=${encodeURIComponent(guestName)}`);
  }, [config.id, guestName]);

  return (
    <section
      style={{
        padding: '6rem 2rem',
        backgroundColor: 'var(--color-black-soft)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        ref={revealRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Acceso Personal
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontStyle: 'italic',
              color: 'var(--color-cream)',
              fontWeight: 300,
              marginTop: '0.5rem',
            }}
          >
            Tus Pases Digitales
          </h2>
        </div>

        {/* Estilo CSS para la línea de escaneo láser */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes laserScanAnim {
            0% { top: 0%; opacity: 0.8; }
            50% { top: 100%; opacity: 0.8; }
            100% { top: 0%; opacity: 0.8; }
          }
          .laser-line {
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--color-gold-light);
            box-shadow: 0 0 12px 2px var(--color-gold);
            animation: laserScanAnim 4s linear infinite;
            pointer-events: none;
            z-index: 5;
          }
        `}} />

        {/* Tarjeta del Ticket */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '360px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid rgba(197, 160, 89, 0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 2rem',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            overflow: 'hidden',
          }}
        >
          {/* Línea de escaneo láser dorada */}
          <div className="laser-line" aria-hidden="true" />

          {/* Encabezado del Ticket */}
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Invitación Exclusiva
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: 'var(--color-cream)',
                fontWeight: 300,
                marginTop: '0.25rem',
              }}
            >
              Sofía XV
            </h3>
          </div>

          {/* Separador discontinuo */}
          <div
            style={{
              width: '100%',
              height: '1px',
              borderTop: '1px dashed rgba(197, 160, 89, 0.25)',
            }}
            aria-hidden="true"
          />

          {/* Información del Invitado */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'center' }}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-gold-light)',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                }}
              >
                Pase para:
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-cream)',
                  fontWeight: 400,
                }}
              >
                {guestName}
              </p>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-gold-light)',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                }}
              >
                Cantidad de pases asignados:
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  color: 'var(--color-gold)',
                  fontWeight: 500,
                }}
              >
                {passesCount} {Number(passesCount) === 1 ? 'Pase' : 'Pases'}
              </p>
            </div>
          </div>

          {/* Separador discontinuo */}
          <div
            style={{
              width: '100%',
              height: '1px',
              borderTop: '1px dashed rgba(197, 160, 89, 0.25)',
            }}
            aria-hidden="true"
          />

          {/* Código QR Generado */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'white', // Fondo blanco para máxima legibilidad del lector QR
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <QRCodeSVG
              value={qrValidationUrl}
              size={140}
              bgColor="#FFFFFF"
              fgColor="#0A0005"
              level="M"
            />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--color-cream-muted)',
              opacity: 0.4,
              letterSpacing: '0.05em',
            }}
          >
            Presenta este código en la entrada del salón
          </span>
        </div>
      </div>
    </section>
  );
}
