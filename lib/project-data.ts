export type ConceptProject = {
  slug: string
  name: string
  category: string
  statement: string
  description: string
  objective: string
  image: string
  imageAlt: string
  theme: {
    page: string
    ink: string
    accent: string
    soft: string
  }
  nav: string[]
  services: Array<{ number: string; title: string; copy: string }>
  details: string[]
  closingTitle: string
  closingCopy: string
}

export const CONCEPT_PROJECTS: ConceptProject[] = [
  {
    slug: 'bruma-cafe',
    name: 'Bruma Café',
    category: 'Hospitalidad · Proyecto conceptual',
    statement: 'Café de origen, preparado sin apuro.',
    description:
      'Una experiencia digital cálida para una cafetería de especialidad que necesita convertir búsquedas locales en visitas, reservas y consultas.',
    objective: 'Reservas, menú y presencia local',
    image: '/concepts/bruma-cafe.webp',
    imageAlt: 'Barista preparando café filtrado en una cafetería conceptual',
    theme: { page: '#f0e5d1', ink: '#302218', accent: '#b75632', soft: '#d5c39f' },
    nav: ['Carta', 'Origen', 'Visitanos'],
    services: [
      { number: '01', title: 'Café de origen', copy: 'Una carta breve que cambia con cada cosecha y explica qué hay detrás de cada taza.' },
      { number: '02', title: 'Métodos', copy: 'Espresso, filtro y preparaciones frías, con una recomendación clara para cada visita.' },
      { number: '03', title: 'La pausa', copy: 'Un espacio tranquilo para encontrarse, trabajar o simplemente tomar un buen café.' },
    ],
    details: ['Carta fácil de consultar', 'Horarios visibles', 'Ubicación directa', 'Reserva por WhatsApp'],
    closingTitle: 'Tu mesa puede estar esperando.',
    closingCopy: 'Consultá horarios, encontranos y reservá antes de venir.',
  },
  {
    slug: 'linea-norte',
    name: 'Línea Norte',
    category: 'Movilidad eléctrica · Proyecto conceptual',
    statement: 'La próxima decisión se siente hoy.',
    description:
      'Una experiencia digital para un concesionario premium que necesita mostrar unidades, explicar tecnología y acompañar cada decisión de compra.',
    objective: 'Unidades, financiación y pruebas de manejo',
    image: '/concepts/linea-hero.webp',
    imageAlt: 'SUV eléctrico conceptual en un showroom premium',
    theme: { page: '#080a14', ink: '#eff3ff', accent: '#8cf1ff', soft: '#111936' },
    nav: ['Unidades', 'Tecnología', 'Comprar'],
    services: [
      { number: '01', title: 'Arquitectura', copy: 'Proyectos residenciales que responden al terreno, la luz y la manera de habitar.' },
      { number: '02', title: 'Interiores', copy: 'Materiales, equipamiento y detalle reunidos en una misma dirección visual.' },
      { number: '03', title: 'Dirección', copy: 'Seguimiento del proyecto para sostener sus decisiones desde el plano hasta la obra.' },
    ],
    details: ['Portfolio visual', 'Ficha de cada obra', 'Proceso explicado', 'Consulta inicial'],
    closingTitle: 'Construyamos desde una idea clara.',
    closingCopy: 'Contanos el lugar, la escala y la forma en la que querés vivirlo.',
  },
  {
    slug: 'aura-dental',
    name: 'Nexo Movimiento',
    category: 'Bienestar · Proyecto conceptual',
    statement: 'Tu cuerpo sabe el camino.',
    description:
      'Una landing modular para un estudio de movimiento que necesita organizar clases, reservas y una práctica clara para cada persona.',
    objective: 'Clases, reservas y práctica',
    image: '/concepts/nexo-hero.webp',
    imageAlt: 'Estudio de movimiento y Pilates contemporáneo',
    theme: { page: '#f8f9f6', ink: '#14212e', accent: '#2364e6', soft: '#d9eeea' },
    nav: ['Clases', 'Estudio', 'Agenda'],
    services: [
      { number: '01', title: 'Prevención', copy: 'Controles y cuidados periódicos explicados con un lenguaje sencillo y cercano.' },
      { number: '02', title: 'Restauración', copy: 'Alternativas para recuperar función y estética con un plan de tratamiento claro.' },
      { number: '03', title: 'Estética', copy: 'Tratamientos pensados para lograr resultados naturales y acompañados.' },
    ],
    details: ['Servicios claros', 'Preguntas frecuentes', 'Equipo profesional', 'Agenda visible'],
    closingTitle: 'Tu próxima consulta, sin vueltas.',
    closingCopy: 'Elegí un horario y contanos brevemente qué necesitás.',
  },
]

export function getConceptProject(slug: string) {
  return CONCEPT_PROJECTS.find((project) => project.slug === slug)
}
