import { supabase }         from '@/lib/supabase';
import type { RSVPSubmission } from '@/types/invitation';

/**
 * Envía una confirmación de asistencia a Supabase.
 * Retorna el registro creado o lanza un error descriptivo.
 */
export async function submitRSVP(
  data: Omit<RSVPSubmission, 'id' | 'createdAt'>
): Promise<RSVPSubmission> {
  const { error } = await supabase
    .from('invitados')
    .insert({
      nombre: data.guestName.trim(),
    });

  if (error) {
    console.error('[submitRSVP] Supabase error:', error.message);
    throw new Error('No se pudo guardar tu confirmación. Intenta de nuevo.');
  }

  return {
    invitationId:        data.invitationId,
    guestName:           data.guestName,
    guestCount:          data.guestCount,
    attending:           data.attending,
    dietaryRestrictions: data.dietaryRestrictions,
  };
}

/**
 * Cuenta el total de confirmados para una invitación.
 */
export async function getRSVPCount(invitationId: string): Promise<number> {
  const { count, error } = await supabase
    .from('invitados')
    .select('*', { count: 'exact', head: true });

  if (error) return 0;
  return count ?? 0;
}
