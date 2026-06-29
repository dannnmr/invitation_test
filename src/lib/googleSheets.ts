import { defaultInvitationConfig } from '@/config/invitation.config';

export interface GuestData {
  nombre: string;
  creado_en?: string;
}

export interface SongData {
  cancion: string;
  creado_en?: string;
}

export interface PhotoData {
  foto_url: string;
  nombre?: string;
  creado_en?: string;
}

type SubmissionType = 'guest' | 'song' | 'foto';

export async function submitToGoogleSheets(
  type: SubmissionType,
  data: GuestData | SongData | PhotoData
) {
  const webhookUrl = defaultInvitationConfig.googleSheets?.webhookUrl;
  
  if (!webhookUrl) {
    console.warn('Google Sheets Webhook URL not configured.');
    return;
  }

  let payload: any = {
    type,
    creado_en: data.creado_en || new Date().toISOString(),
  };

  if (type === 'guest') {
    const guest = data as GuestData;
    payload = { ...payload, nombre: guest.nombre };
  } else if (type === 'song') {
    const song = data as SongData;
    payload = { ...payload, cancion: song.cancion };
  } else if (type === 'foto') {
    const photo = data as PhotoData;
    payload = {
      ...payload,
      foto_url: photo.foto_url,
      nombre: photo.nombre || 'Invitado',
    };
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (error) {
    console.error(`Error submitting ${type} to Google Sheets:`, error);
    return { success: false, error };
  }
}
