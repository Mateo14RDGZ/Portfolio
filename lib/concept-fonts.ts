import { Nunito_Sans } from 'next/font/google'

// Only used on /proyectos/[slug] for the legacy Cimbra landing (the last
// project still on the shared concept-landing.tsx template) - loaded here
// instead of the root layout so it isn't fetched on every other page.
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

export const conceptFontVariables = nunitoSans.variable
