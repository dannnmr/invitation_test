import type { InvitationConfig } from '@/types/invitation';

/**
 * Configuración de ejemplo. En producción, estos datos vienen
 * de Supabase o de parámetros de ruta dinámicos.
 */
export const defaultInvitationConfig: InvitationConfig = {
  id: 'sofia-xv-2025',
  quinceañera: {
    name: 'Sofía',
    fullName: 'Sofía Alejandra Mendoza',
    age: 15,
    photoUrl: '/images/sofia-hero.png',
    photoAlt: 'Sofía Alejandra en su sesión de fotos de XV años',
  },
  event: {
    date: new Date('2025-12-06T19:00:00'),
    ceremonyTime: '18:00',
    receptionTime: '20:00',
    venue: {
      name: 'Salón Imperial',
      address: 'Av. Paseo de la Reforma 250, CDMX',
      coordinates: [-99.1715, 19.4280],
      mapsUrl: 'https://maps.google.com',
    },
  },
  theme: {
    primaryColor: '#C5A059',
    accentColor: '#F0E8D0',
  },
  dressCode: {
    description: 'Formal — etiqueta',
    colors: ['#2C1654', '#C5A059', '#1A3A2A', '#8B1A1A'],
    notes: 'Se solicita no usar color blanco o marfil.',
  },
  giftRegistry: {
    stores: [
      { name: 'Liverpool', url: 'https://liverpool.com.mx' },
      { name: 'Amazon', url: 'https://amazon.com.mx' },
    ],
  },
  music: {
    ambientTrack: '/audio/ambient.mp3',
  },
  rsvpDeadline: new Date('2025-11-20'),
};
