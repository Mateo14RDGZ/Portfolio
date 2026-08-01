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
    category: 'Arquitectura · Proyecto conceptual',
    statement: 'Espacios pensados desde el lugar.',
    description:
      'Una landing editorial para un estudio de arquitectura que necesita presentar obra, criterio y proceso sin competir con sus propias imágenes.',
    objective: 'Portfolio, proceso y consultas calificadas',
    image: '/concepts/linea-norte.webp',
    imageAlt: 'Casa contemporánea conceptual frente a un paisaje costero uruguayo',
    theme: { page: '#e7e3dc', ink: '#242522', accent: '#9a5d3b', soft: '#c7c2b6' },
    nav: ['Obras', 'Estudio', 'Contacto'],
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
    name: 'Aura Dental',
    category: 'Salud · Proyecto conceptual',
    statement: 'Cuidar tu sonrisa puede sentirse simple.',
    description:
      'Una web clara y serena para una clínica odontológica que necesita transmitir confianza, explicar tratamientos y facilitar la agenda.',
    objective: 'Confianza, servicios y agenda',
    image: '/concepts/clinica-aura.webp',
    imageAlt: 'Consultorio odontológico conceptual, luminoso y de estética serena',
    theme: { page: '#edf2ec', ink: '#17332f', accent: '#5b8580', soft: '#cbdcd7' },
    nav: ['Tratamientos', 'Equipo', 'Agenda'],
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
