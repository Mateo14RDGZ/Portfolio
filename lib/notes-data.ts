export type Note = {
  slug: string
  title: string
  description: string
  readingTime: string
  publishedAt: string
  content: Array<{ heading: string; paragraphs: string[] }>
}

export const NOTES: Note[] = [
  {
    slug: 'una-web-que-convierte-visitas-en-consultas',
    title: 'Qué necesita una web para convertir visitas en consultas',
    description: 'La estructura, la velocidad y los próximos pasos que ayudan a que una visita no se pierda.',
    readingTime: '4 min de lectura',
    publishedAt: 'Agosto de 2026',
    content: [
      {
        heading: 'Empezá por una idea clara',
        paragraphs: [
          'Una persona debería entender qué hacés, para quién y qué puede hacer después de entrar al sitio. Si tiene que adivinarlo, la web está poniendo fricción antes de empezar.',
          'No se trata de decir todo arriba del pliegue. Se trata de ordenar lo importante y dar un siguiente paso concreto.',
        ],
      },
      {
        heading: 'La velocidad también comunica',
        paragraphs: [
          'Un sitio lento hace que una propuesta seria se sienta menos confiable. Imágenes optimizadas, código medido y una versión mobile cuidada cambian esa primera impresión.',
          'La prioridad no es sumar efectos. Es lograr que cada pantalla responda rápido y se lea bien.',
        ],
      },
      {
        heading: 'Mostrá una acción posible',
        paragraphs: [
          'Una web comercial necesita orientar. Consultar, reservar, pedir presupuesto o ver servicios son acciones distintas. Cada página debería priorizar una sin obligar a la persona a buscarla.',
        ],
      },
    ],
  },
  {
    slug: 'sitio-web-tienda-online-o-sistema-a-medida',
    title: 'Sitio web, tienda online o sistema a medida: cómo elegir',
    description: 'Una forma simple de definir qué tipo de desarrollo necesita un negocio antes de pedir presupuesto.',
    readingTime: '5 min de lectura',
    publishedAt: 'Agosto de 2026',
    content: [
      {
        heading: 'Cuando alcanza un sitio web',
        paragraphs: [
          'Un sitio institucional funciona bien cuando el objetivo es presentar servicios, generar confianza y facilitar el contacto. Es una buena base para emprendimientos y negocios que necesitan presencia profesional.',
        ],
      },
      {
        heading: 'Cuando el negocio necesita vender',
        paragraphs: [
          'Si hay catálogo, carrito, medios de pago, stock o pedidos, una tienda online permite centralizar la compra. La clave es definir bien el recorrido antes de sumar funcionalidades.',
        ],
      },
      {
        heading: 'Cuando el trabajo cotidiano pide una herramienta propia',
        paragraphs: [
          'Reservas, clientes, pagos, reportes, usuarios y automatizaciones suelen indicar que hace falta una solución a medida. No siempre implica hacer algo enorme. A veces una herramienta puntual ordena gran parte de la operación.',
        ],
      },
    ],
  },
  {
    slug: 'que-revisar-antes-de-publicar-un-sitio-web',
    title: 'Qué reviso antes de publicar un sitio web',
    description: 'Una lista práctica para llegar al lanzamiento con una web clara, rápida y lista para recibir consultas.',
    readingTime: '3 min de lectura',
    publishedAt: 'Agosto de 2026',
    content: [
      {
        heading: 'Contenido y recorridos',
        paragraphs: [
          'Reviso títulos, enlaces, formularios, textos de botones y las acciones que una persona puede tomar desde cada pantalla. El contenido tiene que responder preguntas, no ocupar espacio.',
        ],
      },
      {
        heading: 'Pantallas y rendimiento',
        paragraphs: [
          'Pruebo la web en tamaños de pantalla distintos, especialmente en celular. También reviso peso de imágenes, navegación, foco de teclado y tiempos de carga.',
        ],
      },
      {
        heading: 'La base técnica',
        paragraphs: [
          'Antes de publicar verifico metadatos, favicon, indexación, analítica, formularios y dominio. El lanzamiento es más tranquilo cuando esas piezas ya están resueltas.',
        ],
      },
    ],
  },
]

export function getNote(slug: string) {
  return NOTES.find((note) => note.slug === slug)
}
