import Link from 'next/link'
import { Pin } from 'lucide-react'
import { cta, notas } from '@/components/case-studies/cimbra/data'

/**
 * Notas: the old "Investigación" and "Resultado" case-study prose, reframed
 * as a pinned team note inside the product - the format a research writeup
 * actually takes inside a real internal tool, not a marketing section. The
 * required CTA closes the note as an in-product "hablar con el equipo"
 * banner instead of a centered marketing block.
 */
export function CimbraPanelNotas() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-2 text-[#C22300]">
        <Pin className="size-3.5" />
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase">Nota fijada del equipo</p>
      </div>

      <div className="mt-4 rounded-[20px] bg-[#ECEFF3] p-6 shadow-[6px_6px_14px_rgba(28,34,43,0.14),-6px_-6px_14px_rgba(255,255,255,0.85)]">
        <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
          {notas.contexto.title}
        </h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#1C222B]/65">
          <span className="flex size-4 items-center justify-center rounded-full bg-[#1C222B] text-[8px] font-bold text-white">{notas.contexto.autor}</span>
          {notas.contexto.autor} · {notas.contexto.fecha}
        </p>
        <div className="mt-3 flex flex-col gap-3">
          {notas.contexto.body.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-[#1C222B]/70">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-[20px] bg-[#ECEFF3] p-6 shadow-[6px_6px_14px_rgba(28,34,43,0.14),-6px_-6px_14px_rgba(255,255,255,0.85)]">
        <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
          {notas.investigacion.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#1C222B]/65">
          <span className="flex size-4 items-center justify-center rounded-full bg-[#1C222B] text-[8px] font-bold text-white">{notas.investigacion.autor}</span>
          {notas.investigacion.autor} · {notas.investigacion.fecha}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#1C222B]/70">{notas.investigacion.body}</p>
        <ul className="mt-4 flex flex-col gap-2.5 border-t border-[#1C222B]/8 pt-4">
          {notas.investigacion.findings.map((finding) => (
            <li key={finding} className="text-sm leading-relaxed text-[#1C222B]/70">
              — {finding}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-[20px] bg-[#ECEFF3] p-6 shadow-[6px_6px_14px_rgba(28,34,43,0.14),-6px_-6px_14px_rgba(255,255,255,0.85)]">
        <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
          {notas.resultado.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#1C222B]/65">
          <span className="flex size-4 items-center justify-center rounded-full bg-[#1C222B] text-[8px] font-bold text-white">{notas.resultado.autor}</span>
          {notas.resultado.autor} · {notas.resultado.fecha}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#1C222B]/70">{notas.resultado.body}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#1C222B]/8 pt-4">
          {notas.tecnologias.map((tech) => (
            <span key={tech} className="rounded-[8px] bg-[#1C222B]/6 px-2.5 py-1 text-[11px] font-medium text-[#1C222B]/70">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[20px] bg-[#1C222B] p-6 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">Hablar con el equipo</p>
          <p className="mt-1.5 text-base font-semibold">{cta.pregunta}</p>
        </div>
        <Link
          href="/#contact"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#FF6B4A] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
        >
          {cta.linkLabel}
        </Link>
      </div>
    </div>
  )
}
