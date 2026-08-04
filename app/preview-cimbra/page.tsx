import { Spectral, Manrope } from 'next/font/google'

/*
DIRECTION CONTRACT — Cimbra Estudio, "La secuencia"
THESIS: A Pilates studio built as an actual movement sequence - stacked
  full-bleed stages threaded by one continuous coiled spring - instead of
  another hero-plus-three-cards template.
OWN-WORLD: Dark plaster-ink ground (real value contrast, not another pale
  neutral), brass spring coil, warm clay accent. A genuine helix, not a
  wavy line, runs the full height of the page as its spine. Spectral
  (bodily serif) + Manrope (quiet UI grotesk).
STORY: The page moves the way a session does - extension, hold, release.
FIRST VIEWPORT: Full-bleed dark stage, oversized italic numeral, the coil
  entering from the top edge already in motion.
FORM: three stacked full-bleed movement stages, no card grid, no split hero.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and DESIGN.md.
*/

const display = Spectral({ subsets: ['latin'], weight: ['500', '600'], style: ['normal', 'italic'], variable: '--font-cimbra-display' })
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cimbra-body' })

function Coil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 600" className={className} preserveAspectRatio="none" fill="none">
      {Array.from({ length: 20 }).map((_, i) => (
        <ellipse key={i} cx="40" cy={i * 30 + 15} rx="22" ry="11" stroke="#8a6a3f" strokeWidth="2.5" />
      ))}
    </svg>
  )
}

const stages = [
  {
    n: '01',
    title: 'Extensión',
    copy: 'El resorte cede, el cuerpo se estira más allá de lo cómodo.',
    tone: 'bg-[#12201a] text-[#f4f1e8]',
  },
  {
    n: '02',
    title: 'Sostén',
    copy: 'La tensión se mantiene. Ahí se construye la fuerza real.',
    tone: 'bg-[#c17a53] text-[#12201a]',
  },
  {
    n: '03',
    title: 'Retorno',
    copy: 'El resorte vuelve, el cuerpo aprende el camino de regreso.',
    tone: 'bg-[#f4f1e8] text-[#12201a]',
  },
]

export default function PreviewCimbra() {
  return (
    <main className={`${display.variable} ${body.variable} relative min-h-screen bg-[#12201a]`} style={{ fontFamily: 'var(--font-cimbra-body)' }}>
      <header className="absolute top-0 right-0 left-0 z-20 mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 text-[#f4f1e8]">
        <span className="text-lg tracking-[-0.02em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
          cimbra
        </span>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#">Clases</a>
          <a href="#">El estudio</a>
          <a href="#">Agenda</a>
        </nav>
      </header>

      <Coil className="pointer-events-none absolute top-0 left-0 z-10 h-full w-6 opacity-50 md:left-1/2 md:w-20 md:-translate-x-1/2 md:opacity-70" />

      {stages.map((stage, i) => (
        <section key={stage.n} className={`relative flex min-h-screen items-center ${stage.tone}`}>
          <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10">
            <div className={`grid grid-cols-1 items-center gap-6 md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <span
                className="text-[clamp(6rem,18vw,13rem)] leading-none italic opacity-25"
                style={{ fontFamily: 'var(--font-cimbra-display)' }}
              >
                {stage.n}
              </span>
              <div>
                <h2 className="text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
                  {stage.title}
                </h2>
                <p className="mt-5 max-w-sm text-lg leading-relaxed opacity-80">{stage.copy}</p>
                {i === 0 && (
                  <a
                    href="#"
                    className="mt-8 inline-flex h-13 items-center gap-3 rounded-full bg-[#f4f1e8] px-6 text-sm font-semibold text-[#12201a]"
                  >
                    Ver clases
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-[#f4f1e8]/15 bg-[#0c1712] px-6 py-14 text-center text-[#f4f1e8]/70">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase">Cimbra Estudio de Movimiento</p>
        <p className="mt-3 text-sm">Reformer · 50 min · Grupos reducidos</p>
      </section>
    </main>
  )
}
