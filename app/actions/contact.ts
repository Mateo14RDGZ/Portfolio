'use server'

import { headers } from 'next/headers'
import {
  validateContact,
  type ContactState,
} from '@/lib/contact-schema'

const CONTACT_TO_EMAIL = 'mrdgz14dev@gmail.com'
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 3
const contactAttempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(identifier: string) {
  const now = Date.now()
  const current = contactAttempts.get(identifier)

  if (!current || current.resetAt <= now) {
    contactAttempts.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  if (contactAttempts.size > 500) {
    for (const [key, value] of contactAttempts) {
      if (value.resetAt <= now) contactAttempts.delete(key)
    }
  }

  return current.count > RATE_LIMIT_MAX_REQUESTS
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character)
}

/** Validates the request and forwards it to the portfolio inbox through Resend. */
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

  // Hidden honeypot. Bots commonly fill every available field.
  if (String(formData.get('website') ?? '').trim()) {
    return { status: 'success', message: 'Mensaje enviado correctamente.', errors: {} }
  }

  const requestHeaders = await headers()
  const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim()
  const identifier = forwardedFor || requestHeaders.get('x-real-ip') || 'unknown'

  if (isRateLimited(identifier)) {
    return {
      status: 'error',
      message: 'Recibí varias consultas seguidas. Esperá un minuto y volvé a intentar.',
      errors: {},
    }
  }

  const errors = validateContact(input)
  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Revisá los campos destacados.',
      errors,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.')
    return {
      status: 'error',
      message: 'No pude enviar el mensaje en este momento. Volvé a intentarlo o escribime directamente por correo.',
      errors: {},
    }
  }

  const safeName = escapeHtml(input.name)
  const safeEmail = escapeHtml(input.email)
  const safePlan = escapeHtml(input.plan || 'No especificado')
  const safeMessage = escapeHtml(input.message).replace(/\n/g, '<br />')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'MR14 Portfolio <onboarding@resend.dev>',
        to: [CONTACT_TO_EMAIL],
        reply_to: input.email,
        subject: `Nueva consulta web · ${input.plan || 'Sin plan seleccionado'}`,
        text: [
          `Nombre: ${input.name}`,
          `Email: ${input.email}`,
          `Plan: ${input.plan || 'No especificado'}`,
          '',
          input.message,
        ].join('\n'),
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171218;max-width:640px">
            <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b6570">Nueva consulta desde MR14</p>
            <h1 style="font-size:28px;margin:0 0 24px">${safeName} quiere conversar</h1>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Plan:</strong> ${safePlan}</p>
            <div style="margin-top:24px;padding:20px;background:#f1f4e5;border-left:4px solid #ff5d3a">${safeMessage}</div>
          </div>
        `,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Resend rejected the contact email:', response.status)
      return {
        status: 'error',
        message: 'No pude enviar el mensaje en este momento. Volvé a intentarlo o escribime directamente por correo.',
        errors: {},
      }
    }
  } catch (error) {
    console.error('Contact email request failed:', error instanceof Error ? error.message : 'unknown error')
    return {
      status: 'error',
      message: 'No pude enviar el mensaje en este momento. Volvé a intentarlo o escribime directamente por correo.',
      errors: {},
    }
  }

  return {
    status: 'success',
    message: `Gracias, ${input.name.split(' ')[0]}. Recibí tu mensaje y te voy a responder en menos de 24 horas.`,
    errors: {},
  }
}
