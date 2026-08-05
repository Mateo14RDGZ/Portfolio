export const brumaMeta = {
  eyebrow: 'Bruma Café · Caso de diseño',
  headline: 'Diseñar en silencio.',
  intro:
    'Concepto de diseño desarrollado para demostrar mi proceso, criterio de diseño y capacidad técnica.',
}

export const indice = [
  { id: 'bruma-premisa', label: 'La premisa' },
  { id: 'bruma-referencias', label: 'Referencias' },
  { id: 'bruma-sistema', label: 'El sistema' },
  { id: 'bruma-composicion', label: 'La composición' },
  { id: 'bruma-cierre', label: 'Cómo se hizo' },
]

export const premisa = {
  kicker: 'La premisa',
  lede: 'Una cafetería de especialidad necesitaba verse tan cuidada como su café.',
  paragraphs: [
    'El punto de partida ficticio: un local pequeño, buen producto, cero presencia digital. La web tenía que resolver la primera impresión antes de que alguien cruzara la puerta - sin fotos de stock, sin plantillas genéricas, sin gritar para llamar la atención.',
    'El desafío de diseño real era otro: ¿cómo se comunica calma en una pantalla, un medio que por defecto empuja a llenar cada espacio?',
  ],
  objetivos: [
    { lede: 'Silencio antes que ruido.', copy: 'Ninguna sección debía competir por atención. Una idea por pantalla, con aire suficiente para respirarla.' },
    { lede: 'La fotografía como protagonista.', copy: 'El texto acompaña a la imagen, no al revés. La luz natural y la textura hacen el trabajo que otros sitios le piden a la tipografía grande.' },
    { lede: 'Una identidad, no una plantilla.', copy: 'Nada de componentes genéricos de e-commerce gastronómico. Cada elemento debía sentirse dibujado para esta marca en particular.' },
  ],
}

export const referencias = {
  kicker: 'Referencias',
  lede: 'Referencias, no atajos.',
  paragraph:
    'Se relevó diseño editorial escandinavo, identidades de estudios de café de especialidad y fotografía de producto minimalista - no para copiar una estética puntual, sino para entender qué decisiones (tipografía comedida, paletas de un solo acento, composición asimétrica) hacen que un diseño se sienta silencioso en vez de simplemente vacío.',
  hallazgos: [
    'La calma percibida depende más del ritmo del scroll que de la cantidad de blanco en pantalla.',
    'Un solo acento de color, usado con moderación, comunica más lujo que una paleta amplia.',
    'La tipografía serif editorial funciona mejor en tamaños grandes y con mucho interlineado - a tamaños chicos pierde el gesto que la hace especial.',
  ],
  imagen: {
    src: '/concepts/ombu-cafe-editorial.webp',
    alt: 'Barista preparando café de especialidad sobre una barra de piedra',
    caption: 'Referencia de fotografía de producto relevada durante la investigación.',
  },
}

export const sistema = {
  kicker: 'El sistema',
  lede: 'Un sistema, no una decoración.',
  paragraph:
    'La paleta se redujo a cuatro colores: papel, madera clara, tinta y un único acento de café tostado, usado con moderación en toda la interfaz - nunca decorativo, siempre funcional, botones, links y highlights comparten el mismo tono. La tipografía combina Petrona para titulares y momentos editoriales con Work Sans para texto de lectura e interfaz.',
  reglas: [
    'Sin bordes redondeados: los cortes rectos refuerzan el carácter editorial e impreso.',
    'Sin sombras: la jerarquía se resuelve con espaciado y tamaño, nunca con elevación falsa.',
    'Grid de 12 columnas en desktop, márgenes generosos que nunca bajan del 6% del ancho de pantalla.',
  ],
  paleta: [
    { name: 'Papel', hex: '#F3F0EA' },
    { name: 'Madera clara', hex: '#C9B79C' },
    { name: 'Tinta', hex: '#1D1B18' },
    { name: 'Café tostado', hex: '#4A3324' },
  ],
  tipografia: {
    display: { name: 'Petrona', sample: 'Preparado con calma.' },
    body: { name: 'Work Sans', sample: 'Una pausa breve, una taza bien hecha.' },
  },
  componentes:
    'El botón primario es solo un borde de 1px que se llena recién al pasar el cursor. El enlace de texto se subraya, y ese subrayado se despega del texto al pasar por encima en vez de simplemente cambiar de color. Ninguna cita lleva comillas decorativas: la itálica grande ya hace ese trabajo.',
}

export const composicion = {
  kicker: 'La composición',
  lede: 'La misma calma, en cualquier tamaño.',
  paragraph:
    'En desktop, la fotografía ocupa hasta el 60% del viewport y el texto vive en una columna angosta a un costado, como una revista abierta. En tablet, el grid pasa de dos columnas a una sola sin perder los márgenes generosos. En mobile, las fotos pasan a formato vertical propio - no un recorte forzado del desktop - y el texto conserva su jerarquía completa.',
  etapas: [
    { n: '01', label: 'Desktop', nota: 'Columna angosta junto a fotografía a página completa.' },
    { n: '02', label: 'Tablet', nota: 'Una sola columna, mismo ritmo y márgenes.' },
    { n: '03', label: 'Mobile', nota: 'Fotos verticales propias, jerarquía intacta.' },
  ],
  microinteracciones: [
    'Las fotografías tienen un parallax sutil al hacer scroll - nunca más de 12px de desplazamiento.',
    'Las ideas aparecen con un fundido lento, no un slide-up brusco, para sostener la calma incluso en el movimiento.',
  ],
}

export const cierre = {
  kicker: 'Cómo se hizo',
  lede: 'Cuatro etapas, sin atajos.',
  etapas: [
    { n: '01', title: 'Relevamiento', copy: 'Definir qué necesitaba probar la marca en los primeros tres segundos de visita.' },
    { n: '02', title: 'Wireframe', copy: 'Estructura en blanco y negro para validar el ritmo de lectura antes de sumar estilo.' },
    { n: '03', title: 'Sistema visual', copy: 'Paleta, tipografía y componentes definidos como un sistema, no página por página.' },
    { n: '04', title: 'Construcción', copy: 'Implementación real en Next.js, con el mismo estándar de performance y accesibilidad que el resto del portfolio.' },
  ],
  resultado:
    'El resultado es una página que se recorre, no se escanea: cada idea resuelve una sola pregunta antes de pasar a la siguiente. Ninguna pantalla obliga a elegir dónde mirar primero.',
  tecnologias: ['Next.js (App Router)', 'Tailwind CSS v4', 'Motion (Framer Motion)', 'TypeScript'],
}

export const cta = {
  pregunta: '¿Querés algo así para tu negocio?',
  linkLabel: 'Contame tu idea',
}
