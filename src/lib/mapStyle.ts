/**
 * Override de capas del estilo Mapbox para paleta dark gold.
 * Se aplica sobre el estilo base 'mapbox://styles/mapbox/dark-v11'.
 *
 * Solo sobreescribimos los colores necesarios para nuestra paleta.
 * Las capas de edificios, carreteras y agua se mantienen del tema base.
 */
export const mapLayerOverrides = [
  // Fondo del mapa
  {
    id:     'background',
    type:   'background' as const,
    paint:  { 'background-color': '#0A0005' },
  },
  // Color del agua
  {
    id:    'water',
    paint: { 'fill-color': '#06000A' },
  },
  // Parques y áreas verdes
  {
    id:    'landuse',
    paint: { 'fill-color': '#0D0A12' },
  },
] as const;

/**
 * Configuración inicial de la cámara del mapa.
 */
export function getInitialCamera(coordinates: [number, number]) {
  return {
    center:  coordinates,
    zoom:    14,
    pitch:   40,   // Inclinación — da sensación de profundidad
    bearing: -10,  // Rotación leve
  };
}
