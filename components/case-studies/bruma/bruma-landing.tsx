import { ConceptNotice } from '@/components/case-studies/shared/concept-notice'
import { SkipLink } from '@/components/case-studies/shared/skip-link'
import { brumaFontVariables } from '@/components/case-studies/bruma/bruma-fonts'
import { BrumaMasthead } from '@/components/case-studies/bruma/sections/masthead'
import { BrumaCover } from '@/components/case-studies/bruma/sections/cover'
import { BrumaEssay } from '@/components/case-studies/bruma/sections/essay'
import { BrumaClosing } from '@/components/case-studies/bruma/sections/closing'

export function BrumaLanding() {
  return (
    <div className={brumaFontVariables}>
      <SkipLink targetId="bruma-title" label="Ir al caso de diseño" />
      <main className="overflow-x-clip bg-[#F3F0EA] text-[#1D1B18]" style={{ fontFamily: 'var(--font-bruma-body)' }}>
        <ConceptNotice className="bg-[#1D1B18] text-[#F3F0EA]" />
        <BrumaMasthead />
        <BrumaCover />
        <BrumaEssay />
        <BrumaClosing />
      </main>
    </div>
  )
}
