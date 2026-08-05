'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { useScrollStages } from '@/components/case-studies/shared/use-scroll-stages'
import { astraFade, GlassPanel } from '@/components/case-studies/astra/astra-motion'
import { showcaseStages, microinteracciones } from '@/components/case-studies/astra/data'

const LAYER_COUNT = [3, 2, 1] as const

function DepthStack({ index }: { index: number }) {
  const layers = LAYER_COUNT[index]
  return (
    <div className="relative h-64 w-full" style={{ perspective: 1000 }}>
      {Array.from({ length: layers }).map((_, layer) => (
        <div
          key={layer}
          className="absolute inset-x-8 top-4 flex h-full flex-col gap-3 border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
          style={{
            transform: `translateZ(${-layer * 40}px) translateY(${layer * 14}px) scale(${1 - layer * 0.06})`,
            zIndex: layers - layer,
            opacity: 1 - layer * 0.35,
          }}
        >
          <div className="h-2 w-1/3 bg-white/20" />
          <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
            <div className="h-6 bg-[#4F7FA0]/40" />
            <div className="h-6 bg-white/10" />
            <div className="h-6 bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}

function DesktopShowcase() {
  const reduceMotion = useReducedMotion()
  const { activeStage, setStageRef } = useScrollStages(showcaseStages.length)

  return (
    <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="flex h-[70vh] flex-col justify-center" style={{ position: 'sticky', top: '7rem' }}>
        <div className="relative h-72">
          {showcaseStages.map((stage, index) => (
            <motion.div
              key={stage.n}
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{ opacity: index === activeStage ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
              aria-hidden={index !== activeStage}
            >
              <DepthStack index={index} />
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-[11px] tracking-[0.22em] text-[#8FB4C9] uppercase">
          {showcaseStages[activeStage].label}
        </p>
      </div>

      <div className="py-[15vh]">
        {showcaseStages.map((stage, index) => (
          <div
            key={stage.n}
            ref={setStageRef(index)}
            data-stage={index}
            className="flex min-h-[40vh] flex-col justify-center border-t border-white/10 py-10 first:border-t-0"
          >
            <span className={cn('text-xs tracking-[0.15em]', index === activeStage ? 'text-[#8FB4C9]' : 'text-white/50')}>{stage.n}</span>
            <h3 className={cn('mt-4 text-2xl transition-colors duration-500', index === activeStage ? 'text-white' : 'text-white/50')} style={{ fontFamily: 'var(--font-astra-display)' }}>
              {stage.title}
            </h3>
            <p className={cn('mt-3 text-sm leading-relaxed transition-colors duration-500', index === activeStage ? 'text-white/70' : 'text-white/50')}>
              {stage.copy}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileShowcase() {
  return (
    <div className="flex flex-col gap-14 lg:hidden">
      {showcaseStages.map((stage, index) => (
        <Reveal key={stage.n} variants={astraFade}>
          <DepthStack index={index} />
          <span className="mt-6 block text-xs tracking-[0.15em] text-[#8FB4C9]">{stage.n}</span>
          <h3 className="mt-3 text-2xl text-white" style={{ fontFamily: 'var(--font-astra-display)' }}>{stage.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{stage.copy}</p>
        </Reveal>
      ))}
    </div>
  )
}

export function AstraShowcase() {
  return (
    <section id="astra-showcase" className="scroll-mt-20 border-t border-white/10 bg-[#10151B] px-6 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={astraFade} className="max-w-2xl">
          <p className="text-[11px] tracking-[0.24em] text-[#8FB4C9] uppercase">04 · Showcase responsive</p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-astra-display)' }}>
            La misma profundidad, en cualquier tamaño.
          </h2>
        </Reveal>

        <div className="mt-14">
          <DesktopShowcase />
          <MobileShowcase />
        </div>

        <StaggerGroup className="mt-20 grid grid-cols-1 gap-6 border-t border-white/10 pt-12 sm:grid-cols-3" gap={0.06}>
          <RevealItem variants={astraFade} className="sm:col-span-3">
            <p className="text-[11px] tracking-[0.24em] text-[#8FB4C9] uppercase">Microinteracciones</p>
          </RevealItem>
          {microinteracciones.map((item) => (
            <RevealItem key={item} variants={astraFade}>
              <GlassPanel tone="dark" className="p-5">
                <p className="text-sm leading-relaxed text-white/70">{item}</p>
              </GlassPanel>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
