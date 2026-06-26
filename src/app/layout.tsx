import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Mono, Inter } from 'next/font/google';
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

/* ── Metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    template: '%s | Invitación XV Años',
    default: 'Invitación XV Años',
  },
  description: 'Invitación digital para la celebración de XV años.',
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
      className={`${cormorant.variable} ${dmMono.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScroll>
          {/* Cursor personalizado — fuera del page transition */}
          <CustomCursor />

          {/* Control de audio ambient */}
          <AudioController src="/audio/ambient.mp3" />

          {/* Transiciones entre páginas */}
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
