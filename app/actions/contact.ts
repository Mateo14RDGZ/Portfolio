'use server'

import {
  validateContact,
  type ContactState,
} from '@/lib/contact-schema'

/**
 * Validates a contact request on the server.
 *
 * Note: submissions are validated and logged only. Connect a database or a
 * transactional email provider here to persist and forward real leads.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const input = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    plan: String(formData.get('plan') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  }

  const errors = validateContact(input)

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Revisa los campos destacados.',
      errors,
    }
  }

  console.log('[v0] Contact request received:', {
    name: input.name,
    email: input.email,
    plan: input.plan || 'no especificado',
    length: input.message.length,
  })

  return {
    status: 'success',
    message: `Gracias, ${input.name.split(' ')[0]}. He recibido tu mensaje y te responderé en menos de 24 horas.`,
    errors: {},
  }
}
