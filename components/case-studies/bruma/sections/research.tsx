import Image from 'next/image'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { brumaFade } from '@/components/case-studies/bruma/bruma-motion'
import { investigacion } from '@/components/case-studies/bruma/data'

function WoodTexture() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: '#C9B79C',
        backgroundImage:
          'repeating-linear-gradient(100deg, rgba(74,51,36,0.08) 0px, rgba(74,51,36,0.08) 2px, transparent 2px, transparent 14px)',
      }}
    />
  )
}

function PaperTexture() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: '#F3F0EA',
        backgroundImage: 'radial-gradient(rgba(29,27,24,0.14) 0.6px, transparent 0.6px)',
        backgroundSize: '5px 5px',
      }}
    />
  )
}

export function BrumaResearch() {
  return (
    <section id="bruma-investigacion" className="scroll-mt-20 border-t border-[#1D1B18]/15 bg-[#EDE8DC] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={brumaFade} className="max-w-2xl">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{investigacion.eyebrow}</p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            {investigacion.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#1D1B18]/70">{investigacion.body}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" gap={0.05}>
          <RevealItem variants={brumaFade} className="relative col-span-2 row-span-2 aspect-square overflow-hidden">
            <Image src="/concepts/ombu-hero.webp" alt="Referencia de moodboard: taza de café con luz natural" fill loading="lazy" sizes="(max-width:1023px) 66vw, 33vw" className="object-cover object-[70%_30%]" />
          </RevealItem>
          <RevealItem variants={brumaFade} className="aspect-square overflow-hidden"><WoodTexture /></RevealItem>
          <RevealItem variants={brumaFade} className="aspect-square overflow-hidden bg-[#4A3324]"><span className="sr-only">Café tostado</span></RevealItem>
          <RevealItem variants={brumaFade} className="aspect-square overflow-hidden"><PaperTexture /></RevealItem>
          <RevealItem variants={brumaFade} className="aspect-square overflow-hidden bg-[#1D1B18]"><span className="sr-only">Tinta</span></RevealItem>
          <RevealItem variants={brumaFade} className="relative col-span-2 aspect-square overflow-hidden sm:col-span-1">
            <Image src="/concepts/ombu-cafe-editorial.webp" alt="Referencia de moodboard: barista preparando café en barra" fill loading="lazy" sizes="(max-width:1023px) 33vw, 16vw" className="object-cover" />
          </RevealItem>
        </StaggerGroup>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 border-t border-[#1D1B18]/15 pt-10 sm:grid-cols-3" gap={0.06}>
          {investigacion.findings.map((finding) => (
            <RevealItem key={finding} variants={brumaFade}>
              <p className="text-sm leading-relaxed text-[#1D1B18]/70">{finding}</p>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
