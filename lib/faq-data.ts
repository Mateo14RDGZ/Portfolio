export const FAQ_ITEMS = [
  {
    id: 'pagos',
    question: '¿Cómo se realizan los pagos?',
    answer:
      'Trabajo con un anticipo del 50% para reservar el proyecto y el 50% restante antes de la publicación. En desarrollos grandes, el pago puede dividirse por etapas definidas en la propuesta. También podés pagar con Mercado Pago, hasta en 12 cuotas según lo que habilite tu tarjeta, con el interés que corresponda a esa financiación.',
  },
  {
    id: 'tiempos',
    question: '¿Cuánto tarda un sitio web?',
    answer:
      'Un sitio CLASSIC suele requerir entre 2 y 3 semanas; GOLD, entre 4 y 6 semanas. Los proyectos BLACK se estiman después de definir sus funciones. Los plazos comienzan cuando recibo el contenido necesario.',
  },
  {
    id: 'revisiones',
    question: '¿Cuántas revisiones incluye el proyecto?',
    answer:
      'Cada propuesta indica sus rondas de revisión. GOLD incluye dos rondas completas. En todos los casos, primero validamos estructura y diseño para evitar cambios costosos al final.',
  },
  {
    id: 'mantenimiento',
    question: '¿Ofrecés mantenimiento después del lanzamiento?',
    answer:
      'Sí. Puedo ocuparme de actualizaciones, copias de seguridad, pequeños cambios y mejoras continuas mediante un plan mensual. También puedo entregarte el sitio listo para que lo gestiones por tu cuenta.',
  },
  {
    id: 'dominio',
    question: '¿El dominio y el alojamiento están incluidos?',
    answer:
      'Te ayudo a elegirlos y configurarlos. El dominio y los servicios externos quedan a tu nombre y se pagan directamente al proveedor, para que mantengas el control total del proyecto.',
  },
  {
    id: 'textos',
    question: '¿Quién prepara los textos y las imágenes?',
    answer:
      'Podés entregarme el contenido terminado o podemos trabajarlo juntos. Organizo y adapto el material para la web; si hace falta fotografía, redacción extensa o identidad de marca, lo cotizo por separado.',
  },
  {
    id: 'que-necesito',
    question: '¿Qué necesito entregar para comenzar?',
    answer:
      'Una explicación clara del negocio, el objetivo del sitio, logo y colores si ya existen, textos, imágenes y accesos necesarios. Después de la primera llamada vas a recibir una lista exacta y sencilla.',
  },
  // Mobile-only additions (Phase 4): not shown in the desktop FAQ, which stays
  // limited to the 7 items above. Faq.tsx filters these out for sm+ viewports.
  {
    id: 'proceso',
    question: '¿Cómo es el proceso de trabajo?',
    answer:
      'Empezamos con una consulta inicial sin costo. Te envío una propuesta clara con alcance, plazo y presupuesto. Diseñamos y desarrollamos con avances visibles en el camino. Al final coordinamos la publicación y quedo disponible para acompañarte después del lanzamiento.',
  },
  {
    id: 'modalidad-remota',
    question: '¿Trabajás de forma remota o solo en Montevideo?',
    answer:
      'Trabajo 100% remoto con clientes de todo Uruguay y fuera del país. Toda la comunicación es por videollamada y mensajes, sin necesidad de reuniones presenciales.',
  },
] as const

/** The compact subset shown on mobile Home, in display order. Desktop shows every item except these two additions. */
export const MOBILE_FAQ_IDS = ['pagos', 'tiempos', 'que-necesito', 'proceso', 'modalidad-remota'] as const
