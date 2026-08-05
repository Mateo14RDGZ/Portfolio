import { Geologica, Manrope } from 'next/font/google'

// Scoped to this project's own module tree only - never imported from the
// root layout or from another case study, so these two families only ever
// enter the bundle of visitors who actually open /proyectos/astra.
const geologica = Geologica({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-astra-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-astra-body',
  display: 'swap',
})

export const astraFontVariables = `${geologica.variable} ${manrope.variable}`
