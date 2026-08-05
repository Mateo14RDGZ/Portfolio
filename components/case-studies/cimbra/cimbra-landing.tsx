import { ConceptNotice } from '@/components/case-studies/shared/concept-notice'
import { SkipLink } from '@/components/case-studies/shared/skip-link'
import { cimbraFontVariables } from '@/components/case-studies/cimbra/cimbra-fonts'
import { cimbraMeta } from '@/components/case-studies/cimbra/data'
import { CimbraShell } from '@/components/case-studies/cimbra/sections/shell'

/**
 * Cimbra no longer reads as a case-study page - it opens directly into the
 * internal panel the studio's own staff would use, ConceptNotice included so
 * that framing never disguises what this actually is. Everything below it
 * (`CimbraShell`) is a fixed-height app frame with its own internal scroll,
 * not a long page.
 */
export function CimbraLanding() {
  return (
    <div className={`flex h-dvh flex-col overflow-hidden ${cimbraFontVariables}`}>
      <SkipLink targetId="cimbra-panel" label="Ir al panel" />
      <ConceptNotice className="shrink-0 bg-[#1C222B] text-white" />
      <div className="min-h-0 flex-1 bg-[#ECEFF3] text-[#1C222B]" style={{ fontFamily: 'var(--font-cimbra-body)' }}>
        <h1 className="sr-only">{cimbraMeta.headline}</h1>
        <CimbraShell />
      </div>
    </div>
  )
}
