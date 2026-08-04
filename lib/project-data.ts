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
    slug: 'bruma-cafe',
    name: 'Bruma Café',
    category: 'Hospitalidad · Caso de diseño',
    description:
      'Una identidad editorial y minimalista, inspirada en el diseño nórdico, para una cafetería de especialidad que necesita transmitir calma y calidad antes de la primera visita.',
    image: '/concepts/ombu-hero.webp',
    imageAlt: 'Taza de café de especialidad sobre una barra de piedra, luz natural',
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
