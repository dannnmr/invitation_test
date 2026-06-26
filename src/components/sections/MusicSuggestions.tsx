'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCursorMagnet } from '@/hooks/useCursorMagnet';
import type { InvitationConfig } from '@/types/invitation';
import { defaultInvitationConfig } from '@/config/invitation.config';

interface MusicSuggestionsProps {
  config?: InvitationConfig;
}

interface SongSuggestion {
  id: string;
  guest_name: string;
  song_title: string;
  song_artist: string;
}

export function MusicSuggestions({ config = defaultInvitationConfig }: MusicSuggestionsProps) {
  const buttonRef = useCursorMagnet<HTMLButtonElement>(0.35);

  const [guestName, setGuestName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');

  const [suggestions, setSuggestions] = useState<SongSuggestion[]>([
    { id: '1', guest_name: 'Ana García', song_title: 'Perfect', song_artist: 'Ed Sheeran' },
    { id: '2', guest_name: 'Carlos Mendoza', song_title: 'Dancing Queen', song_artist: 'ABBA' },
    { id: '3', guest_name: 'Sofía (Quinceañera)', song_title: 'Vals de las Flores', song_artist: 'Tchaikovsky' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 35,
    opacity: 0,
    duration: 1.2,
  });

  // Intentar cargar canciones reales desde Supabase si existe
  useEffect(() => {
    let active = true;
    async function fetchSongs() {
      try {
        const { data, error } = await supabase
          .from('rsvps')
          .select('id, guest_name, song_suggestion')
          .not('song_suggestion', 'is', null)
          .limit(8);

        if (error) throw error;
        
        if (data && active) {
          const parsedSongs: SongSuggestion[] = data.map((item: any) => {
            const parts = item.song_suggestion.split(' - ');
            return {
              id: item.id,
              guest_name: item.guest_name,
              song_title: parts[0] || 'Canción',
              song_artist: parts[1] || 'Artista',
            };
          });
          // Unir con las semillas por defecto
          setSuggestions((prev) => {
            const ids = new Set(parsedSongs.map(s => s.id));
            return [...parsedSongs, ...prev.filter(s => !ids.has(s.id))];
          });
        }
      } catch (err) {
        console.warn('[MusicSuggestions Fetch] No se pudieron cargar canciones reales de Supabase. Se utilizarán locales.', err);
      }
    }
    fetchSongs();
    return () => { active = false; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !songTitle.trim() || !songArtist.trim()) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const suggestionString = `${songTitle.trim()} - ${songArtist.trim()}`;

    try {
      // Intentar guardar en Supabase rsvps como sugerencia (o una tabla songs si estuviera creada)
      const { error } = await supabase
        .from('rsvps')
        .insert([
          {
            invitation_id: config.id,
            guest_name: guestName,
            guest_count: 0, // 0 indica que es una sugerencia suelta
            attending: true,
            song_suggestion: suggestionString,
          }
        ]);

      if (error) throw error;

      // Actualizar estado local
      const newSong: SongSuggestion = {
        id: Math.random().toString(),
        guest_name: guestName,
        song_title: songTitle,
        song_artist: songArtist
      };
      setSuggestions(prev => [newSong, ...prev]);
      setSubmitSuccess(true);
      setSongTitle('');
      setSongArtist('');
    } catch (err) {
      console.warn('[Supabase Music] Error al subir canción. Simulando localmente.', err);
      // Simular local
      const newSong: SongSuggestion = {
        id: Math.random().toString(),
        guest_name: guestName,
        song_title: songTitle,
        song_artist: songArtist
      };
      setSuggestions(prev => [newSong, ...prev]);
      setSubmitSuccess(true);
      setSongTitle('');
      setSongArtist('');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  return (
    <section
      style={{
        padding: '6rem 2rem',
        backgroundColor: 'var(--color-black)',
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
          maxWidth: '800px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
        }}
      >
        {/* Lado izquierdo: Formulario de sugerencia */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Ambiente de Fiesta
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontStyle: 'italic',
                color: 'var(--color-cream)',
                fontWeight: 300,
                marginTop: '0.5rem',
              }}
            >
              ¿Qué canción no debe faltar?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                color: 'var(--color-cream-muted)',
                lineHeight: 1.5,
                marginTop: '0.5rem',
              }}
            >
              Ayúdanos a armar la playlist para la fiesta. Sugiere tus canciones favoritas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid rgba(197, 160, 89, 0.15)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Campo: Tu Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                htmlFor="music_guest_name"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Tu Nombre
              </label>
              <input
                id="music_guest_name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Nombre completo"
                style={{
                  padding: '0.75rem 0.95rem',
                  backgroundColor: 'var(--color-black-soft)',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-cream)',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Campo: Título de Canción */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                htmlFor="song_title"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Título de la Canción
              </label>
              <input
                id="song_title"
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Ej. La Chona, Perfect..."
                style={{
                  padding: '0.75rem 0.95rem',
                  backgroundColor: 'var(--color-black-soft)',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-cream)',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Campo: Artista */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                htmlFor="song_artist"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Nombre del Artista / Banda
              </label>
              <input
                id="song_artist"
                type="text"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
                placeholder="Ej. Los Tucanes de Tijuana..."
                style={{
                  padding: '0.75rem 0.95rem',
                  backgroundColor: 'var(--color-black-soft)',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-cream)',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>

            {errorMessage && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#ef4444' }}>
                {errorMessage}
              </p>
            )}

            {submitSuccess && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-gold)' }}>
                ¡Sugerencia agregada con éxito!
              </p>
            )}

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              data-cursor-hover
              style={{
                padding: '0.85rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.3s ease',
              }}
            >
              {isSubmitting ? 'Agregando...' : 'Recomendar Canción'}
            </button>
          </form>
        </div>

        {/* Lado derecho: Lista pública de sugeridas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(197, 160, 89, 0.15)',
              paddingBottom: '0.5rem',
            }}
          >
            Sugerencias de los Invitados
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '380px',
              overflowY: 'auto',
              paddingRight: '0.5rem',
            }}
          >
            {suggestions.map((song) => (
              <div
                key={song.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-surface)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '2px solid var(--color-gold)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }}
              >
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      color: 'var(--color-cream)',
                      fontWeight: 400,
                    }}
                  >
                    {song.song_title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.85rem',
                      color: 'var(--color-cream-muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    {song.song_artist}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: 'var(--color-gold-light)',
                      opacity: 0.7,
                      display: 'block',
                    }}
                  >
                    Sugerido por
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      color: 'var(--color-cream)',
                    }}
                  >
                    {song.guest_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
