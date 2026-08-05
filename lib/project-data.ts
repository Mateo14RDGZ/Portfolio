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
    slug: 'astra',
    name: 'Astra',
    category: 'Movilidad eléctrica · Caso de diseño',
    description:
      'Un showroom espacial para una marca de autos eléctricos premium, donde la ficha técnica se explora como si estuviera flotando frente a vos.',
    image: '/concepts/aster-vehicle-norte-s1.webp',
    imageAlt: 'SUV eléctrico conceptual en un showroom premium',
  },
  {
    slug: 'cimbra-estudio',
    name: 'Cimbra Estudio de Movimiento',
    category: 'Bienestar · Caso de diseño',
    description:
      'Un panel neumórfico y denso para un estudio de movimiento, donde clases, cupos y planes se organizan con la claridad de un dashboard de producto.',
    image: '/concepts/cimbra-hero.webp',
    imageAlt: 'Estudio de movimiento y Pilates contemporáneo',
  },
]

export function getConceptProject(slug: string) {
  return CONCEPT_PROJECTS.find((project) => project.slug === slug)
}
