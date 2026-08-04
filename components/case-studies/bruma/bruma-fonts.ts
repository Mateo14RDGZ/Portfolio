import { Petrona, Work_Sans } from 'next/font/google'

// Scoped to this project's own module tree only - never imported from the
// root layout or from another case study, so these two families only ever
// enter the bundle of visitors who actually open /proyectos/bruma-cafe.
const petrona = Petrona({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-bruma-display',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-bruma-body',
  display: 'swap',
})

export const brumaFontVariables = `${petrona.variable} ${workSans.variable}`
