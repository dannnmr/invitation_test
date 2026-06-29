import { defaultInvitationConfig } from '@/config/invitation.config';

/**
 * Genera enlaces para agendar el evento a Google Calendar o descargar un archivo ICS (Apple Calendar / Outlook).
 */
export function getCalendarLinks() {
  const startDate = defaultInvitationConfig.event.date;
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000); // 8 horas de duración estimada

  const formatUTC = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const start = formatUTC(startDate);
  const end = formatUTC(endDate);
  
  const title = encodeURIComponent(`XV Años — ${defaultInvitationConfig.quinceañera.fullName}`);
  const location = encodeURIComponent(`${defaultInvitationConfig.event.venue.address} - ${defaultInvitationConfig.event.venue.name}`);
  const details = encodeURIComponent(`¡Estás invitado/a! XV Años de ${defaultInvitationConfig.quinceañera.fullName}. Lugar: ${defaultInvitationConfig.event.venue.name}.`);

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Invitation//ES',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:XV Años — ${defaultInvitationConfig.quinceañera.fullName}`,
    `LOCATION:${defaultInvitationConfig.event.venue.address} - ${defaultInvitationConfig.event.venue.name}`,
    `DESCRIPTION:¡Estás invitado/a! XV Años de ${defaultInvitationConfig.quinceañera.fullName}.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  
  const icsUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;

  return { googleUrl, icsUrl };
}
