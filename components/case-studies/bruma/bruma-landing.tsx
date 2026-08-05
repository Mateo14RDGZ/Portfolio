import { ConceptNotice } from '@/components/case-studies/shared/concept-notice'
import { SkipLink } from '@/components/case-studies/shared/skip-link'
import { brumaFontVariables } from '@/components/case-studies/bruma/bruma-fonts'
import { BrumaHero } from '@/components/case-studies/bruma/sections/hero'
import { BrumaIntro } from '@/components/case-studies/bruma/sections/intro'
import { BrumaResearch } from '@/components/case-studies/bruma/sections/research'
import { BrumaDesignSystem } from '@/components/case-studies/bruma/sections/design-system'
import { BrumaShowcase } from '@/components/case-studies/bruma/sections/showcase'
import { BrumaProcessResult } from '@/components/case-studies/bruma/sections/process-result'
import { BrumaCta } from '@/components/case-studies/bruma/sections/cta'

export function BrumaLanding() {
  return (
    <div className={brumaFontVariables}>
      <SkipLink targetId="bruma-title" label="Ir al caso de diseño" />
      <main className="overflow-x-clip bg-[#F3F0EA] text-[#1D1B18]" style={{ fontFamily: 'var(--font-bruma-body)' }}>
        <ConceptNotice className="bg-[#1D1B18] text-[#F3F0EA]" />
        <BrumaHero />
        <BrumaIntro />
        <BrumaResearch />
        <BrumaDesignSystem />
        <BrumaShowcase />
        <BrumaProcessResult />
        <BrumaCta />
      </main>
    </div>
  )
}
