'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollStages } from '@/components/case-studies/shared/use-scroll-stages'
import { escenas } from '@/components/case-studies/astra/data'
import { AstraSceneObjeto } from '@/components/case-studies/astra/sections/scene-objeto'
import { AstraSceneDato } from '@/components/case-studies/astra/sections/scene-dato'
import { AstraSceneSala } from '@/components/case-studies/astra/sections/scene-sala'
import { AstraSceneProfundidad } from '@/components/case-studies/astra/sections/scene-profundidad'
import { AstraSceneCierre } from '@/components/case-studies/astra/sections/scene-cierre'

const SCENES = [AstraSceneObjeto, AstraSceneDato, AstraSceneSala, AstraSceneProfundidad, AstraSceneCierre]

/**
 * Astra's entire experience lives in one full-viewport horizontal track
 * instead of a scrolling page - mobile becomes literal full-screen swipeable
 * scenes (a genuinely different mobile paradigm from Bruma's vertical
 * reading or Cimbra's app shell), and desktop gets the same track plus a
 * mouse-wheel enhancement. Dots and Prev/Next are the primary, documented
 * control (real buttons, real focus order); swipe and wheel are enhancements
 * on top - wheel is redirected to `scrollLeft` without ever calling
 * `preventDefault`, so there is nothing being hijacked, only translated.
 */
export function AstraSceneTrack() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { activeStage, setStageRef } = useScrollStages(escenas.length, {
    root: null,
    rootMargin: '0px -10% 0px -10%',
    threshold: [0.5],
  })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    function onWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      track!.scrollLeft += event.deltaY
    }
    track.addEventListener('wheel', onWheel, { passive: true })
    return () => track.removeEventListener('wheel', onWheel)
  }, [])

  function goTo(index: number) {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(escenas.length - 1, index))
    track.scrollTo({ left: clamped * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault()
      goTo(activeStage + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault()
      goTo(activeStage - 1)
    }
  }

  return (
    <div className="relative h-full min-h-0 flex-1 overflow-hidden">
      <div
        ref={trackRef}
        role="region"
        aria-label="Explorá Astra - usá los puntos, las flechas o deslizá"
        aria-roledescription="carrusel de escenas"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth outline-none [scrollbar-width:none]"
      >
        {SCENES.map((Scene, index) => (
          <section
            key={escenas[index].id}
            ref={setStageRef(index)}
            data-stage={index}
            aria-label={escenas[index].label}
            className="h-full w-full shrink-0 snap-center snap-always"
          >
            <Scene active={activeStage === index} />
          </section>
        ))}
      </div>

      {/* HUD - the primary, documented navigation. Real buttons, not decorative swipe hints. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] sm:px-8 sm:pb-8">
        <button
          type="button"
          onClick={() => goTo(activeStage - 1)}
          disabled={activeStage === 0}
          aria-label="Escena anterior"
          className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/10 bg-[#10151B]/80 text-white backdrop-blur-xl transition-transform duration-150 active:scale-[0.94] disabled:opacity-25"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-[#10151B]/80 px-4 py-2.5 backdrop-blur-xl">
          <span className="text-[11px] font-medium tracking-[0.1em] text-white/60 tabular-nums whitespace-nowrap">
            {String(activeStage + 1).padStart(2, '0')} / {String(escenas.length).padStart(2, '0')}
          </span>
          <div className="flex items-center" role="tablist" aria-label="Escenas">
            {escenas.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={activeStage === index}
                aria-label={scene.label}
                onClick={() => goTo(index)}
                className="group flex size-6 items-center justify-center"
              >
                <span
                  className={`size-2 rounded-full transition-[transform,background-color] duration-200 ${
                    activeStage === index ? 'scale-125 bg-[#8FB4C9]' : 'bg-white/45 group-hover:bg-white/65'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(activeStage + 1)}
          disabled={activeStage === escenas.length - 1}
          aria-label="Escena siguiente"
          className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/10 bg-[#10151B]/80 text-white backdrop-blur-xl transition-transform duration-150 active:scale-[0.94] disabled:opacity-25"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
