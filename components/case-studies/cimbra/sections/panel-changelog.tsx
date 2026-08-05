import { changelog } from '@/components/case-studies/cimbra/data'

/**
 * Changelog: the old 4-card "Proceso" grid, reframed as a real dated version
 * history - what used to be identical-looking cards now reads with the
 * asymmetry a real changelog has (a version number and a date carry more
 * signal than a repeated card shape ever could).
 */
export function CimbraPanelChangelog() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#1C222B]/65 uppercase">Historial</p>
      <h2 className="mt-2 text-xl font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
        Changelog
      </h2>

      <ol className="mt-6 flex flex-col">
        {changelog.map((entry, index) => (
          <li key={entry.version} className="relative border-l border-[#1C222B]/12 py-1 pb-8 pl-6 last:pb-0">
            <span className="absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 border-[#ECEFF3] bg-[#FF6B4A]" />
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="rounded-[6px] bg-[#1C222B] px-2 py-0.5 text-[11px] font-bold text-white">{entry.version}</span>
              <span className="text-xs font-medium text-[#1C222B]/65">{entry.date}</span>
              <span className="rounded-[6px] bg-[#1C222B]/6 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-[#1C222B]/70">
                {entry.tag}
              </span>
              {index === changelog.length - 1 && (
                <span className="rounded-[6px] bg-[#C22300]/8 px-2 py-0.5 text-[10px] font-semibold tracking-[0.06em] text-[#C22300] uppercase">
                  Actual
                </span>
              )}
            </div>
            <p className="mt-2 text-sm font-semibold text-[#1C222B]">{entry.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#1C222B]/65">{entry.copy}</p>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#1C222B]/65">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#1C222B] text-[8px] font-bold text-white">
                {entry.autor}
              </span>
              {entry.autor}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
