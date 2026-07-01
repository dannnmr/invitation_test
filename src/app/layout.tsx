import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Mono, Inter, Pinyon_Script, Great_Vibes } from 'next/font/google';
import { SmoothScroll }    from '@/components/core/SmoothScroll';
import { CustomCursor }    from '@/components/core/CustomCursor';
import { AudioController } from '@/components/core/AudioController';
import { PageTransition }  from '@/components/core/PageTransition';
import '@/app/globals.css';

/* ── Fuentes ──────────────────────────────────────────────────── */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pinyon',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vibes',
  display: 'swap',
});

/* ── Metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    template: '%s | Invitación XV Años',
    default: 'Mis XV Años | Luciana',
  },
  description: 'Acompáñame a celebrar el comienzo de una nueva etapa en mi vida. ¡No faltes!',
  openGraph: {
    title: 'Mis XV Años | Luciana',
    description: 'Acompáñame a celebrar el comienzo de una nueva etapa en mi vida. ¡No faltes!',
    images: [
      {
        url: '/images/invitation/metadata-rosa.png',
        width: 1200,
        height: 630,
        alt: 'Mis XV Años - Luciana',
      },
    ],
    type: 'website',
  },
  robots: {
    index: false,   // Las invitaciones no deben indexarse en Google
    follow: false,
  },
};

/* ── Layout ───────────────────────────────────────────────────── */

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmMono.variable} ${inter.variable} ${pinyon.variable} ${greatVibes.variable}`}
    >
      <body>
        <SmoothScroll>
        

          {/* Control de audio ambient */}
          <AudioController src="/audio/flashing_lights.mp3" />

          {/* Transiciones entre páginas */}
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
