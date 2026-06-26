'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCursorMagnet } from '@/hooks/useCursorMagnet';
import type { InvitationConfig, GalleryPhoto } from '@/types/invitation';
import { defaultInvitationConfig } from '@/config/invitation.config';
import { SplitTextReveal } from '@/components/core/SplitTextReveal';

interface LiveGalleryProps {
  config?: InvitationConfig;
}

export function LiveGallery({ config = defaultInvitationConfig }: LiveGalleryProps) {
  const uploadButtonRef = useCursorMagnet<HTMLLabelElement>(0.3);
  const fileInputRefRef = useRef<HTMLInputElement>(null);

  const [guestName, setGuestName] = useState('');
  const [photos, setPhotos] = useState<GalleryPhoto[]>([
    { id: 'm1', invitationId: config.id, url: '/images/sofia-hero.png', uploadedBy: 'Fotógrafo Oficial', createdAt: new Date().toISOString() },
    { id: 'm2', invitationId: config.id, url: '/images/sofia-hero.png', uploadedBy: 'Familia Mendoza', createdAt: new Date().toISOString() }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 35,
    opacity: 0,
    duration: 1.2,
  });

  // 1. Cargar fotos iniciales desde Supabase y suscribirse a Realtime
  useEffect(() => {
    if (!isSupabaseConfigured) {
      console.info('[LiveGallery] Supabase no configurado. Utilizando fotos locales de demo.');
      return;
    }

    let active = true;

    async function fetchPhotos() {
      try {
        const { data, error } = await supabase
          .from('gallery_photos')
          .select('*')
          .eq('invitation_id', config.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && active) {
          const parsedPhotos: GalleryPhoto[] = data.map((p: any) => ({
            id: p.id,
            invitationId: p.invitation_id,
            url: p.url,
            uploadedBy: p.uploaded_by,
            createdAt: p.created_at
          }));
          setPhotos(prev => {
            const ids = new Set(parsedPhotos.map(p => p.id));
            return [...parsedPhotos, ...prev.filter(p => !ids.has(p.id))];
          });
        }
      } catch (err) {
        console.warn('[LiveGallery Fetch] No se pudieron cargar fotos de Supabase Storage. Se usarán imágenes locales de demo.', err);
      }
    }
    fetchPhotos();

    // Suscribirse al canal Realtime
    const channel = supabase
      .channel(`public:gallery_photos:${config.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'gallery_photos',
          filter: `invitation_id=eq.${config.id}`
        },
        (payload) => {
          if (active) {
            const newPhoto: GalleryPhoto = {
              id: payload.new.id,
              invitationId: payload.new.invitation_id,
              url: payload.new.url,
              uploadedBy: payload.new.uploaded_by,
              createdAt: payload.new.created_at
            };
            setPhotos((prev) => [newPhoto, ...prev.filter(p => p.id !== newPhoto.id)]);
          }
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [config.id]);

  // 2. Gestionar la subida del archivo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecciona un archivo de imagen válido.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);
    setUploadSuccess(false);

    const nameToUse = guestName.trim() || 'Invitado';

    if (!isSupabaseConfigured) {
      // Simular subida en local de forma inmediata para evitar peticiones no resueltas a Supabase
      const reader = new FileReader();
      reader.onload = () => {
        const localPhoto: GalleryPhoto = {
          id: `local-${Date.now()}`,
          invitationId: config.id,
          url: reader.result as string,
          uploadedBy: nameToUse,
          createdAt: new Date().toISOString()
        };
        setPhotos(prev => [localPhoto, ...prev]);
        setUploadSuccess(true);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setErrorMessage('Error al leer el archivo local.');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      if (fileInputRefRef.current) {
        fileInputRefRef.current.value = '';
      }
      setTimeout(() => setUploadSuccess(false), 3000);
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${config.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // A. Subir imagen al Bucket 'gallery' en Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // B. Conseguir la URL Pública
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // C. Insertar registro en la tabla de base de datos
      const { error: insertError, data: insertData } = await supabase
        .from('gallery_photos')
        .insert([
          {
            invitation_id: config.id,
            url: publicUrl,
            uploaded_by: nameToUse
          }
        ])
        .select();

      if (insertError) throw insertError;

      setUploadSuccess(true);
    } catch (err: any) {
      console.warn('[LiveGallery Upload] Error durante el proceso de subida en Supabase. Simulando localmente vía FileReader.', err);
      
      // Fallback local: Leer la foto cargada como DataURL y añadirla al estado local para la demo
      const reader = new FileReader();
      reader.onload = () => {
        const localPhoto: GalleryPhoto = {
          id: `local-${Date.now()}`,
          invitationId: config.id,
          url: reader.result as string,
          uploadedBy: nameToUse,
          createdAt: new Date().toISOString()
        };
        setPhotos(prev => [localPhoto, ...prev]);
        setUploadSuccess(true);
      };
      reader.onerror = () => {
        setErrorMessage('Error al leer el archivo en local.');
      };
      reader.readAsDataURL(file);

    } finally {
      setIsUploading(false);
      // Limpiar input file
      if (fileInputRefRef.current) {
        fileInputRefRef.current.value = '';
      }
      setTimeout(() => setUploadSuccess(false), 3000);
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
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
        }}
      >
        {/* Cabecera de la Sección */}
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <SplitTextReveal
            text="Comparte tus momentos"
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
            text="Galería en Vivo"
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
              marginTop: '0.5rem',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              color: 'var(--color-cream-muted)',
              lineHeight: 1.5,
              marginTop: '0.5rem',
            }}
          >
            Sube las fotos que tomes durante la celebración y visualízalas en tiempo real con los demás invitados.
          </p>
        </div>

        {/* Zona de Carga interactiva */}
        <div
          style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid rgba(197, 160, 89, 0.15)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          }}
        >
          {/* Nombre de quien sube */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
            <label
              htmlFor="gallery_guest_name"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              ¿Quién comparte la foto?
            </label>
            <input
              id="gallery_guest_name"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Nombre para el pie de foto"
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

          {/* Botón de carga y carga del Input */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <input
              ref={fileInputRefRef}
              id="gallery_upload_input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              disabled={isUploading}
            />
            
            <label
              ref={uploadButtonRef}
              htmlFor="gallery_upload_input"
              data-cursor-hover
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 2rem',
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 16V9.41l-2.3 2.3-1.4-1.4 4.7-4.7 4.7 4.7-1.4 1.4-2.3-2.3V16h-2Zm-6 4a2 2 0 0 1-2-2v-3h2v3h14v-3h2v3a2 2 0 0 1-2 2H5Z"/>
              </svg>
              {isUploading ? 'Subiendo foto...' : 'Subir una Foto'}
            </label>

            {errorMessage && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#ef4444', marginTop: '0.5rem' }}>
                {errorMessage}
              </p>
            )}

            {uploadSuccess && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', marginTop: '0.5rem' }}>
                ¡Foto compartida con éxito!
              </p>
            )}
          </div>
        </div>

        {/* Visualizador de la Galería Live */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                position: 'relative',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid rgba(240, 232, 208, 0.05)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                aspectRatio: '1',
              }}
            >
              {/* Imagen */}
              <img
                src={photo.url}
                alt={`Foto compartida por ${photo.uploadedBy || 'Invitado'}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              
              {/* Nombre de quien sube (Overlay inferior) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '0.75rem',
                  background: 'linear-gradient(to top, rgba(10, 0, 5, 0.9) 0%, transparent 100%)',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      color: 'var(--color-gold-light)',
                      opacity: 0.8,
                      display: 'block',
                    }}
                  >
                    Enviado por
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.85rem',
                      color: 'var(--color-cream)',
                      fontWeight: 400,
                    }}
                  >
                    {photo.uploadedBy || 'Invitado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
