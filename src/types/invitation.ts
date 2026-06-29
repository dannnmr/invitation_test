export interface InvitationConfig {
  id: string;
  quinceañera: {
    name: string;
    fullName: string;
    age: number;
    photoUrl: string;
    photoAlt: string;
  };
  event: {
    date: Date;
    ceremonyTime: string;
    receptionTime: string;
    venue: {
      name: string;
      address: string;
      coordinates: [number, number]; // [lng, lat]
      mapsUrl: string;
    };
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundImage?: string;
  };
  dressCode: {
    description: string;
    colors: string[]; // hex values
    notes?: string;
  };
  giftRegistry?: {
    stores: GiftStore[];
  };
  music?: {
    ambientTrack?: string;
    playlistUrl?: string;
  };
  rsvpDeadline: Date;
  itinerary?: ItineraryItem[];
  parents?: {
    topLabel: string;
    fatherName: string;
    motherName: string;
    godparents?: string[];
    invitationText: string;
  };
  passes?: {
    topLabel: string;
    mainTitle: string;
    ticketLabel: string;
    admitText: string;
    quantity: string;
    unitText: string;
  };
  googleSheets?: {
    webhookUrl: string;
  };
}

export interface RSVPSubmission {
  id?: string;
  invitationId: string;
  guestName: string;
  guestCount: number;
  attending: boolean;
  dietaryRestrictions?: string;
  songSuggestion?: string;
  createdAt?: string;
}

export interface GalleryPhoto {
  id: string;
  invitationId: string;
  url: string;
  uploadedBy?: string;
  createdAt: string;
}

export type AnimationState = 'idle' | 'entering' | 'visible' | 'leaving';

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  label?: string;
}

export interface RSVPFormData {
  guestName:           string;
  guestCount:          number;
  dietaryRestrictions: string;
}

export type RSVPFormState =
  | 'idle'        // Formulario vacío
  | 'submitting'  // Esperando respuesta de Supabase
  | 'success'     // Confirmado correctamente
  | 'error';      // Error de red o validación

export interface ItineraryItem {
  time:        string;
  title:       string;
  description: string;
  icon?:       string; // emoji o caracter decorativo
}

export interface GiftStore {
  name:    string;
  url:     string;
  logo?:   string;
  note?:   string;
}
