export const astraMeta = {
  eyebrow: 'Astra · Caso de diseño',
  headline: 'La ficha técnica, flotando frente a vos.',
  intro:
    'Concepto de diseño desarrollado para demostrar mi proceso, criterio de diseño y capacidad técnica.',
}

export const escenas = [
  { id: 'objeto', n: '01', label: 'El objeto' },
  { id: 'dato', n: '02', label: 'El dato' },
  { id: 'sala', n: '03', label: 'La sala' },
  { id: 'profundidad', n: '04', label: 'La profundidad' },
  { id: 'cierre', n: '05', label: 'Cierre' },
] as const

export type EscenaId = (typeof escenas)[number]['id']

/**
 * Short, optional context per scene - available behind an "i" toggle, never
 * shown by default. The brief was explicit: the visitor discovers, doesn't
 * read. This is the opt-in layer for anyone who still wants the reasoning.
 */
export const info: Record<EscenaId, string> = {
  objeto:
    'El punto de partida ficticio: una marca de movilidad eléctrica con datos técnicos sólidos escondidos detrás de botones de "cotizar ahora". Acá los datos están al frente, no detrás de un formulario.',
  dato:
    'Se relevaron interfaces de computación espacial, configuradores premium y sitios de hardware técnico - la sensación de "futuro" viene de la profundidad y la luz, nunca del color saturado.',
  sala:
    'Sin bordes redondeados grandes, profundidad en capas de vidrio, un único acento frío para todo dato - nunca color decorativo. Reglas fijas, no estilo por componente.',
  profundidad:
    'La perspectiva se reduce a medida que la pantalla se achica, pero el vidrio y el blur se conservan como firma visual en cualquier tamaño - nunca se aplanan para "ahorrar espacio".',
  cierre:
    'El resultado es un showroom donde comparar unidades no interrumpe la experiencia premium - la sensación de tecnología de punta viene de la profundidad y la luz, no de un acento neón.',
}

export const paleta = [
  { name: 'Niebla', hex: '#F1F3F6', usage: 'Fondo principal, sala clara' },
  { name: 'Grafito', hex: '#10151B', usage: 'Texto, sala oscura' },
  { name: 'Vidrio', hex: '#FFFFFF', usage: 'Paneles flotantes, 45–65% opacidad' },
  { name: 'Acero ártico', hex: '#4F7FA0', usage: 'Único acento, datos y foco' },
]

export const tipografia = {
  display: { name: 'Geologica', role: 'Titulares y cifras técnicas', sample: 'Cada dato, a la vista.' },
  body: { name: 'Manrope', role: 'Texto de lectura e interfaz', sample: '612 km de autonomía estimada.' },
}

export const designSystemNotes = [
  'Sin bordes redondeados grandes: los paneles usan esquinas rectas o de 4px, como una pieza de instrumentación.',
  'La profundidad se construye en capas: fondo, panel de vidrio, dato flotante - nunca más de 3 niveles a la vez.',
  'Un único acento (acero ártico) para todo dato, número o estado interactivo - nunca color decorativo.',
]

export const componentes = [
  { name: 'Panel de vidrio', desc: 'Fondo semitransparente, blur de 24px, borde de 1px al 8% de opacidad.' },
  { name: 'Tarjeta de especificación', desc: 'Cifra grande en Geologica, unidad en versalitas, siempre flotando sobre su propio panel.' },
  { name: 'Botón primario', desc: 'Relleno grafito sólido, sin gradiente ni brillo - el contraste es la jerarquía.' },
]

export const vehiculos = [
  { id: 'arco-e9', name: 'Arco E-9', type: 'SUV eléctrico', range: 612, accel: 4.3, charge: 350, image: '/concepts/aster-hero.webp' },
  { id: 'norte-s1', name: 'Norte S1', type: 'Gran turismo', range: 540, accel: 3.8, charge: 320, image: '/concepts/aster-vehicle-norte-s1.webp' },
  { id: 'vector-4', name: 'Vector 4', type: 'SUV familiar', range: 480, accel: 5.6, charge: 280, image: '/concepts/aster-vehicle-vector-4.webp' },
] as const

/**
 * Scene 1's real discovery mechanic. Positions are percentages within the
 * hero image so hotspots track the art regardless of viewport. Tilt on the
 * image is purely decorative/atmospheric on top of this - these tap targets
 * work identically with mouse, touch or keyboard, so mobile loses nothing.
 */
export const hotspots = [
  { id: 'bateria', x: 30, y: 70, label: 'Batería', value: 612, suffix: ' km', copy: 'Autonomía estimada en ciclo mixto.' },
  { id: 'motor', x: 70, y: 58, label: 'Motor', value: 4.3, suffix: ' s', copy: '0 a 100 km/h.' },
  { id: 'carga', x: 50, y: 32, label: 'Carga rápida', value: 350, suffix: ' kW', copy: 'Potencia máxima en carga rápida.' },
]

export const camaras = [
  { id: 'desktop', label: 'Escritorio', layers: 3, title: 'La sala completa, en perspectiva.', copy: 'Los paneles de vidrio se apilan con profundidad real, como una sala de exhibición vista de frente.' },
  { id: 'tablet', label: 'Tablet', layers: 2, title: 'Menos capas, misma sala.', copy: 'La perspectiva se reduce a dos capas - la sensación de profundidad se mantiene sin saturar una pantalla más chica.' },
  { id: 'mobile', label: 'Mobile', layers: 1, title: 'Un panel a la vez, sin perder el vidrio.', copy: 'El blur y el borde de vidrio se conservan como firma visual, aunque la perspectiva 3D se retira.' },
] as const

export const proceso = [
  { n: '01', title: 'Relevamiento', copy: 'Qué datos técnicos pesan más en una decisión de compra eléctrica.' },
  { n: '02', title: 'Wireframe espacial', copy: 'Jerarquía de capas (fondo/panel/dato) en escala de grises antes de sumar vidrio o color.' },
  { n: '03', title: 'Sistema visual', copy: 'Paleta, tipografía y reglas de profundidad como sistema replicable por unidad.' },
  { n: '04', title: 'Construcción', copy: 'Next.js con CSS 3D y motion/react, sin WebGL ni librerías 3D pesadas.' },
]

export const cta = {
  pregunta: '¿Querés algo así para tu producto?',
  linkLabel: 'Contame tu idea',
}

export const tecnologias = ['Next.js (App Router)', 'Tailwind CSS v4', 'Motion (Framer Motion)', 'CSS 3D Transforms', 'TypeScript']
