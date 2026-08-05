export const cimbraMeta = {
  eyebrow: 'Cimbra · Caso de diseño',
  headline: 'Tu semana de movimiento, en un panel.',
  intro:
    'Concepto de diseño desarrollado para demostrar mi proceso, criterio de diseño y capacidad técnica.',
}

export const problema = {
  eyebrow: '01 · El problema',
  title: 'Reservar una clase no debería sentirse como llenar un formulario.',
  body: [
    'El punto de partida ficticio: un estudio de movimiento con una agenda real (reformer, fuerza, movilidad) mostrada en una landing plana de texto y fotos, sin ninguna sensación de "estado en vivo" - cupos, horarios, progreso.',
    'El desafío de diseño real: tomar prestada la densidad organizada de un dashboard de producto (Stripe, Notion, Arc) para un sitio de cara al público, sin que se sienta frío ni corporativo - la calidez tenía que venir de la forma, no de fotos de stock.',
  ],
}

export const objetivos = [
  { n: '01', title: 'Densidad con orden', copy: 'Mostrar clases, cupos y planes juntos, en una grilla que se lee de un vistazo - sin esconder información detrás de acordeones.' },
  { n: '02', title: 'Superficies que se sienten físicas', copy: 'Neumorfismo real: tarjetas que parecen elevadas de la superficie, botones que se hunden al presionarlos.' },
  { n: '03', title: 'Un acento, mucha jerarquía', copy: 'Un solo color vivo para todo estado activo o interactivo, apoyado en peso tipográfico y elevación - no en una paleta amplia.' },
]

export const investigacion = {
  eyebrow: '02 · Investigación',
  title: 'Tableros, no folletos.',
  body: 'Se relevaron paneles de producto (Stripe Dashboard, Notion, Arc) y apps de estudios boutique - el hallazgo común: la sensación de "control" viene de ver todo el estado relevante junto (cupos, horarios, progreso) sin scroll innecesario. Se descartó el lenguaje de landing de wellness genérica (fotos de yoga en la playa, paletas pastel sin estructura) por no comunicar organización real.',
  findings: [
    'La elevación neumórfica (sombra clara + sombra oscura) lee "superficie física" mejor que cualquier borde o línea divisoria.',
    'Un estado "presionado" (sombra invertida) en botones y tabs comunica interactividad sin necesitar color adicional.',
    'La densidad de información se percibe como orden, no como saturación, cuando cada tarjeta resuelve una sola pregunta.',
  ],
}

export const paleta = [
  { name: 'Superficie', hex: '#ECEFF3', usage: 'Fondo principal, base neumórfica' },
  { name: 'Grafito', hex: '#1C222B', usage: 'Texto, contraste' },
  { name: 'Coral', hex: '#FF6B4A', usage: 'Único acento, estados activos' },
  { name: 'Niebla', hex: '#8890A0', usage: 'Texto secundario, íconos inactivos' },
]

export const tipografia = {
  display: { name: 'Bricolage Grotesque', role: 'Titulares y cifras del panel', sample: 'Cuatro clases, un solo lugar.' },
  body: { name: 'Hanken Grotesk', role: 'Texto de lectura e interfaz densa', sample: '12 instructores certificados.' },
}

export const designSystemNotes = [
  'Toda superficie elevada usa el mismo par de sombras (clara arriba-izquierda, oscura abajo-derecha) - nunca una sombra genérica de un solo lado.',
  'Los estados activos se hunden (sombra invertida) en vez de cambiar de color - el color queda reservado para el acento coral.',
  'Radio de borde constante de 24px en tarjetas grandes, 14px en controles - nunca esquinas rectas ni completamente circulares.',
  'Grid denso de 4 columnas en desktop; cada tarjeta resuelve una sola pregunta (qué, cuándo, cuántos cupos).',
]

export const componentes = [
  { name: 'Tarjeta elevada', desc: 'Sombra dual (clara/oscura), radio de 24px, sin borde visible.' },
  { name: 'Control segmentado', desc: 'Pill con estado activo hundido, usado para elegir plan o vista.' },
  { name: 'Botón primario', desc: 'Relleno coral, se hunde (sombra inset) al presionar.' },
  { name: 'Etiqueta de cupo', desc: 'Pill pequeña con el color de superficie, número en Bricolage.' },
]

export const showcaseStages = [
  { n: '01', label: 'Desktop', title: 'El panel completo, sin scroll.', copy: 'En desktop, agenda, cupos y plan activo conviven en una sola pantalla - como un dashboard real, no una landing que hay que recorrer.' },
  { n: '02', label: 'Tablet', title: 'Dos columnas, misma densidad.', copy: 'El grid de 4 columnas pasa a 2 sin perder ninguna tarjeta ni resumir información - solo se reordena la prioridad visual.' },
  { n: '03', label: 'Mobile', title: 'Una tarjeta a la vez, con el mismo peso.', copy: 'Las tarjetas se apilan pero conservan su elevación neumórfica completa - nada se aplana para "ahorrar espacio".' },
]

export const microinteracciones = [
  'Cada tarjeta se hunde levemente (scale + sombra invertida) al presionarla, simulando un botón físico.',
  'Las tarjetas entran con un resorte breve (spring, no ease) al hacer scroll - un gesto táctil, no una animación decorativa.',
  'El control segmentado desliza su indicador con inercia real en vez de saltar entre estados.',
]

export const proceso = [
  { n: '01', title: 'Relevamiento', copy: 'Mapear qué necesita ver una persona antes de reservar: horario, cupo, instructor, nivel.' },
  { n: '02', title: 'Wireframe de grilla', copy: 'Probar la densidad de información en escala de grises antes de sumar elevación o color.' },
  { n: '03', title: 'Sistema neumórfico', copy: 'Definir el par de sombras, el radio y el acento como reglas fijas, no como estilo por componente.' },
  { n: '04', title: 'Construcción', copy: 'Implementación real en Next.js, con el mismo estándar de performance y accesibilidad que el resto del portfolio.' },
]

export const resultado = {
  eyebrow: '05 · Resultado',
  title: 'Reservar se siente como abrir un panel de control.',
  body: 'El resultado es un sitio que muestra su propio estado - cupos, horarios, plan activo - en vez de pedir que el visitante lo adivine o lo busque. La calidez no viene de fotos genéricas, viene de superficies que responden al tacto.',
}

export const tecnologias = ['Next.js (App Router)', 'Tailwind CSS v4', 'Motion (Framer Motion)', 'TypeScript']

export const clases = [
  { name: 'Reformer', time: 'Lun a Vie · 7:00–20:00', spots: 4, level: 'Todos los niveles' },
  { name: 'Fuerza funcional', time: 'Lun, Mié, Vie · 18:30', spots: 2, level: 'Intermedio' },
  { name: 'Movilidad', time: 'Mar y Jue · 8:00', spots: 6, level: 'Todos los niveles' },
]

export const planes = [
  { name: 'Clase suelta', price: '$ 890', copy: 'Para probar sin compromiso.', featured: false },
  { name: 'Plan 8 clases', price: '$ 5.900', copy: 'Una clase por semana, vigencia de 45 días.', featured: true },
  { name: 'Ilimitado', price: '$ 8.900', copy: 'Todas las clases que sostengan tu ritmo.', featured: false },
]
