import { Zilla_Slab, Work_Sans } from 'next/font/google'

/*
DIRECTION CONTRACT — Ombú Café, "Patio, de lleno"
THESIS: The tile pattern IS the page, not a border around a photo. Drenched
  color strategy instead of another cream-plus-accent café site.
OWN-WORLD: The full hero is a hydraulic-tile field in saturated espresso,
  azulejo blue and terracotta, with oversized display type knocked out on
  top of it - a collage, not a two-column card.
STORY: Walking into the patio itself, before a single word of copy.
FIRST VIEWPORT: Full-bleed tile field, huge overlapping slab-serif type,
  no split layout, no card.
FORM: full-bleed drenched hero + a single quiet reading band below it.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and DESIGN.md.
*/

const display = Zilla_Slab({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-ombu-display' })
const body = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ombu-body' })

function TileField({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="baldosa-full" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="#3b2419" />
          <path d="M0 0 L50 50 M50 0 L0 50" stroke="#2a5f6b" strokeWidth="2.5" />
          <circle cx="25" cy="25" r="11" fill="none" stroke="#e08a4f" strokeWidth="3.5" />
          <circle cx="0" cy="0" r="7" fill="#e08a4f" />
          <circle cx="50" cy="0" r="7" fill="#e08a4f" />
          <circle cx="0" cy="50" r="7" fill="#e08a4f" />
          <circle cx="50" cy="50" r="7" fill="#e08a4f" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#baldosa-full)" />
    </svg>
  )
}

export default function PreviewOmbu() {
  return (
    <main className={`${display.variable} ${body.variable} min-h-screen bg-[#f6ead9] text-[#1c1108]`} style={{ fontFamily: 'var(--font-ombu-body)' }}>
      <header className="absolute top-0 right-0 left-0 z-20 mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6">
        <span className="text-lg tracking-[-0.03em] text-[#f6ead9]" style={{ fontFamily: 'var(--font-ombu-display)' }}>
          Ombú Café
        </span>
        <nav className="hidden gap-8 text-sm font-medium text-[#f6ead9] md:flex">
          <a href="#">Carta</a>
          <a href="#">El café</a>
          <a href="#">Visitanos</a>
        </nav>
      </header>

      {/* Full-bleed drenched hero - the tile field IS the page */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
        <TileField className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1108]/55 via-transparent to-[#1c1108]/25" />

        <div className="relative z-10 w-full px-6 pb-16 sm:px-10">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#e08a4f] uppercase">Café de especialidad · Montevideo</p>
          <h1
            className="mt-4 text-[clamp(4.2rem,13vw,11rem)] leading-[0.82] tracking-[-0.02em] text-[#f6ead9] [text-wrap:balance]"
            style={{ fontFamily: 'var(--font-ombu-display)' }}
          >
            La baldosa
            <br />
            <span className="ml-[8vw] text-[#e08a4f]">es la mesa.</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-[#f6ead9]/25 pt-6">
            <p className="max-w-sm text-lg leading-relaxed text-[#f6ead9]/85">
              Como el piso de tantas casas viejas de la Ciudad Vieja: cada mesa tiene su propio dibujo.
            </p>
            <a
              href="#"
              className="inline-flex h-14 items-center gap-3 bg-[#f6ead9] px-7 text-sm font-semibold tracking-wide text-[#1c1108] uppercase"
            >
              Ver la carta
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[720px] px-6 py-24 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#2a5f6b] uppercase">Café de origen, servido despacio</p>
        <p className="mt-6 text-2xl leading-snug" style={{ fontFamily: 'var(--font-ombu-display)' }}>
          Espresso de la casa · Cacao, nuez y caramelo · $ 150
        </p>
        <p className="mt-4 text-2xl leading-snug" style={{ fontFamily: 'var(--font-ombu-display)' }}>
          Filtro de temporada · Notas florales y cítricas · $ 190
        </p>
      </section>
    </main>
  )
}
