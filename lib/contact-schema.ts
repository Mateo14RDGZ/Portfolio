/**
 * Shared contact form types and validation.
 *
 * Kept out of the `'use server'` module because server action files may only
 * export async functions — exporting constants from them yields `undefined`
 * on the client.
 */

export type ContactField = 'name' | 'email' | 'plan' | 'message'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message: string
  errors: Partial<Record<ContactField, string>>
}

export const initialContactState: ContactState = {
  status: 'idle',
  message: '',
  errors: {},
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const VALID_PLANS = new Set(['', 'CLASSIC', 'GOLD', 'BLACK', 'Aún no lo sé'])

export type ContactInput = {
  name: string
  email: string
  plan: string
  message: string
}

/** Validates contact input. Runs on the server; safe to reuse on the client. */
export function validateContact(input: ContactInput) {
  const errors: ContactState['errors'] = {}

  if (input.name.length < 2) errors.name = 'Indicame tu nombre.'
  else if (input.name.length > 80) errors.name = 'El nombre debe tener menos de 80 caracteres.'
  if (!EMAIL_PATTERN.test(input.email))
    errors.email = 'Ingresá una dirección de correo válida.'
  else if (input.email.length > 254)
    errors.email = 'La dirección de correo es demasiado larga.'
  if (!VALID_PLANS.has(input.plan))
    errors.plan = 'Elegí una de las opciones disponibles.'
  if (input.message.length < 10)
    errors.message = 'Agregá un poco más de información para poder responderte mejor.'
  else if (input.message.length > 4000)
    errors.message = 'El mensaje debe tener menos de 4000 caracteres.'

  return errors
}
