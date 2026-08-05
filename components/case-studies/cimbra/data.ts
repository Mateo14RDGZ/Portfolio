export const cimbraMeta = {
  eyebrow: 'Cimbra · Caso de diseño',
  headline: 'Tu semana de movimiento, en un panel.',
  intro:
    'Concepto de diseño desarrollado para demostrar mi proceso, criterio de diseño y capacidad técnica.',
}

export const navItems = [
  { value: 'inicio', label: 'Inicio' },
  { value: 'sistema', label: 'Sistema' },
  { value: 'changelog', label: 'Changelog' },
  { value: 'notas', label: 'Notas' },
] as const

export type PanelValue = (typeof navItems)[number]['value']

export const staffActivo = {
  nombre: 'Sofía Bianchi',
  rol: 'Recepción',
  iniciales: 'SB',
}

// Lun a sáb, 7:00-20:00 - usado para calcular el estado "Abierto ahora" en vivo.
export const horarioEstudio = { diasAbiertos: [1, 2, 3, 4, 5, 6], apertura: 7, cierre: 20 }

// --- Inicio ---

export const onboarding = [
  { id: 'sistema', label: 'Revisá el sistema de diseño', panel: 'sistema' as PanelValue },
  { id: 'changelog', label: 'Mirá cómo se construyó, paso a paso', panel: 'changelog' as PanelValue },
  { id: 'notas', label: 'Leé por qué se tomó cada decisión', panel: 'notas' as PanelValue },
]

export const stats = [
  { label: 'Tiempo de reserva', value: '3.2 min' },
  { label: 'Instructores certificados', value: '12' },
]

export type Clase = {
  id: string
  name: string
  hora: string
  instructor: string
  nivel: (typeof NIVELES)[number]
  cuposDisponibles: number
  capacidad: number
}

export const HORARIOS = ['07:00', '08:00', '09:30', '12:00', '15:00', '18:30', '20:00'] as const

export const NIVELES = ['Todos los niveles', 'Intermedio', 'Avanzado'] as const

export const nivelFiltros = ['Todas', ...NIVELES] as const

export const clasesIniciales: Clase[] = [
  { id: 'reformer', name: 'Reformer', hora: '07:00', instructor: 'Bruno Ledesma', nivel: 'Todos los niveles', cuposDisponibles: 4, capacidad: 10 },
  { id: 'movilidad', name: 'Movilidad', hora: '08:00', instructor: 'Nadia Ríos', nivel: 'Todos los niveles', cuposDisponibles: 6, capacidad: 8 },
  { id: 'hiit', name: 'HIIT', hora: '09:30', instructor: 'Camila Suárez', nivel: 'Avanzado', cuposDisponibles: 0, capacidad: 6 },
  { id: 'fuerza', name: 'Fuerza funcional', hora: '18:30', instructor: 'Bruno Ledesma', nivel: 'Intermedio', cuposDisponibles: 2, capacidad: 8 },
]

// --- Sistema ---

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
  'Responsive: 4 columnas en desktop pasan a 2 en tablet y 1 en mobile - nunca se aplana la elevación para "ahorrar espacio", solo se reordena la densidad.',
]

export const componentes = [
  { name: 'Tarjeta elevada', desc: 'Sombra dual (clara/oscura), radio de 24px, sin borde visible.', usos: 23 },
  { name: 'Control segmentado', desc: 'Pill con estado activo hundido, usado para elegir plan, nivel u horario.', usos: 6 },
  { name: 'Botón primario', desc: 'Relleno coral, se hunde (sombra inset) al presionar.', usos: 11 },
  { name: 'Tab', desc: 'Cambia de panel al hacer click o tap; con flechas si se navega por teclado, sin animación - los atajos de teclado no deberían esperar a una transición.', usos: 8 },
]

export const sistemaMeta = {
  mantenedor: 'Equipo de producto de Cimbra',
  colaboradores: ['SB', 'BL', 'NR', 'CS'],
  notaUso: 'Referencia obligatoria antes de construir o modificar un componente del panel - cualquier superficie nueva se valida contra estas reglas antes de salir a producción.',
}

