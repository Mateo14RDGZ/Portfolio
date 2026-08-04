'use server'

import { headers } from 'next/headers'
import {
  validateContact,
  type ContactState,
} from '@/lib/contact-schema'
import { SITE_URL } from '@/lib/site'

const CONTACT_TO_EMAIL = 'contacto@mateordgz.dev'
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

function createContactEmail(input: {
  name: string
  email: string
  plan: string
  message: string
}) {
  const safeName = escapeHtml(input.name)
  const safeEmail = escapeHtml(input.email)
  const safePlan = escapeHtml(input.plan || 'Aún sin definir')
  const safeMessage = escapeHtml(input.message).replace(/\n/g, '<br />')
  // The address in a mailto: link must stay a literal addr-spec (RFC 6068) -
  // percent-encoding the "@" (as encodeURIComponent would) makes most mail
  // clients fail to parse the recipient. Only the query string (subject=...)
  // gets percent-encoded.
  const replyUrl = `mailto:${safeEmail}?subject=${encodeURIComponent('Sobre tu consulta desde MR14')}`
  const firstName = input.name.split(' ')[0] || input.name

  return {
    subject: `Nueva consulta web · ${input.plan || 'Sin plan seleccionado'} · ${firstName}`,
    text: [
      'MR14 — Nueva consulta desde el portfolio',
      '',
      `Nombre: ${input.name}`,
      `Correo: ${input.email}`,
      `Plan: ${input.plan || 'Aún sin definir'}`,
      '',
      'Detalles del proyecto:',
      input.message,
      '',
      'Respondé directamente a este correo para continuar la conversación.',
    ].join('\n'),
    html: `
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style="margin:0;padding:0;background:#dfe8c8;color:#291532;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;">
          <span style="display:none!important;font-size:1px;color:#dfe8c8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">Nueva consulta de ${safeName} desde mateordgz.dev.</span>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;margin:0;padding:32px 16px;background:#dfe8c8;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;border:1px solid #291532;background:#f7f8ef;">
                  <tr>
                    <td style="padding:26px 32px;background:#291532;color:#f7f8ef;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td><img src="${SITE_URL}/mr14-logo-email-white.png" width="38" height="40" alt="MR14" style="display:block;border:0;" /></td>
                          <td align="right" style="font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#dfe8c8;">Nueva consulta</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:34px 32px 12px;">
                      <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#ff5d3a;">Formulario de contacto</p>
                      <h1 style="margin:0;color:#291532;font-size:30px;line-height:1.16;letter-spacing:-.035em;">${safeName} quiere conversar.</h1>
                      <p style="margin:16px 0 0;color:#5d4963;font-size:16px;line-height:1.55;">Tenés toda la información de la consulta organizada para poder responder rápido y con contexto.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:22px 32px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;border-top:1px solid #b7c29b;border-bottom:1px solid #b7c29b;">
                        <tr>
                          <td style="width:50%;padding:17px 14px 17px 0;vertical-align:top;border-right:1px solid #b7c29b;">
                            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#5d4963;">Contacto</p>
                            <a href="mailto:${safeEmail}" style="color:#291532;font-size:15px;font-weight:700;text-decoration:none;word-break:break-word;">${safeEmail}</a>
                          </td>
                          <td style="width:50%;padding:17px 0 17px 18px;vertical-align:top;">
                            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#5d4963;">Interés inicial</p>
                            <p style="margin:0;color:#291532;font-size:15px;font-weight:700;">${safePlan}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 32px 28px;">
                      <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#5d4963;">Detalles del proyecto</p>
                      <div style="padding:22px 22px 24px;background:#e8edda;border:1px solid #b7c29b;color:#291532;font-size:16px;line-height:1.65;">${safeMessage}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 32px 34px;">
                      <a href="${replyUrl}" style="display:inline-block;padding:14px 20px;background:#ff5d3a;color:#291532;font-size:15px;font-weight:800;text-decoration:none;">Responder a ${safeName}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 32px;background:#eef2df;border-top:1px solid #b7c29b;">
                      <p style="margin:0;color:#5d4963;font-size:12px;line-height:1.5;">Consulta recibida desde <a href="https://www.mateordgz.dev" style="color:#291532;font-weight:700;text-decoration:underline;">mateordgz.dev</a> · Uruguay · Trabajo remoto</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  }
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

  const email = createContactEmail(input)

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
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '')
      console.error('Resend rejected the contact email:', response.status, errorBody)
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
