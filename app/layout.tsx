import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
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

const maziusDisplay = localFont({
  src: './fonts/MaziusDisplay-ExtraItalicBold.woff2',
  variable: '--font-mazius-display',
  weight: '700',
  style: 'italic',
  display: 'swap',
})

const siteUrl = 'https://portfolio-mrdgz14.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mateo Rodríguez — Diseño y desarrollo web en Uruguay',
    template: '%s — Mateo Rodríguez',
  },
  description:
    'Diseño y desarrollo sitios web rápidos, claros y a medida para negocios. Trabajo remoto desde Uruguay con estrategia, diseño y código en un mismo proceso.',
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
    title: 'Mateo Rodríguez — Diseño y desarrollo web en Uruguay',
    description:
      'Sitios web rápidos, claros y a medida para negocios. Estrategia, diseño y desarrollo desde Uruguay.',
    locale: 'es_UY',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mateo Rodríguez, diseño y desarrollo web · MR14',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mateo Rodríguez — Diseño y desarrollo web en Uruguay',
    description:
      'Sitios web rápidos, claros y a medida para negocios. Estrategia, diseño y desarrollo desde Uruguay.',
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
      className={`bg-background ${geistSans.variable} ${geistMono.variable} ${maziusDisplay.variable}`}
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
