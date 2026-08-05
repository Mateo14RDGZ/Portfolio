import Image from 'next/image'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { astraFade } from '@/components/case-studies/astra/astra-motion'
import { investigacion } from '@/components/case-studies/astra/data'

function GridTexture() {
  return (
    <div
      className="h-full w-full bg-[#10151B]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(79,127,160,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(79,127,160,0.35) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    />
  )
}

function GlassBlur() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F1F3F6]">
      <div className="absolute -top-6 -left-6 size-28 rounded-full bg-[#4F7FA0]/50 blur-2xl" />
      <div className="absolute -right-4 -bottom-6 size-24 rounded-full bg-[#10151B]/20 blur-2xl" />
    </div>
  )
}

export function AstraResearch() {
  return (
    <section id="astra-investigacion" className="scroll-mt-20 border-t border-white/10 bg-[#10151B] px-6 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={astraFade} className="max-w-2xl">
          <p className="text-[11px] tracking-[0.24em] text-[#8FB4C9] uppercase">{investigacion.eyebrow}</p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-astra-display)' }}>
            {investigacion.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/65">{investigacion.body}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" gap={0.05}>
          <RevealItem variants={astraFade} className="relative col-span-2 row-span-2 aspect-square overflow-hidden">
            <Image src="/concepts/aster-hero.webp" alt="Referencia de moodboard: SUV eléctrico en sala de exhibición" fill loading="lazy" sizes="(max-width:1023px) 66vw, 33vw" className="object-cover" />
          </RevealItem>
          <RevealItem variants={astraFade} className="aspect-square overflow-hidden"><GridTexture /></RevealItem>
          <RevealItem variants={astraFade} className="aspect-square overflow-hidden bg-[#4F7FA0]"><span className="sr-only">Acero ártico</span></RevealItem>
          <RevealItem variants={astraFade} className="aspect-square overflow-hidden"><GlassBlur /></RevealItem>
          <RevealItem variants={astraFade} className="aspect-square overflow-hidden bg-[#F1F3F6]"><span className="sr-only">Niebla</span></RevealItem>
          <RevealItem variants={astraFade} className="relative col-span-2 aspect-square overflow-hidden sm:col-span-1">
            <Image src="/concepts/aster-vehicle-vector-4.webp" alt="Referencia de moodboard: SUV familiar eléctrico" fill loading="lazy" sizes="(max-width:1023px) 33vw, 16vw" className="object-cover" />
          </RevealItem>
        </StaggerGroup>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3" gap={0.06}>
          {investigacion.findings.map((finding) => (
            <RevealItem key={finding} variants={astraFade}>
              <p className="text-sm leading-relaxed text-white/65">{finding}</p>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
