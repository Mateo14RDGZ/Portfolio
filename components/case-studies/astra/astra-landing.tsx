import { ConceptNotice } from '@/components/case-studies/shared/concept-notice'
import { SkipLink } from '@/components/case-studies/shared/skip-link'
import { astraFontVariables } from '@/components/case-studies/astra/astra-fonts'
import { AstraHero } from '@/components/case-studies/astra/sections/hero'
import { AstraIntro } from '@/components/case-studies/astra/sections/intro'
import { AstraResearch } from '@/components/case-studies/astra/sections/research'
import { AstraDesignSystem } from '@/components/case-studies/astra/sections/design-system'
import { AstraShowcase } from '@/components/case-studies/astra/sections/showcase'
import { AstraProcessResult } from '@/components/case-studies/astra/sections/process-result'
import { AstraCta } from '@/components/case-studies/astra/sections/cta'

export function AstraLanding() {
  return (
    <div className={astraFontVariables}>
      <SkipLink targetId="astra-title" label="Ir al caso de diseño" />
      <main className="overflow-x-clip bg-[#10151B] text-white" style={{ fontFamily: 'var(--font-astra-body)' }}>
        <ConceptNotice className="bg-[#10151B] text-[#8FB4C9]" />
        <AstraHero />
        <AstraIntro />
        <AstraResearch />
        <AstraDesignSystem />
        <AstraShowcase />
        <AstraProcessResult />
        <AstraCta />
      </main>
    </div>
  )
}
