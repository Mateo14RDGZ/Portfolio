'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { useScrollStages } from '@/components/case-studies/shared/use-scroll-stages'
import { cimbraFade, PressableCard } from '@/components/case-studies/cimbra/cimbra-motion'
import { showcaseStages, microinteracciones } from '@/components/case-studies/cimbra/data'

const COLUMNS = [4, 2, 1] as const

function DashboardMock({ index }: { index: number }) {
  const columns = COLUMNS[index]
  return (
    <PressableCard className="w-full p-4">
      <div className="h-2 w-1/4 rounded-full bg-[#1C222B]/15" />
      <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns * 2 }).map((_, tile) => (
          <div key={tile} className="rounded-[12px] bg-[#ECEFF3] p-3 shadow-[inset_3px_3px_8px_rgba(28,34,43,0.12),inset_-3px_-3px_8px_rgba(255,255,255,0.85)]">
            <div className="h-1.5 w-2/3 rounded-full bg-[#1C222B]/15" />
            <div className={cn('mt-3 h-1.5 rounded-full', tile % 3 === 0 ? 'w-1/2 bg-[#FF6B4A]/60' : 'w-1/3 bg-[#1C222B]/10')} />
          </div>
        ))}
      </div>
    </PressableCard>
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
              transition={{ duration: reduceMotion ? 0.01 : 0.4 }}
              aria-hidden={index !== activeStage}
            >
              <DashboardMock index={index} />
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">
          {showcaseStages[activeStage].label}
        </p>
      </div>

      <div className="py-[15vh]">
        {showcaseStages.map((stage, index) => (
          <div
            key={stage.n}
            ref={setStageRef(index)}
            data-stage={index}
            className="flex min-h-[40vh] flex-col justify-center border-t border-[#1C222B]/10 py-10 first:border-t-0"
          >
            <span className={cn('text-xs font-bold', index === activeStage ? 'text-[#C22300]' : 'text-[#1C222B]/65')}>{stage.n}</span>
            <h3 className={cn('mt-4 text-2xl font-bold transition-colors duration-500', index === activeStage ? 'text-[#1C222B]' : 'text-[#1C222B]/65')} style={{ fontFamily: 'var(--font-cimbra-display)' }}>
              {stage.title}
            </h3>
            <p className={cn('mt-3 text-sm leading-relaxed transition-colors duration-500', index === activeStage ? 'text-[#1C222B]/75' : 'text-[#1C222B]/65')}>
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
        <Reveal key={stage.n} variants={cimbraFade}>
          <DashboardMock index={index} />
          <span className="mt-6 block text-xs font-bold text-[#C22300]">{stage.n}</span>
          <h3 className="mt-3 text-2xl font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>{stage.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#1C222B]/65">{stage.copy}</p>
        </Reveal>
      ))}
    </div>
  )
}

export function CimbraShowcase() {
  return (
    <section id="cimbra-showcase" className="scroll-mt-20 bg-[#E4E7EC] px-6 py-20 text-[#1C222B] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={cimbraFade} className="max-w-2xl">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">04 · Showcase responsive</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.12] font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            La misma densidad, en cualquier tamaño.
          </h2>
        </Reveal>

        <div className="mt-14">
          <DesktopShowcase />
          <MobileShowcase />
        </div>

        <StaggerGroup className="mt-20 grid grid-cols-1 gap-6 border-t border-[#1C222B]/10 pt-12 sm:grid-cols-3" gap={0.06}>
          <RevealItem variants={cimbraFade} className="sm:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">Microinteracciones</p>
          </RevealItem>
          {microinteracciones.map((item) => (
            <RevealItem key={item} variants={cimbraFade}>
              <PressableCard className="p-5">
                <p className="text-sm leading-relaxed text-[#1C222B]/65">{item}</p>
              </PressableCard>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
