import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Clock,
  Image as ImageIcon,
  Layers3,
  MapPin,
  MessageCircle,
  PenTool,
  Rocket,
  Share2,
  Smartphone,
} from 'lucide-react'

export type NegociosInclude = { icon: LucideIcon; title: string }

/** The 10 things every /negocios site ships with — user-supplied list, kept in one place. */
export const NEGOCIOS_INCLUDES: NegociosInclude[] = [
  { icon: PenTool, title: 'Diseño personalizado' },
  { icon: Smartphone, title: 'Responsive: celular, tablet y PC' },
  { icon: Building2, title: 'Información del negocio' },
  { icon: Layers3, title: 'Servicios o productos' },
  { icon: ImageIcon, title: 'Galería' },
  { icon: MapPin, title: 'Ubicación' },
  { icon: Clock, title: 'Horarios' },
  { icon: Share2, title: 'Redes sociales' },
  { icon: MessageCircle, title: 'Contacto directo por WhatsApp' },
  { icon: Rocket, title: 'Publicación de la web' },
]

export const NEGOCIOS_PROCESS = [
  { n: '01', title: 'Hablamos sobre tu negocio', copy: 'Conversamos sobre a qué te dedicás, quiénes son tus clientes y qué querés lograr con la web.' },
  { n: '02', title: 'Definimos la página', copy: 'Acordamos secciones, contenido y estructura antes de tocar una línea de diseño.' },
  { n: '03', title: 'Desarrollo y revisión', copy: 'Construyo tu web y la revisamos juntos hasta que quede exactamente como la necesitás.' },
  { n: '04', title: 'Publicamos tu web', copy: 'La publicamos en tu dominio, lista para que tus clientes te encuentren.' },
] as const

export type NegociosFaqItem = { id: string; question: string; answer: string }

export const NEGOCIOS_FAQ: NegociosFaqItem[] = [
  {
    id: 'demora',
    question: '¿Cuánto demora?',
    answer: 'Para una web de este tipo, el plazo habitual ronda los 5 a 8 días hábiles una vez que tengo todo el contenido necesario para empezar.',
  },
  {
    id: 'que-enviar',
    question: '¿Qué necesito enviar?',
    answer: 'Una explicación clara del negocio, logo y colores si ya existen, textos, imágenes y los datos de contacto, ubicación y horarios. Después de la primera conversación vas a recibir una lista exacta.',
  },
  {
    id: 'celulares',
    question: '¿Funciona en celulares?',
    answer: 'Sí. Cada sitio se diseña primero para celular y se prueba en tablet y PC antes de publicarse, porque la mayoría de tus clientes va a entrar desde el teléfono.',
  },
  {
    id: 'conectar-whatsapp',
    question: '¿Puedo conectar mi WhatsApp?',
    answer: 'Sí, el contacto directo por WhatsApp es parte de lo que incluye la web, para que tus clientes te escriban con un solo toque.',
  },
  {
    id: 'dominio-propio',
    question: '¿Puedo utilizar mi propio dominio?',
    answer: 'Sí. Te ayudo a elegirlo y configurarlo si todavía no lo tenés. El dominio queda a tu nombre, para que mantengas el control total.',
  },
  {
    id: 'modificar-despues',
    question: '¿Se puede modificar posteriormente?',
    answer: 'Sí. Después de publicada podés pedirme actualizaciones y pequeños cambios, o coordinar un plan de mantenimiento continuo.',
  },
  {
    id: 'funciones-adicionales',
    question: '¿Qué pasa si necesito funcionalidades adicionales?',
    answer: 'Funcionalidades como reservas, catálogos complejos, integraciones o sistemas a medida se cotizan aparte, según el alcance que tu negocio necesite.',
  },
]
