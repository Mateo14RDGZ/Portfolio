export type ConceptProject = {
  slug: string
  name: string
  category: string
  description: string
  image: string
  imageAlt: string
}

export const CONCEPT_PROJECTS: ConceptProject[] = [
  {
    slug: 'ombu-cafe',
    name: 'Ombú Café de Especialidad',
    category: 'Hospitalidad · Proyecto conceptual',
    description:
      'Una experiencia digital cálida para una cafetería de especialidad que necesita convertir búsquedas locales en visitas, reservas y consultas.',
    image: '/concepts/ombu-hero.webp',
    imageAlt: 'Barista preparando café filtrado en una cafetería conceptual',
  },
  {
    slug: 'aster-automoviles',
    name: 'Aster Automóviles Eléctricos',
    category: 'Movilidad eléctrica · Proyecto conceptual',
    description:
      'Una experiencia digital para un concesionario premium que necesita mostrar unidades, explicar tecnología y acompañar cada decisión de compra.',
    image: '/concepts/aster-vehicle-norte-s1.webp',
    imageAlt: 'SUV eléctrico conceptual en un showroom premium',
  },
  {
    slug: 'cimbra-estudio',
    name: 'Cimbra Estudio de Movimiento',
    category: 'Bienestar · Proyecto conceptual',
    description:
      'Una landing modular para un estudio de movimiento que necesita organizar clases, reservas y una práctica clara para cada persona.',
    image: '/concepts/cimbra-hero.webp',
    imageAlt: 'Estudio de movimiento y Pilates contemporáneo',
  },
]

export function getConceptProject(slug: string) {
  return CONCEPT_PROJECTS.find((project) => project.slug === slug)
}
