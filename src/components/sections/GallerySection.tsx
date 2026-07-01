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
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';

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
        .from('fotos2')
        .select('id, foto_url, creado_en')
        .order('creado_en', { ascending: false });

      if (!error && data) {
        setPhotos(data as Photo[]);
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
        { event: 'INSERT', schema: 'public', table: 'fotos2' },
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
        .from('fotos2')
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
        backgroundColor: '#fdfbf7', // Base
        padding: '3rem 1.5rem', // Padding muy reducido para quitar espacios en blanco
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(244, 114, 182, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
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

      {/* Decorative foliage floating in background (Imported from Ericka logic) */}
      
      <FloatingDecoration
        src="/images/decorativas_v2/martini_rosa.png"
        alt="Flor Dorada"
        style={{ bottom: '1%', right: '-16%', width: '450px', height: '450px', opacity: 0.25, zIndex: 0 }}
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/bola_rosa.png"
        alt="Jirafa"
        style={{ top: '1%', right: '-20%', width: '450px', height: '450px', opacity: 0.25, zIndex: 0 }}
        animationStyle="float"
      />

      {/* Subtle Background Glows */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', backgroundColor: 'var(--color-gold)', opacity: 0.05, borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', backgroundColor: 'rgba(244,114,182,1)', opacity: 0.03, borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '1152px', width: '100%', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem', // Margen inferior reducido
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              color: 'var(--color-cream-muted)',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              fontWeight: 700,
            }}
          >
            Captura el Momento
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              color: 'var(--color-cream)',
              fontWeight: 400, // Quitar negrita  
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            Galería Live
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
              color: 'var(--color-gold-dark)', // Uniformidad con el estilo principal
              letterSpacing: '0.15em',
              fontWeight: 300,
              maxWidth: '32rem',
              margin: '0 auto',
              textTransform: 'uppercase',
              padding: '0 1rem',
            }}
          >
            Sube tus fotos favoritas de la fiesta. ¡Construyamos el álbum de recuerdos juntos!
          </p>

          {/* UPLOAD ZONE */}
          <div
            {...getRootProps()}
            style={{
              marginTop: '2rem',
              maxWidth: '28rem',
              width: '100%',
              marginInline: 'auto',
              padding: '2rem',
              border: '2px dashed',
              borderColor: isDragActive ? 'var(--color-gold)' : 'rgba(244, 114, 182, 0.35)',
              borderRadius: '2.5rem',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: isDragActive ? 'rgba(244, 114, 182, 0.05)' : 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
              opacity: isUploading ? 0.5 : 1
            }}
          >
            <input {...getInputProps()} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              {isUploading ? (
                <>
                  <RotateCw className="w-10 h-10 text-pink-400 animate-spin" />
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-gold-dark)', fontWeight: 700, letterSpacing: '0.025em', fontSize: '0.875rem' }}>Subiendo foto...</p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-10 h-10 text-pink-400 drop-shadow-sm" />
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-gold-dark)', fontWeight: 800, fontSize: '1rem', marginBottom: '4px' }}>Toca aquí o arrastra una foto</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>JPG, PNG, WEBP (Max 5MB)</p>
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
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '1.5rem',
                }}
              >
                {uploadError}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* STACKED CARD SWIPER */}
        <div style={{ width: '100%', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isLoading ? (
            <div style={{ width: '100%', padding: '5rem 0', display: 'flex', justifyContent: 'center', color: 'var(--color-gold-dark)' }}>
              <RotateCw className="w-10 h-10 animate-spin mx-auto block" />
            </div>
          ) : photos.length === 0 ? (
            <div style={{ width: '100%', padding: '5rem 0', textAlign: 'center', color: 'var(--color-cream-muted)', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.875rem' }}>
              El mural interactivo está vacío. ¡Haz los honores!
            </div>
          ) : currentIndex >= photos.length ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '2.5rem 0' }}
            >
              <p style={{ color: 'var(--color-cream-muted)', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 500 }}>
                ¡Has visto todas las fotos!
              </p>
              <button
                onClick={() => setCurrentIndex(0)}
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: 'var(--color-gold)',
                  color: '#FAF7F2',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  fontSize: '0.625rem',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  margin: '0 auto',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <RotateCw className="w-4 h-4" /> Volver a ver galería
              </button>
            </motion.div>
          ) : (
            <>
              {/* Stack de Tarjetas */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '360px', height: '480px', marginTop: '0.5rem' }}>
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
                          x: visualIndex === 0 ? -4 : visualIndex === 1 ? 8 : -12,
                          rotate: visualIndex === 0 ? -3 : visualIndex === 1 ? 4 : -7,
                          opacity: 1 - visualIndex * 0.15,
                        }}
                        exit={{
                          x: exitDirection === 'left' ? -300 : 300,
                          opacity: 0,
                          rotate: exitDirection === 'left' ? -20 : 20,
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
                          padding: '14px 14px 64px 14px', // Extra padding for polaroid bottom
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          borderRadius: '4px',
                          border: '1px solid rgba(229, 231, 235, 0.6)',
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
                            top: '-40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '56px',
                            height: '80px',
                            zIndex: 50,
                            pointerEvents: 'none',
                          }}
                        >
                          <img
                            src="/images/decorativas_v2/clip_rosa.png"
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
                            backgroundColor: '#F3F3F3',
                            overflow: 'hidden',
                            border: '1px solid #E5E7EB',
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
                        </div>

                        {/* Barra de pie Polaroid */}
                        <div
                          style={{
                            marginTop: '14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 4px'
                          }}
                        >
                          <Heart style={{ width: '24px', height: '24px', color: 'var(--color-gold)', fill: isTop ? 'rgba(197, 160, 89, 0.2)' : 'transparent', transition: 'colors 0.3s' }} />
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: '#737373', letterSpacing: '0.12em', fontWeight: 900, textTransform: 'uppercase', flex: 1, textAlign: 'center' }}>
                            {isTop ? 'Toca para ampliar' : ''}
                          </span>
                          <Maximize2
                            style={{ width: '24px', height: '24px', color: isTop ? '#737373' : '#d4d4d8', cursor: isTop ? 'pointer' : 'default', transition: 'colors 0.3s' }}
                            onClick={(e) => {
                              if (isTop) {
                                e.stopPropagation();
                                setSelectedImage(photo.foto_url);
                              }
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Botones de navegación del swiper */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginTop: '2rem', position: 'relative', zIndex: 20 }}
              >
                <button
                  onClick={() => {
                    if (currentIndex > 0) {
                      setExitDirection('right');
                      setCurrentIndex((prev) => prev - 1);
                    }
                  }}
                  disabled={currentIndex === 0}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid rgba(197, 160, 89, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentIndex === 0 ? 0.4 : 1,
                    color: currentIndex === 0 ? '#a3a3a3' : 'var(--color-gold-dark)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s'
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', minWidth: '80px', textAlign: 'center' }}>
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
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-gold-dark)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s'
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
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
              zIndex: 100,
              backgroundColor: 'rgba(250, 247, 242, 0.95)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem',
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
                top: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '50%',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold-dark)',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                zIndex: 50,
                transition: 'all 0.3s'
              }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Fullscreen container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'relative',
                maxWidth: '1024px',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <img
                src={selectedImage}
                alt="Fullscreen view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  backgroundColor: 'white',
                  padding: '0.5rem',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  pointerEvents: 'auto',
                  cursor: 'default'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
