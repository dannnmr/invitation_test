'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Image as ImageIcon, UploadCloud, RotateCw, X, Plus, Heart, Maximize2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';
import { compressImage } from '@/lib/imageCompressor';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Photo = {
  id: string;
  foto_url: string;
  creado_en: string;
};

/**
 * Sección de Galería Live interactiva en formato Polaroid con Swiper de tarjetas apiladas.
 */
export function GallerySection() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadError, setUploadError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('left');

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30 });

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x > 80) {
      setExitDirection('right');
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x < -80) {
      setExitDirection('left');
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('fotos')
        .select('*')
        .order('creado_en', { ascending: false });

      if (!error && data) {
        setPhotos(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();

    // Suscripción en tiempo real a la tabla de fotos
    const channel = supabase
      .channel('public:photos')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'fotos' },
        (payload) => {
          setPhotos((prev) => {
            const exists = prev.some((p) => p.id === payload.new.id);
            if (exists) return prev;
            return [payload.new as Photo, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const rawFile = acceptedFiles[0];
    if (!rawFile) return;

    setIsUploading(true);
    setUploadError('');

    try {
      // Compresión de imagen client-side
      const file = await compressImage(rawFile);

      if (file.size > 5 * 1024 * 1024) {
        setUploadError('La imagen excede el límite (Max: 5MB)');
        setIsUploading(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('invitation_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('invitation_assets')
        .getPublicUrl(filePath);

      // Guardar registro en la base de datos (Supabase de Ericka tiene la tabla 'fotos' y columna 'foto_url')
      const { error: dbError, data: insertedData } = await supabase
        .from('fotos')
        .insert([{ foto_url: publicUrl }])
        .select()
        .single();

      if (dbError) throw dbError;

      if (insertedData) {
        setPhotos((prev) => {
          const exists = prev.some((p) => p.id === insertedData.id);
          if (exists) return prev;
          return [insertedData as Photo, ...prev];
        });
        setCurrentIndex(0);
      }

      // Sync con Google Sheets
      submitToGoogleSheets('foto', { foto_url: publicUrl })
        .catch((gsError) => console.error('Error syncing photo to Google Sheets:', gsError));
    } catch (err) {
      console.error(err);
      setUploadError('Error al procesar la imagen. Intenta nuevamente.');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <section
      aria-label="Galería interactiva en vivo"
      style={{
        backgroundColor: 'var(--color-black)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          pointerEvents: 'none',
          opacity: 0.15,
          color: 'var(--color-gold)',
        }}
      >
        <Sparkles className="w-8 h-8 text-pink-300 animate-pulse" />
      </div>

      {/* Cabecera */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '3rem',
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
            fontWeight: 600,
          }}
        >
          Captura el Momento
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-pinyon)',
            fontSize: 'clamp(3rem, 7vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--color-gold-dark)',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          Galería Live
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: 'var(--color-cream-muted)',
            lineHeight: 1.6,
          }}
        >
          Sube tus fotos favoritas de la fiesta directamente desde tu celular. ¡Ayúdanos a construir juntos el álbum de recuerdos!
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px',
          zIndex: 10,
        }}
      >
        {/* Zona de Carga (Upload) */}
        <div
          {...getRootProps()}
          style={{
            width: '100%',
            padding: '2.5rem 1.5rem',
            border: isDragActive ? '2px dashed var(--color-gold)' : '2px dashed rgba(244, 114, 182, 0.3)',
            backgroundColor: isDragActive ? 'rgba(244, 114, 182, 0.05)' : 'var(--color-surface)',
            borderRadius: '24px',
            textAlign: 'center',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s ease',
            marginBottom: '3rem',
          }}
        >
          <input {...getInputProps()} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {isUploading ? (
              <>
                <RotateCw className="w-10 h-10 text-pink-400 animate-spin" />
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-cream)' }}>Subiendo fotografía...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 text-pink-400" />
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-cream)', marginBottom: '4px' }}>
                    Toca aquí o arrastra una foto
                  </p>
                  <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    JPG, PNG, WEBP (Max 5MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mensaje de Error de subida */}
        <AnimatePresence>
          {uploadError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                color: '#d9534f',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-dm-mono)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
                textAlign: 'center',
              }}
            >
              {uploadError}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Swiper Apilado / Visor de Fotos */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isLoading ? (
            <div style={{ padding: '3rem 0' }}>
              <RotateCw className="w-8 h-8 text-pink-400 animate-spin" />
            </div>
          ) : photos.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '3rem 0', textAlign: 'center' }}>
              El mural está vacío. ¡Sube la primera foto!
            </p>
          ) : currentIndex >= photos.length ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--color-cream-muted)', marginBottom: '1.25rem' }}>
                ¡Has visto todas las fotos!
              </p>
              <button
                onClick={() => setCurrentIndex(0)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-black)',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '0.6rem 1.5rem',
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(244, 114, 182, 0.15)',
                }}
              >
                <RotateCw className="w-3.5 h-3.5" /> Volver a ver
              </button>
            </motion.div>
          ) : (
            <>
              {/* Stack de Tarjetas */}
              <div style={{ position: 'relative', width: '280px', height: '370px' }}>
                <AnimatePresence>
                  {photos.slice(currentIndex, currentIndex + 3).reverse().map((photo, reversedIndex, arr) => {
                    const isTop = reversedIndex === arr.length - 1;
                    const visualIndex = arr.length - 1 - reversedIndex;

                    return (
                      <motion.div
                        key={photo.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{
                          scale: 1 - visualIndex * 0.05,
                          y: visualIndex * 15,
                          x: visualIndex === 0 ? -4 : visualIndex === 1 ? 6 : -10,
                          rotate: visualIndex === 0 ? -3 : visualIndex === 1 ? 3 : -6,
                          opacity: 1 - visualIndex * 0.15,
                        }}
                        exit={{
                          x: exitDirection === 'left' ? -300 : 300,
                          opacity: 0,
                          rotate: exitDirection === 'left' ? -15 : 15,
                          transition: { duration: 0.3 },
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#FFFFFF',
                          padding: '12px 12px 50px 12px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
                          borderRadius: '4px',
                          border: '1px solid #ECECEC',
                          display: 'flex',
                          flexDirection: 'column',
                          zIndex: photos.length - currentIndex - visualIndex,
                          cursor: isTop ? 'grab' : 'default',
                        }}
                        drag={isTop ? 'x' : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragEnd={isTop ? handleDragEnd : undefined}
                      >
                        {/* Polaroid Clip */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '-24px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '56px',
                            height: '56px',
                            zIndex: 50,
                            pointerEvents: 'none',
                          }}
                        >
                          <img
                            src="/images/decorativas_v2/clip_polaroid.png"
                            alt="Polaroid Clip"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>

                        {/* Contenedor de la Imagen */}
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#F7F7F7',
                            overflow: 'hidden',
                            borderRadius: '2px',
                            cursor: isTop ? 'zoom-in' : 'default',
                          }}
                          onClick={() => {
                            if (isTop) setSelectedImage(photo.foto_url);
                          }}
                        >
                          <img
                            src={photo.foto_url}
                            alt="Party memory"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            draggable="false"
                          />

                          {/* Hover effect para desktop */}
                          {isTop && (
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                opacity: 0,
                                transition: 'opacity 0.2s',
                              }}
                              className="desktop-hover-overlay"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '0';
                              }}
                            >
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                  backdropFilter: 'blur(5px)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#FFFFFF',
                                }}
                              >
                                <Maximize2 className="w-4 h-4" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Barra de pie Polaroid */}
                        <div
                          style={{
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Heart className="w-5 h-5 text-pink-400 fill-pink-50/50" />
                          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '8px', color: '#999999', letterSpacing: '0.05em' }}>
                            {isTop ? 'SWIPE / TOCAR' : ''}
                          </span>
                          <Maximize2
                            className="w-5 h-5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isTop) setSelectedImage(photo.foto_url);
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Botones de navegación del swiper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
                <button
                  onClick={() => {
                    if (currentIndex > 0) {
                      setExitDirection('right');
                      setCurrentIndex((prev) => prev - 1);
                    }
                  }}
                  disabled={currentIndex === 0}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid rgba(244, 114, 182, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentIndex === 0 ? 0.4 : 1,
                    color: 'var(--color-cream)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: 'var(--color-gold-dark)', fontWeight: 700, letterSpacing: '0.15em' }}>
                  {currentIndex + 1} / {photos.length}
                </span>

                <button
                  onClick={() => {
                    if (currentIndex < photos.length) {
                      setExitDirection('left');
                      setCurrentIndex((prev) => prev + 1);
                    }
                  }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid rgba(244, 114, 182, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-cream)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lightbox / Zoom modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(250, 250, 250, 0.95)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out',
            }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid rgba(244, 114, 182, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-cream)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                zIndex: 1010,
              }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Polaroid framed container in fullscreen */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '12px 12px 40px 12px',
                borderRadius: '4px',
                border: '1px solid #ECECEC',
                boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                maxWidth: '90vw',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Zoomed memory"
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '2px',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
