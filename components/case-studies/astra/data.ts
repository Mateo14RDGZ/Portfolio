export const astraMeta = {
  eyebrow: 'Astra · Caso de diseño',
  headline: 'La ficha técnica, flotando frente a vos.',
  intro:
    'Concepto de diseño desarrollado para demostrar mi proceso, criterio de diseño y capacidad técnica.',
}

export const problema = {
  eyebrow: '01 · El problema',
  title: 'Los sitios de autos eléctricos premium venden antes de explicar.',
  body: [
    'El punto de partida ficticio: una marca de movilidad eléctrica con datos técnicos sólidos (autonomía, carga, rendimiento) escondidos detrás de botones de "cotizar ahora". El visitante llega a comparar y se encuentra con un embudo de venta.',
    'El desafío de diseño real: lograr que explorar una ficha técnica se sienta tan premium como manejar el auto - sin recurrir al lenguaje visual de cabina de videojuego (neón, degradés violeta, HUD futurista) que domina esta categoría.',
  ],
}

export const objetivos = [
  { n: '01', title: 'Los datos primero', copy: 'Autonomía, carga y rendimiento visibles sin un solo clic de por medio - la comparación es el producto, no el obstáculo antes de él.' },
  { n: '02', title: 'Profundidad sin ruido', copy: 'Espacialidad lograda con capas de vidrio, blur y perspectiva CSS - nunca con motion 3D real ni paletas cyberpunk.' },
  { n: '03', title: 'Un showroom, no un catálogo', copy: 'Cada unidad se explora como un objeto suspendido en una sala, no como una fila de una tabla de precios.' },
]

export const investigacion = {
  eyebrow: '02 · Investigación',
  title: 'Vidrio, no neón.',
  body: 'Se relevaron interfaces de computación espacial (visionOS), configuradores automotrices premium y sitios de hardware técnico (Framework, Teenage Engineering) - el hallazgo común: la sensación de "futuro" no viene del color, viene de la profundidad y la luz. Se descartó activamente el lenguaje visual dominante en concesionarias eléctricas (fondos casi negros, acentos cian/violeta) por sentirse genérico dentro de la categoría.',
  findings: [
    'Un fondo casi blanco con capas de vidrio lee "premium" con más eficacia que un fondo oscuro con acentos neón.',
    'La profundidad se percibe mejor con blur graduado en varias capas que con una sola sombra proyectada.',
    'Un único acento de color frío (no saturado) alcanza para todo el sistema de datos, sin necesitar una paleta semántica completa.',
  ],
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
  'Grid de 12 columnas en desktop; los paneles de vidrio nunca superan el 70% de opacidad de fondo, para que la profundidad siga siendo legible.',
]

export const componentes = [
  { name: 'Panel de vidrio', desc: 'Fondo semitransparente, blur de 24px, borde de 1px al 8% de opacidad.' },
  { name: 'Tarjeta de especificación', desc: 'Cifra grande en Geologica, unidad en versalitas, siempre flotando sobre su propio panel.' },
  { name: 'Selector de unidad', desc: 'Tabs con indicador que se desliza en profundidad, no en superficie.' },
  { name: 'Botón primario', desc: 'Relleno grafito sólido, sin gradiente ni brillo - el contraste es la jerarquía.' },
]

export const showcaseStages = [
  { n: '01', label: 'Desktop', title: 'La sala completa, en perspectiva.', copy: 'En desktop, los paneles de vidrio se apilan con profundidad real (perspective + translateZ), como una sala de exhibición vista de frente.' },
  { n: '02', label: 'Tablet', title: 'Menos capas, misma sala.', copy: 'La perspectiva se reduce a dos capas en vez de tres - la sensación de profundidad se mantiene sin saturar una pantalla más chica.' },
  { n: '03', label: 'Mobile', title: 'Un panel a la vez, sin perder el vidrio.', copy: 'Los paneles se apilan en scroll vertical; el blur y el borde de vidrio se conservan como firma visual, aunque la perspectiva 3D se retira.' },
]

export const microinteracciones = [
  'Los paneles de vidrio inclinan levemente (rotateX/rotateY) al pasar el cursor, simulando profundidad sin usar WebGL.',
  'Las cifras técnicas hacen scroll-count al entrar en viewport, reforzando que son datos reales, no decoración.',
  'El fondo cambia de sala clara a sala oscura al llegar a la sección de tecnología, con una transición de 1.2s en vez de un corte abrupto.',
]

export const proceso = [
  { n: '01', title: 'Relevamiento', copy: 'Mapear qué datos técnicos pesan más en una decisión de compra de un vehículo eléctrico.' },
  { n: '02', title: 'Wireframe espacial', copy: 'Probar la jerarquía de capas (fondo/panel/dato) en escala de grises antes de sumar vidrio o color.' },
  { n: '03', title: 'Sistema visual', copy: 'Paleta, tipografía y reglas de profundidad definidas como un sistema replicable por unidad.' },
  { n: '04', title: 'Construcción', copy: 'Implementación real en Next.js con CSS 3D y motion/react, sin WebGL ni librerías 3D pesadas.' },
]

export const resultado = {
  eyebrow: '05 · Resultado',
  title: 'Explorar la ficha técnica se siente como el producto.',
  body: 'El resultado es un showroom donde comparar unidades no interrumpe la experiencia premium - la sensación de tecnología de punta viene de la profundidad, la luz y el vidrio, no de un acento neón. Cada dato técnico queda a la vista antes de pedir nada a cambio.',
}

export const tecnologias = ['Next.js (App Router)', 'Tailwind CSS v4', 'Motion (Framer Motion)', 'CSS 3D Transforms', 'TypeScript']

export const vehiculos = [
  { name: 'Arco E-9', type: 'SUV eléctrico', range: '612', accel: '4.3', charge: '350', image: '/concepts/aster-hero.webp' },
  { name: 'Norte S1', type: 'Gran turismo', range: '540', accel: '3.8', charge: '320', image: '/concepts/aster-vehicle-norte-s1.webp' },
  { name: 'Vector 4', type: 'SUV familiar', range: '480', accel: '5.6', charge: '280', image: '/concepts/aster-vehicle-vector-4.webp' },
]
