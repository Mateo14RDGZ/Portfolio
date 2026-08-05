import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google'

// Scoped to this project's own module tree only - never imported from the
// root layout or from another case study, so these two families only ever
// enter the bundle of visitors who actually open /proyectos/cimbra-estudio.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-cimbra-display',
  display: 'swap',
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cimbra-body',
  display: 'swap',
})

export const cimbraFontVariables = `${bricolage.variable} ${hankenGrotesk.variable}`
