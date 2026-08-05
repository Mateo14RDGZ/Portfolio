import Image from 'next/image'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { cimbraFade } from '@/components/case-studies/cimbra/cimbra-motion'
import { investigacion } from '@/components/case-studies/cimbra/data'

function RaisedTexture() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#ECEFF3]">
      <div className="size-14 rounded-full bg-[#ECEFF3] shadow-[6px_6px_14px_rgba(28,34,43,0.18),-6px_-6px_14px_rgba(255,255,255,0.9)]" />
    </div>
  )
}

function PressedTexture() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#ECEFF3]">
      <div className="size-14 rounded-full bg-[#ECEFF3] shadow-[inset_6px_6px_14px_rgba(28,34,43,0.18),inset_-6px_-6px_14px_rgba(255,255,255,0.9)]" />
    </div>
  )
}

export function CimbraResearch() {
  return (
    <section id="cimbra-investigacion" className="scroll-mt-20 bg-[#E4E7EC] px-6 py-20 text-[#1C222B] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={cimbraFade} className="max-w-2xl">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">{investigacion.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.12] font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            {investigacion.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#1C222B]/65">{investigacion.body}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" gap={0.05}>
          <RevealItem variants={cimbraFade} className="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-[20px]">
            <Image src="/concepts/cimbra-hero.webp" alt="Referencia de moodboard: equipamiento de reformer en un estudio" fill loading="lazy" sizes="(max-width:1023px) 66vw, 33vw" className="object-cover" />
          </RevealItem>
          <RevealItem variants={cimbraFade} className="aspect-square overflow-hidden rounded-[20px]"><RaisedTexture /></RevealItem>
          <RevealItem variants={cimbraFade} className="aspect-square overflow-hidden rounded-[20px] bg-[#FF6B4A]"><span className="sr-only">Coral</span></RevealItem>
          <RevealItem variants={cimbraFade} className="aspect-square overflow-hidden rounded-[20px]"><PressedTexture /></RevealItem>
          <RevealItem variants={cimbraFade} className="aspect-square overflow-hidden rounded-[20px] bg-[#1C222B]"><span className="sr-only">Grafito</span></RevealItem>
          <RevealItem variants={cimbraFade} className="aspect-square overflow-hidden rounded-[20px] bg-[#8890A0]"><span className="sr-only">Niebla</span></RevealItem>
        </StaggerGroup>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 border-t border-[#1C222B]/10 pt-10 sm:grid-cols-3" gap={0.06}>
          {investigacion.findings.map((finding) => (
            <RevealItem key={finding} variants={cimbraFade}>
              <p className="text-sm leading-relaxed text-[#1C222B]/65">{finding}</p>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
