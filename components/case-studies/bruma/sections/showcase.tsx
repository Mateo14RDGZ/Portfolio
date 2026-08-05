'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { useScrollStages } from '@/components/case-studies/shared/use-scroll-stages'
import { brumaFade } from '@/components/case-studies/bruma/bruma-motion'
import { showcaseStages, microinteracciones } from '@/components/case-studies/bruma/data'

const FRAME_ASPECT = ['aspect-[16/10]', 'aspect-[4/3]', 'aspect-[9/17]'] as const

function DeviceFrame({ index }: { index: number }) {
  return (
    <div className={cn('mx-auto w-full border border-[#1D1B18] bg-[#F3F0EA] p-2', FRAME_ASPECT[index], index === 2 ? 'max-w-[220px]' : 'max-w-[520px]')}>
      <div className="flex h-full flex-col gap-2">
        <div className="h-3 w-1/3 bg-[#1D1B18]/12" />
        <div className="flex-1 bg-[#C9B79C]/60" />
        <div className="h-2 w-2/3 bg-[#1D1B18]/20" />
        <div className="h-2 w-1/3 bg-[#4A3324]/40" />
      </div>
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
              <DeviceFrame index={index} />
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">
          {showcaseStages[activeStage].label}
        </p>
      </div>

      <div className="py-[15vh]">
        {showcaseStages.map((stage, index) => (
          <div
            key={stage.n}
            ref={setStageRef(index)}
            data-stage={index}
            className="flex min-h-[40vh] flex-col justify-center border-t border-[#1D1B18]/15 py-10 first:border-t-0"
          >
            <span className={cn('text-xs tracking-[0.15em]', index === activeStage ? 'text-[#4A3324]' : 'text-[#1D1B18]/65')}>{stage.n}</span>
            <h3 className={cn('mt-4 text-2xl transition-colors duration-500', index === activeStage ? 'text-[#1D1B18]' : 'text-[#1D1B18]/65')} style={{ fontFamily: 'var(--font-bruma-display)' }}>
              {stage.title}
            </h3>
            <p className={cn('mt-3 text-sm leading-relaxed transition-colors duration-500', index === activeStage ? 'text-[#1D1B18]/70' : 'text-[#1D1B18]/65')}>
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
        <Reveal key={stage.n} variants={brumaFade}>
          <DeviceFrame index={index} />
          <span className="mt-6 block text-xs tracking-[0.15em] text-[#4A3324]">{stage.n}</span>
          <h3 className="mt-3 text-2xl" style={{ fontFamily: 'var(--font-bruma-display)' }}>{stage.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#1D1B18]/70">{stage.copy}</p>
        </Reveal>
      ))}
    </div>
  )
}

export function BrumaShowcase() {
  return (
    <section id="bruma-showcase" className="scroll-mt-20 border-t border-[#1D1B18]/15 bg-[#EDE8DC] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={brumaFade} className="max-w-2xl">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">04 · Showcase responsive</p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            El mismo silencio, en cualquier tamaño.
          </h2>
        </Reveal>

        <div className="mt-14">
          <DesktopShowcase />
          <MobileShowcase />
        </div>

        <StaggerGroup className="mt-20 grid grid-cols-1 gap-6 border-t border-[#1D1B18]/15 pt-12 sm:grid-cols-3" gap={0.06}>
          <RevealItem variants={brumaFade} className="sm:col-span-3">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">Microinteracciones</p>
          </RevealItem>
          {microinteracciones.map((item) => (
            <RevealItem key={item} variants={brumaFade}>
              <p className="text-sm leading-relaxed text-[#1D1B18]/70">{item}</p>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