export const planes = [
  { name: 'Clase suelta', price: '$ 890', copy: 'Para probar sin compromiso.', featured: false },
  { name: 'Plan 8 clases', price: '$ 5.900', copy: 'Una clase por semana, vigencia de 45 días.', featured: true },
  { name: 'Ilimitado', price: '$ 8.900', copy: 'Todas las clases que sostengan tu ritmo.', featured: false },
]

// --- Changelog ---

export const changelog = [
  { version: 'v1.0', date: '12 mar', title: 'Relevamiento', copy: 'Mapear qué necesita ver una persona antes de reservar: horario, cupo, instructor, nivel.', tag: 'Research', autor: 'SB' },
  { version: 'v1.1', date: '19 mar', title: 'Wireframe de grilla', copy: 'Probar la densidad de información en escala de grises antes de sumar elevación o color.', tag: 'Diseño', autor: 'NR' },
  { version: 'v1.2', date: '2 abr', title: 'Sistema neumórfico', copy: 'Definir el par de sombras, el radio y el acento como reglas fijas, no como estilo por componente.', tag: 'Sistema', autor: 'NR' },
  { version: 'v2.0', date: '18 abr', title: 'Construcción', copy: 'Implementación real en Next.js, con el mismo estándar de performance y accesibilidad que el resto del portfolio.', tag: 'Build', autor: 'CS' },
]

// --- Notas ---

export const notas = {
  contexto: {
    title: 'Reservar una clase no debería sentirse como llenar un formulario.',
    body: [
      'El punto de partida ficticio: un estudio de movimiento con una agenda real (reformer, fuerza, movilidad) mostrado en una landing plana de texto y fotos, sin ninguna sensación de "estado en vivo" - cupos, horarios, progreso.',
      'El desafío de diseño real: tomar prestada la densidad organizada de un dashboard de producto (Stripe, Notion, Arc) para un sitio de cara al público, sin que se sienta frío ni corporativo - la calidez tenía que venir de la forma, no de fotos de stock.',
    ],
    autor: 'SB',
    fecha: '10 mar',
  },
  investigacion: {
    title: 'Tableros, no folletos.',
    body: 'Se relevaron paneles de producto (Stripe Dashboard, Notion, Arc) y apps de estudios boutique - el hallazgo común: la sensación de "control" viene de ver todo el estado relevante junto, sin scroll innecesario. Se descartó el lenguaje de landing de wellness genérica (fotos de yoga en la playa, paletas pastel sin estructura) por no comunicar organización real.',
    findings: [
      'La elevación neumórfica lee "superficie física" mejor que cualquier borde o línea divisoria.',
      'Un estado "presionado" en botones y tabs comunica interactividad sin necesitar color adicional.',
      'La densidad de información se percibe como orden, no como saturación, cuando cada tarjeta resuelve una sola pregunta.',
    ],
    autor: 'NR',
    fecha: '19 mar',
  },
  resultado: {
    title: 'Reservar se siente como abrir un panel de control.',
    body: 'El resultado es un sitio que muestra su propio estado - cupos, horarios, plan activo - en vez de pedir que el visitante lo adivine o lo busque. La calidez no viene de fotos genéricas, viene de superficies que responden al tacto.',
    autor: 'CS',
    fecha: '18 abr',
  },
  tecnologias: ['Next.js (App Router)', 'Tailwind CSS v4', 'Motion (Framer Motion)', 'Base UI', 'TypeScript'],
}

export const cta = {
  pregunta: '¿Querés algo así para tu negocio?',
  linkLabel: 'Contame tu idea',
}

export const quickActions = [
  { id: 'buscar', label: 'Buscar en el panel' },
  { id: 'crear-clase', label: 'Crear una clase', panel: 'inicio' as PanelValue },
  { id: 'sistema', label: 'Ver sistema de diseño', panel: 'sistema' as PanelValue },
  { id: 'contacto', label: 'Contactar al equipo', href: '/#contact' },
]
