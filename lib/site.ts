export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.mateordgz.dev'
export const SITE_NAME = 'Mateo Rodríguez · Desarrollador web en Uruguay'
export const SITE_DESCRIPTION =
  'Desarrollador web full-stack en Uruguay. Diseño y desarrollo sitios web, tiendas online y sistemas a medida para negocios, con trato directo y trabajo remoto.'

export const WHATSAPP_NUMBER = '59892976140'

/** Builds a wa.me link with a prefilled, URL-encoded message. */
export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
