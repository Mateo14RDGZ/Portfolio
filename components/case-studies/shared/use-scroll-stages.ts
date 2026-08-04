'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Tracks which of N stacked "stage" elements is currently scrolled into
 * view, extracted from the IntersectionObserver logic in
 * components/case-study.tsx's DesktopStory. Each case-study page builds
 * its own visual treatment (crossfade, clip-path, tile-flip, whatever fits
 * its direction) on top of this - the hook only owns "what stage is active
 * and how do I register a stage's DOM node."
 */
export function useScrollStages(stageCount: number, options?: IntersectionObserverInit) {
  const [activeStage, setActiveStage] = useState(0)
  const stageRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveStage(Number((visible.target as HTMLElement).dataset.stage))
      },
      options ?? { rootMargin: '-34% 0px -38% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    stageRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageCount])

  function setStageRef(index: number) {
    return (node: HTMLElement | null) => {
      stageRefs.current[index] = node
    }
  }

  return { activeStage, setStageRef }
}
