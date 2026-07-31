import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const siteUrl = 'https://mateoravel.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mateo Ravel — Desarrollador web full-stack freelance',
    template: '%s — Mateo Ravel',
  },
  description:
    'Desarrollador full-stack freelance especializado en sitios web rápidos y modernos para pequeños negocios. Estrategia, diseño y desarrollo de principio a fin.',
  keywords: [
    'desarrollador web freelance',
    'desarrollador full-stack',
    'desarrollador Next.js',
    'sitios web para pequeños negocios',
    'desarrollo web',
    'diseño web profesional',
  ],
  authors: [{ name: 'Mateo Ravel', url: siteUrl }],
  creator: 'Mateo Ravel',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Mateo Ravel',
    title: 'Mateo Ravel — Desarrollador web full-stack freelance',
    description:
      'Sitios web rápidos y modernos para pequeños negocios. Un único desarrollador, desde la primera llamada hasta el lanzamiento.',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mateo Ravel — Desarrollador web full-stack freelance',
    description:
      'Sitios web rápidos y modernos para pequeños negocios. Un único desarrollador, desde la primera llamada hasta el lanzamiento.',
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0b0d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`bg-background ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
        <Toaster position="bottom-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
