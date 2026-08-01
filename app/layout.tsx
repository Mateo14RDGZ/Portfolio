import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Geist, Geist_Mono, Nunito_Sans, Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/sonner'
import { GoogleAnalytics } from '@/components/google-analytics'
import { PwaRegistration } from '@/components/pwa-registration'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
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

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

const maziusDisplay = localFont({
  src: './fonts/MaziusDisplay-ExtraItalicBold.woff2',
  variable: '--font-mazius-display',
  weight: '700',
  style: 'italic',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Desarrollador web en Uruguay | Mateo Rodríguez',
    template: '%s | Mateo Rodríguez',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'desarrollador Uruguay',
    'desarrollador web Uruguay',
    'desarrollo web Uruguay',
    'programador web Uruguay',
    'desarrollador web freelance',
    'desarrollador full-stack Uruguay',
    'desarrollador Next.js',
    'sitios web para pequeños negocios',
    'sistemas a medida Uruguay',
    'tiendas online Uruguay',
    'diseño web profesional',
  ],
  authors: [{ name: 'Mateo Rodríguez', url: SITE_URL }],
  creator: 'Mateo Rodríguez',
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Desarrollador web en Uruguay | Mateo Rodríguez',
    description: SITE_DESCRIPTION,
    locale: 'es_UY',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mateo Rodríguez, desarrollador web en Uruguay · MR14',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desarrollador web en Uruguay | Mateo Rodríguez',
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'MR14',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
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
      lang="es-UY"
      className={`bg-background ${geistSans.variable} ${geistMono.variable} ${maziusDisplay.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${nunitoSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
        <PwaRegistration />
        <GoogleAnalytics />
        <Toaster position="bottom-right" />
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
