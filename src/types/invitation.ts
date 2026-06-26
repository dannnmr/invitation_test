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
    stores: Array<{
      name: string;
      url: string;
      logo?: string;
    }>;
  };
  music?: {
    ambientTrack?: string;
    playlistUrl?: string;
  };
  rsvpDeadline: Date;
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
