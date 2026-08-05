import { ConceptNotice } from '@/components/case-studies/shared/concept-notice'
import { SkipLink } from '@/components/case-studies/shared/skip-link'
import { astraFontVariables } from '@/components/case-studies/astra/astra-fonts'
import { AstraSceneTrack } from '@/components/case-studies/astra/sections/scene-track'

/**
 * Astra is no longer a scrolling page - it's one full-viewport horizontal
 * track of scenes to explore, not read. `SceneTrack` owns the whole
 * experience (HUD nav, snap track, per-scene motion); this file only wraps
 * it in the fixed-height frame, fonts and the required transparency notice.
 */
export function AstraLanding() {
  return (
    <div className={`flex h-dvh flex-col overflow-hidden ${astraFontVariables}`}>
      <SkipLink targetId="astra-track" label="Ir a la experiencia" />
      <ConceptNotice className="shrink-0 bg-[#10151B] text-[#8FB4C9]" />
      <div id="astra-track" className="min-h-0 flex-1" style={{ fontFamily: 'var(--font-astra-body)' }}>
        <AstraSceneTrack />
      </div>
    </div>
  )
}
