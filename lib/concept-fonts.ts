import { Fraunces, Nunito_Sans, Space_Grotesk } from 'next/font/google'

// Only used on /proyectos and /proyectos/[slug] (the concept landings and
// their gallery cards) - loaded here instead of the root layout so these
// fonts aren't fetched on every other page.
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

export const conceptFontVariables = `${fraunces.variable} ${spaceGrotesk.variable} ${nunitoSans.variable}`
