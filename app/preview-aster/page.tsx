import { Big_Shoulders, Archivo, JetBrains_Mono } from 'next/font/google'

/*
DIRECTION CONTRACT — Aster Automóviles, "Hoja de ingeniería"
THESIS: The entire page is one continuous drawing sheet, not a hero section
  with technical decoration - graph-paper ground, registration marks,
  margin notes, the way an actual engineering document is laid out.
OWN-WORLD: Pale drafting-paper ground with a fine printed grid, graphite
  linework, one safety-orange accent. Big Shoulders (stamped/industrial) +
  Archivo (UI) + JetBrains Mono (spec numbers and margin notes).
STORY: This is a precision instrument, proven on paper before it is sold.
FIRST VIEWPORT: Full-viewport sheet with corner registration crosses, a
  running margin note column, the car as a dimensioned schematic.
FORM: full-sheet hero, no card boundary - the whole screen is the document.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and DESIGN.md.
*/

const display = Big_Shoulders({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-aster-display' })
const body = Archivo({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-aster-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-aster-mono' })

function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <line x1="12" y1="0" x2="12" y2="24" stroke="#1f2421" strokeWidth="1" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="#1f2421" strokeWidth="1" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="#1f2421" strokeWidth="1" />
    </svg>
  )
}

function CarSchematic() {
  return (
    <svg viewBox="0 0 400 160" className="w-full" fill="none">
      <path
        d="M20 120 L45 120 L60 90 Q90 65 140 62 L260 62 Q300 64 320 90 L355 92 L378 108 L378 120 L355 120"
        stroke="#1f2421"
        strokeWidth="2.5"
      />
      <circle cx="100" cy="120" r="18" stroke="#1f2421" strokeWidth="2.5" fill="#eef1e9" />
      <circle cx="300" cy="120" r="18" stroke="#1f2421" strokeWidth="2.5" fill="#eef1e9" />
      <line x1="150" y1="62" x2="150" y2="24" stroke="#d94f1e" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="260" y1="62" x2="260" y2="24" stroke="#d94f1e" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="150" y1="24" x2="260" y2="24" stroke="#d94f1e" strokeWidth="1.5" />
      <line x1="20" y1="140" x2="378" y2="140" stroke="#b8beb2" strokeWidth="1" />
      <line x1="20" y1="136" x2="20" y2="144" stroke="#b8beb2" strokeWidth="1" />
      <line x1="378" y1="136" x2="378" y2="144" stroke="#b8beb2" strokeWidth="1" />
    </svg>
  )
}

export default function PreviewAster() {
  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#eef1e9] text-[#1f2421]`}
      style={{
        fontFamily: 'var(--font-aster-body)',
        backgroundImage:
          'linear-gradient(to right, rgba(31,36,33,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,36,33,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="relative mx-auto min-h-screen max-w-[1440px] border-x border-[#1f2421]/25 px-4 py-4 sm:px-8 sm:py-6">
        {/* Registration marks - corners of the sheet */}
        <RegistrationMark className="absolute top-2 left-2 size-4" />
        <RegistrationMark className="absolute top-2 right-2 size-4" />
        <RegistrationMark className="absolute bottom-2 left-2 size-4" />
        <RegistrationMark className="absolute right-2 bottom-2 size-4" />

        <header className="flex h-16 items-center justify-between border-b border-[#1f2421]/30">
          <span className="text-lg tracking-[0.02em] uppercase" style={{ fontFamily: 'var(--font-aster-display)' }}>
            Aster
          </span>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#">Unidades</a>
            <a href="#">Tecnología</a>
            <a href="#">Comprar</a>
          </nav>
        </header>

        <div className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-[auto_1fr]">
          {/* Running margin note column, like a real drawing sheet */}
          <div
            className="hidden text-[10px] tracking-[0.15em] text-[#5a6058] uppercase lg:block"
            style={{ fontFamily: 'var(--font-aster-mono)', writingMode: 'vertical-rl' }}
          >
            Aster / Arco E-9 — Hoja 01 de 04 — Escala 1:1 — Rev. C — No cotizar sin ficha completa
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-[#1f2421]/30 pb-3 text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-aster-mono)' }}>
              <span>Aster / Arco E-9</span>
              <span>Hoja 01 · Escala 1:1</span>
            </div>

            <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#d94f1e] uppercase">Especificación técnica</p>
                <h1
                  className="mt-5 max-w-md text-[clamp(3.6rem,7vw,6.4rem)] leading-[0.84] tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-aster-display)' }}
                >
                  Cada dato,
                  <br />a la vista.
                </h1>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-[#3a4038]">
                  Sin relleno de marketing. La ficha completa antes de coordinar una prueba de manejo.
                </p>
                <a
                  href="#"
                  className="mt-8 inline-flex h-13 items-center gap-3 border-2 border-[#1f2421] bg-[#1f2421] px-6 text-sm font-semibold tracking-wide text-[#eef1e9] uppercase"
                >
                  Ver ficha completa
                </a>
              </div>
              <CarSchematic />
            </div>

            <div className="grid grid-cols-3 border-t border-[#1f2421]/30 pt-6 text-center" style={{ fontFamily: 'var(--font-aster-mono)' }}>
              {[
                ['612', 'km estimados'],
                ['4.3s', '0-100 km/h'],
                ['350', 'kW de carga'],
              ].map(([value, label]) => (
                <div key={label}>
                  <b className="text-2xl text-[#d94f1e]">{value}</b>
                  <p className="mt-1 text-[10px] tracking-[0.1em] text-[#5a6058] uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
