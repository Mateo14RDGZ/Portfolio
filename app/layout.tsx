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
    default: 'Mateo Rodríguez — Diseño y desarrollo web',
    template: '%s — Mateo Rodríguez',
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
  authors: [{ name: 'Mateo Rodríguez', url: siteUrl }],
  creator: 'Mateo Rodríguez',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Mateo Rodríguez / MR14',
    title: 'Mateo Rodríguez — Diseño y desarrollo web',
    description:
      'Sitios web rápidos y modernos para pequeños negocios. Un único desarrollador, desde la primera llamada hasta el lanzamiento.',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mateo Rodríguez — Diseño y desarrollo web',
    description:
      'Sitios web rápidos y modernos para pequeños negocios. Un único desarrollador, desde la primera llamada hasta el lanzamiento.',
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app',
  icons: {
    icon: '/mr14-logo-transparent.png',
    apple: '/mr14-logo-transparent.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#dfe8c8',
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
