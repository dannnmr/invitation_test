import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar si la URL tiene estructura correcta. Si no, usar un placeholder válido de Supabase.
const isValidUrl = !!rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'));
const supabaseUrl = isValidUrl ? rawUrl : 'https://placeholder-project.supabase.co';

// Un anon key de Supabase es un JWT (tres partes unidas por puntos). Si no es válido, usamos un placeholder.
const isValidKey = !!rawKey && rawKey.split('.').length === 3;
const supabaseKey = isValidKey ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE1NzA4MDk2MDAsImV4cCI6MTg4NjM4NTYwMH0.placeholder';

if (!isValidUrl || !isValidKey) {
  if (typeof window === 'undefined') {
    console.warn(
      '[Supabase Config] Utilizando credenciales placeholder temporales para la compilación estática. ' +
      'Modifica NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu .env.local para usar tu base de datos real.'
    );
  }
}

export const isSupabaseConfigured = isValidUrl && isValidKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
