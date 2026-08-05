import { ConceptNotice } from '@/components/case-studies/shared/concept-notice'
import { SkipLink } from '@/components/case-studies/shared/skip-link'
import { cimbraFontVariables } from '@/components/case-studies/cimbra/cimbra-fonts'
import { CimbraHero } from '@/components/case-studies/cimbra/sections/hero'
import { CimbraIntro } from '@/components/case-studies/cimbra/sections/intro'
import { CimbraResearch } from '@/components/case-studies/cimbra/sections/research'
import { CimbraDesignSystem } from '@/components/case-studies/cimbra/sections/design-system'
import { CimbraShowcase } from '@/components/case-studies/cimbra/sections/showcase'
import { CimbraProcessResult } from '@/components/case-studies/cimbra/sections/process-result'
import { CimbraCta } from '@/components/case-studies/cimbra/sections/cta'

export function CimbraLanding() {
  return (
    <div className={cimbraFontVariables}>
      <SkipLink targetId="cimbra-title" label="Ir al caso de diseño" />
      <main className="overflow-x-clip bg-[#ECEFF3] text-[#1C222B]" style={{ fontFamily: 'var(--font-cimbra-body)' }}>
        <ConceptNotice className="bg-[#1C222B] text-white" />
        <CimbraHero />
        <CimbraIntro />
        <CimbraResearch />
        <CimbraDesignSystem />
        <CimbraShowcase />
        <CimbraProcessResult />
        <CimbraCta />
      </main>
    </div>
  )
}
