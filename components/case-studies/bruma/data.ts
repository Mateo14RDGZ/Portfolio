export const brumaMeta = {
  eyebrow: 'Bruma Café · Caso de diseño',
  headline: 'Diseñar en silencio.',
  intro:
    'Concepto de diseño desarrollado para demostrar mi proceso, criterio de diseño y capacidad técnica.',
}

export const problema = {
  eyebrow: '01 · El problema',
  title: 'Una cafetería de especialidad necesitaba verse tan cuidada como su café.',
  body: [
    'El punto de partida ficticio: un local pequeño, buen producto, cero presencia digital. La web tenía que resolver la primera impresión antes de que alguien cruzara la puerta - sin fotos de stock, sin plantillas genéricas, sin gritar para llamar la atención.',
    'El desafío de diseño real era otro: ¿cómo se comunica calma en una pantalla, un medio que por defecto empuja a llenar cada espacio?',
  ],
}

export const objetivos = [
  { n: '01', title: 'Silencio antes que ruido', copy: 'Ninguna sección debía competir por atención. Una idea por pantalla, con aire suficiente para respirarla.' },
  { n: '02', title: 'La fotografía como protagonista', copy: 'El texto acompaña a la imagen, no al revés. La luz natural y la textura hacen el trabajo que otros sitios le piden a la tipografía grande.' },
  { n: '03', title: 'Una identidad, no una plantilla', copy: 'Nada de componentes genéricos de e-commerce gastronómico. Cada elemento debía sentirse dibujado para esta marca en particular.' },
]

export const investigacion = {
  eyebrow: '02 · Investigación',
  title: 'Referencias, no atajos.',
  body: 'Se relevó diseño editorial escandinavo, identidades de estudios de café de especialidad y fotografía de producto minimalista - no para copiar una estética puntual, sino para entender qué decisiones (tipografía comedida, paletas de un solo acento, composición asimétrica) hacen que un diseño se sienta silencioso en vez de simplemente vacío.',
  findings: [
    'La calma percibida depende más del ritmo del scroll que de la cantidad de blanco en pantalla.',
    'Un solo acento de color, usado con moderación, comunica más lujo que una paleta amplia.',
    'La tipografía serif editorial funciona mejor en tamaños grandes y con mucho interlineado - a tamaños chicos pierde el gesto que la hace especial.',
  ],
}

export const paleta = [
  { name: 'Papel', hex: '#F3F0EA', usage: 'Fondo principal' },
  { name: 'Madera clara', hex: '#C9B79C', usage: 'Superficies, bordes' },
  { name: 'Tinta', hex: '#1D1B18', usage: 'Texto, contraste' },
  { name: 'Café tostado', hex: '#4A3324', usage: 'Único acento, uso moderado' },
]

export const tipografia = {
  display: { name: 'Petrona', role: 'Titulares y momentos editoriales', sample: 'Preparado con calma.' },
  body: { name: 'Work Sans', role: 'Texto de lectura e interfaz', sample: 'Una pausa breve, una taza bien hecha.' },
}

export const designSystemNotes = [
  'Sin bordes redondeados: los cortes rectos refuerzan el carácter editorial/impreso.',
  'Sin sombras: la jerarquía se resuelve con espaciado y tamaño, nunca con elevación falsa.',
  'Un solo acento de color en toda la interfaz - botones, links y highlights comparten el mismo café tostado.',
  'Grid de 12 columnas en desktop, márgenes generosos que nunca bajan del 6% del ancho de pantalla.',
]

export const componentes = [
  { name: 'Botón primario', desc: 'Borde de 1px, sin relleno hasta el hover.' },
  { name: 'Enlace de texto', desc: 'Subrayado que se separa del texto al pasar el cursor.' },
  { name: 'Etiqueta', desc: 'Versalitas espaciadas, sin fondo ni borde.' },
  { name: 'Cita', desc: 'Serif itálica grande, sin comillas decorativas.' },
]

export const showcaseStages = [
  { n: '01', label: 'Desktop', title: 'Composición editorial a pantalla completa.', copy: 'En desktop, la fotografía ocupa hasta el 60% del viewport y el texto vive en una columna angosta a un costado - como una revista abierta.' },
  { n: '02', label: 'Tablet', title: 'La columna se acorta, el ritmo se mantiene.', copy: 'El grid pasa de dos columnas a una sola sin perder los márgenes generosos ni el tamaño de la tipografía editorial.' },
  { n: '03', label: 'Mobile', title: 'Todo se apila, nada se recorta.', copy: 'Las fotos pasan a formato vertical propio (no un recorte forzado del desktop) y el texto conserva su jerarquía completa.' },
]

export const microinteracciones = [
  'El subrayado de los enlaces se despega del texto al pasar el cursor, en vez de simplemente cambiar de color.',
  'Las fotografías tienen un parallax sutil al hacer scroll - nunca más de 12px de desplazamiento.',
  'Las secciones aparecen con un fundido lento (0.9s) en vez de un slide-up brusco, para sostener la sensación de calma incluso en el movimiento.',
]

export const proceso = [
  { n: '01', title: 'Relevamiento', copy: 'Definir qué necesitaba probar la marca en los primeros 3 segundos de visita.' },
  { n: '02', title: 'Wireframe', copy: 'Estructura en blanco y negro para validar el ritmo de lectura antes de sumar estilo.' },
  { n: '03', title: 'Sistema visual', copy: 'Paleta, tipografía y componentes definidos como un sistema, no página por página.' },
  { n: '04', title: 'Construcción', copy: 'Implementación real en Next.js, con el mismo estándar de performance y accesibilidad que el resto del portfolio.' },
]

export const resultado = {
  eyebrow: '05 · Resultado',
  title: 'Una idea por pantalla, siempre.',
  body: 'El resultado es una página que se recorre, no se escanea: cada sección resuelve una sola pregunta (qué es, qué se sirve, dónde queda, cómo se siente entrar) antes de pasar a la siguiente. Ninguna pantalla obliga a elegir dónde mirar primero.',
}

export const tecnologias = ['Next.js (App Router)', 'Tailwind CSS v4', 'Motion (Framer Motion)', 'TypeScript']
