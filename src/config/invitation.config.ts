import type { InvitationConfig } from '@/types/invitation';

/**
 * Configuración predeterminada de la invitación.
 * Contiene datos del evento, quinceañera, código de vestimenta,
 * mesa de regalos, música e itinerario de Ericka.
 */
export const defaultInvitationConfig: InvitationConfig = {
  id: 'luciana-xv-2026',
  quinceañera: {
    name: 'Luciana',
    fullName: 'Luciana Daza Sánchez',
    age: 15,
    photoUrl: '/images/decorativas_v2/fondo_newyork.webp',
    photoAlt: 'Luciana Daza Sánchez en su sesión de fotos de XV años',
  },
  event: {
    date: new Date('2026-07-25T19:00:00'),
    ceremonyTime: '20:30',
    receptionTime: '19:00',
    venue: {
      name: 'Verde Manzana (Doble Via)',
      address: 'Santa Cruz de la Sierra',
      coordinates: [-63.2201, -17.8425],
      mapsUrl: 'https://maps.app.goo.gl/he3TTggqBvZ3dHyV6?g_st=ic',
    },
  },
  theme: {
    primaryColor: '#FBCFE8', // Rosa Pastel
    accentColor: '#111111',  // Negro
  },
  dressCode: {
    description: 'Código de Vestimenta Elegante',
    colors: [
      '/images/decorativas_v2/textura_rosa4.png',
      '/images/decorativas_v2/textura-azul.jpg',
      '/images/decorativas_v2/textura-plateado.png',
    ],
    notes: 'Colores reservados: Queda estrictamente prohibido el uso del color rosa pastel, azul marino, plateado o tonalidades similares.',
  },
  giftRegistry: {
    stores: [],
  },
  music: {
    ambientTrack: '/audio/flashing_lights.mp3',
  },
  rsvpDeadline: new Date('2026-07-20T23:59:59'),
  itinerary: [
    {
      time: '19:00',
      title: 'Bienvenida',
      description: 'Recepción y bienvenida de invitados.',
      icon: '/images/decorativas_v2/martini_rosa.png',
    },
    {
      time: '20:30',
      title: 'Ingreso De La Quinceañera',
      description: 'Gran entrada y vals tradicional.',
      icon: '/images/decorativas_v2/estatua_brillos.webp',
    },
    {
      time: '21:00',
      title: 'Cena',
      description: 'Cena de gala en honor a la quinceañera.',
      icon: '/images/decorativas_v2/cubiertos.png',
    },
    {
      time: '21:30',
      title: 'Fiesta',
      description: 'Apertura de la pista de baile y diversión.',
      icon: '/images/decorativas_v2/fiesta.png',
    },
    {
      time: '01:00',
      title: 'Torta',
      description: 'Brindis final y momento de cantar el cumpleaños.',
      icon: '/images/decorativas_v2/torta_rosa.png',
    },
  ],
  parents: {
    topLabel: 'Junto a mis padres',
    fatherName: 'Gonzalo Daza',
    motherName: 'Judith Sánchez',
    godparents: [],
    invitationText: 'Acompáñame a celebrar el comienzo de una nueva etapa en mi vida. Me encantara que formes parte de una noche mágica llena de momentos inolvidables que guardaré para siempre en mi corazón',
  },
  passes: {
    topLabel: 'Pase Personalizado',
    mainTitle: 'MET Gala VIP Pass',
    ticketLabel: 'Exclusive Guest',
    admitText: 'Invitado VIP',
    quantity: '1',
    unitText: 'Persona',
  },
  googleSheets: {
    webhookUrl: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || '',
  },
};