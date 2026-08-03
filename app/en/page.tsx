import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight, Check } from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { LogoMark } from '@/components/logo-mark'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Web developer in Uruguay',
  description: 'Mateo Rodríguez designs and develops fast websites, online stores and custom systems for growing businesses.',
  alternates: { canonical: '/en', languages: { 'es-UY': '/', en: '/en' } },
  openGraph: { url: `${SITE_URL}/en`, title: 'Mateo Rodríguez | Web developer in Uruguay', description: 'Websites, online stores and custom systems for growing businesses.' },
}

const SERVICES = [
  ['Websites', 'Clear, responsive websites built to present your business and generate enquiries.'],
  ['Online stores', 'A practical purchase flow, products, payments and the right information at every step.'],
  ['Custom systems', 'Tools for bookings, customers, operations and workflows that need their own logic.'],
]

export default function EnglishPage() {
  return (
    <PageTransition animatePage>
      <main className="min-h-[100dvh] bg-background text-foreground">
        <header className="border-b border-foreground"><div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between px-5 sm:h-24 sm:px-8"><Link href="/" className="flex items-center gap-3 font-semibold"><LogoMark animateIntro loopIntro className="size-11 sm:size-16" />Mateo Rodríguez</Link><Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] hover:underline hover:underline-offset-4">Español</Link></div></header>
        <section className="mx-auto grid max-w-[1400px] border-b border-foreground lg:grid-cols-[1fr_.72fr]">
          <div className="flex min-h-[560px] flex-col justify-between p-5 sm:min-h-[calc(100dvh-6rem)] sm:p-8 lg:border-r lg:p-12"><p className="font-mono text-xs uppercase tracking-[.18em]">Independent web developer · Uruguay</p><div><h1 className="max-w-4xl text-[clamp(3.7rem,9vw,9rem)] leading-[.78] font-semibold tracking-[-.085em] uppercase">Every detail<br /><span className="text-primary">matters.</span></h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">I design and build websites, online stores and custom systems for businesses that need a clearer digital presence.</p></div><div className="grid gap-4 sm:grid-cols-2"><Link href="/#contact" className="primary-action flex min-h-14 items-center justify-between bg-primary px-5 font-semibold text-primary-foreground">Tell me about your project <ArrowUpRight className="size-5" /></Link><Link href="/proyectos" className="flex min-h-14 items-center justify-between border border-foreground px-5 font-semibold transition-colors hover:bg-foreground hover:text-background">View selected work <ArrowDownRight className="size-5" /></Link></div></div>
          <div className="flex flex-col justify-between bg-accent p-5 sm:p-8 lg:p-12"><LogoMark animateIntro loopIntro={false} interactive={false} className="mx-auto mt-8 size-[min(70vw,30rem)] lg:mt-0" /><div className="border-t border-foreground pt-5"><p className="font-mono text-xs uppercase tracking-[.18em]">Direct collaboration</p><p className="mt-3 max-w-md text-lg leading-relaxed">One person from the first conversation through design, development and launch.</p></div></div>
        </section>
        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"><p className="font-mono text-xs uppercase tracking-[.18em] text-primary">What I can build</p><div className="mt-8 grid gap-4 lg:grid-cols-3">{SERVICES.map(([title, copy]) => <article key={title} className="border border-foreground bg-card p-6 sm:p-8"><Check className="size-5 text-primary" /><h2 className="mt-14 text-3xl font-semibold tracking-[-.05em]">{title}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{copy}</p></article>)}</div></section>
        <section className="bg-foreground px-5 py-16 text-background sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto max-w-5xl"><p className="font-mono text-xs uppercase tracking-[.18em] text-primary">How we work</p><h2 className="mt-5 text-[clamp(3rem,6vw,6.5rem)] leading-[.84] font-semibold tracking-[-.075em]">A clear scope. A direct process. A website that is ready to use.</h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-background/70">We start with a conversation, then I send a clear proposal with scope, timeline and budget. After launch, I remain available for maintenance and next steps.</p><Link href="/#contact" className="mt-9 inline-flex min-h-14 items-center gap-3 bg-primary px-6 font-semibold text-primary-foreground">Start a conversation <ArrowUpRight className="size-5" /></Link></div></section>
        <footer className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8"><p>© {new Date().getFullYear()} Mateo Rodríguez</p><Link href="/" className="font-mono text-xs uppercase tracking-[.15em] hover:underline hover:underline-offset-4">Back to Spanish version</Link></footer>
      </main>
    </PageTransition>
  )
}
