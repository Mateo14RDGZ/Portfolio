import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Headphones,
  LifeBuoy,
  PenTool,
  Search,
  Smartphone,
  UserRoundCog,
  Zap,
} from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { LogoMark } from '@/components/logo-mark'
import { CONCEPT_PROJECTS } from '@/lib/project-data'
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

const BENEFITS = [
  { icon: PenTool, title: 'Modern design', copy: 'Current, polished designs that convey quality naturally.' },
  { icon: Smartphone, title: 'Responsive by default', copy: 'Built mobile-first and tested on real devices, from small phones to ultra-wide monitors.' },
  { icon: Zap, title: 'High performance', copy: 'Optimized images, minimal JavaScript and Core Web Vitals checked before every launch.' },
  { icon: Search, title: 'SEO-ready', copy: 'Semantic markup, metadata, sitemaps and structured data so search engines understand your business.' },
  { icon: UserRoundCog, title: 'Custom-built', copy: 'No recycled templates from other clients. Your site is designed around what your business needs.' },
  { icon: Headphones, title: 'Direct communication', copy: 'One point of contact: me. Fast, clear answers, no unnecessary jargon.' },
  { icon: LifeBuoy, title: 'Ongoing support', copy: 'Launch is just the start. I stay available for updates, fixes and the next stage of growth.' },
]

const PROCESS = [
  ['01', 'Conversation', 'We talk through your goals, timeline and budget, and I send a clear proposal.'],
  ['02', 'Design & build', 'I design and develop the site, keeping you in the loop at every stage.'],
  ['03', 'Launch & support', 'Your site goes live, and I stay available afterward for changes and updates.'],
]

const FAQS = [
  ['How do payments work?', 'I work with a 50% deposit to reserve the project and the remaining 50% before launch. On larger builds, payment can be split across agreed milestones.'],
  ['How long does a website take?', 'A CLASSIC site usually takes 2-3 weeks; GOLD, 4-6 weeks. Custom (BLACK) projects are scoped after defining their features. Timelines start once I have the content I need from you.'],
  ['Do you offer support after launch?', 'Yes. I offer a monthly plan for updates, backups, small changes and ongoing improvements, or I can hand off a site that is fully ready for you to manage yourself.'],
]

const FEATURED_CONCEPTS: Record<string, string> = {
  'bruma-cafe': 'An editorial, Scandinavian-minimal design case study for a specialty coffee shop.',
  'aster-automoviles': 'A premium EV dealership experience for browsing units and comparing financing.',
  'cimbra-estudio': 'A modular studio landing for managing classes, bookings and membership plans.',
}

export default function EnglishPage() {
  return (
    <PageTransition animatePage>
      <main className="min-h-[100dvh] bg-background text-foreground">
        <header className="border-b border-foreground">
          <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between px-5 sm:h-24 sm:px-8">
            <Link href="/" className="flex items-center gap-3 font-semibold"><LogoMark animateIntro loopIntro className="size-11 sm:size-16" />Mateo Rodríguez</Link>
            <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.14em] lg:flex">
              <a href="#work" className="hover:underline hover:underline-offset-4">Work</a>
              <a href="#why-me" className="hover:underline hover:underline-offset-4">Why me</a>
              <a href="#services" className="hover:underline hover:underline-offset-4">Services</a>
              <a href="#faq" className="hover:underline hover:underline-offset-4">FAQ</a>
            </nav>
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] hover:underline hover:underline-offset-4">Español</Link>
          </div>
        </header>

        <section className="mx-auto grid max-w-[1400px] border-b border-foreground lg:grid-cols-[1fr_.72fr]">
          <div className="flex min-h-[560px] flex-col justify-between p-5 sm:min-h-[calc(100dvh-6rem)] sm:p-8 lg:border-r lg:p-12">
            <p className="font-mono text-xs uppercase tracking-[.18em]">Independent web developer · Uruguay</p>
            <div>
              <h1 className="max-w-4xl text-[clamp(3.7rem,9vw,9rem)] leading-[.78] font-semibold tracking-[-.085em] uppercase">Every detail<br /><span className="text-primary">matters.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">I design and build websites, online stores and custom systems for businesses that need a clearer digital presence.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/#contact" className="primary-action flex min-h-14 items-center justify-between bg-primary px-5 font-semibold text-primary-foreground">Tell me about your project <ArrowUpRight className="size-5" /></Link>
              <a href="#work" className="flex min-h-14 items-center justify-between border border-foreground px-5 font-semibold transition-colors hover:bg-foreground hover:text-background">View selected work <ArrowDownRight className="size-5" /></a>
            </div>
          </div>
          <div className="flex flex-col justify-between bg-accent p-5 sm:p-8 lg:p-12">
            <LogoMark animateIntro loopIntro={false} interactive={false} className="mx-auto mt-8 size-[min(70vw,30rem)] lg:mt-0" />
            <div className="border-t border-foreground pt-5">
              <p className="font-mono text-xs uppercase tracking-[.18em]">Direct collaboration</p>
              <p className="mt-3 max-w-md text-lg leading-relaxed">One person from the first conversation through design, development and launch.</p>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1400px] border-b border-foreground px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-primary">Selected work</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">A real business system and three concept explorations.</h2>
          <Link href="/trabajo-destacado" className="group relative mt-10 block overflow-hidden border border-foreground">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[26rem]">
                <Image src="/case-study/dashboard.webp" alt="Dashboard of a management system for a car dealership, sample data" fill priority quality={82} sizes="(max-width:1024px) 100vw, 62vw" className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
              </div>
              <div className="flex flex-col justify-between bg-card p-6 sm:p-10">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">Featured case study</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-.05em]">Dealership Management System</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">A business web app to centralize vehicles, customers, financing, payments, receipts and reports.</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">Read the case study <ArrowUpRight className="size-4" /></span>
              </div>
            </div>
          </Link>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {CONCEPT_PROJECTS.map((project) => (
              <Link key={project.slug} href={`/proyectos/${project.slug}`} className="group block border border-foreground bg-card">
                <div className="relative aspect-[1.2] overflow-hidden border-b border-foreground">
                  <Image src={project.image} alt={project.imageAlt} fill loading="lazy" sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-primary uppercase">Concept project</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-.04em]">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{FEATURED_CONCEPTS[project.slug]}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">Case study and concept pages open in Spanish, the language they were designed and written in.</p>
        </section>

        <section className="mx-auto max-w-[1400px] border-b border-foreground px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-primary">What I can build</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">{SERVICES.map(([title, copy]) => <article key={title} className="border border-foreground bg-card p-6 sm:p-8"><Check className="size-5 text-primary" /><h2 className="mt-14 text-3xl font-semibold tracking-[-.05em]">{title}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{copy}</p></article>)}</div>
        </section>

        <section id="why-me" className="mx-auto max-w-[1400px] border-b border-foreground px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-primary">Why work with me</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Direct collaboration, clear decisions, a website you can keep improving.</h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-foreground bg-foreground sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex h-full flex-col gap-4 bg-background p-6 min-[380px]:p-7 sm:p-8">
                <span className="bg-secondary text-primary grid size-11 place-items-center rounded-2xl"><benefit.icon className="size-5" /></span>
                <h3 className="text-lg font-medium tracking-tight">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.copy}</p>
              </div>
            ))}
            <div className="bg-card flex h-full flex-col justify-center gap-3 p-6 min-[380px]:p-7 sm:p-8 lg:col-span-2">
              <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">One more thing</span>
              <p className="text-lg leading-snug font-medium tracking-tight">Everything belongs to you: the code, the domain and every account. No lock-in, no dependencies.</p>
            </div>
          </div>
        </section>

        <section id="services" className="bg-foreground px-5 py-16 text-background sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-primary">How we work</p>
            <h2 className="mt-5 text-[clamp(3rem,6vw,6.5rem)] leading-[.84] font-semibold tracking-[-.075em]">A clear scope. A direct process. A website that is ready to use.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-background/70">We start with a conversation, then I send a clear proposal with scope, timeline and budget. After launch, I remain available for maintenance and next steps.</p>
            <div className="mt-12 grid gap-6 border-t border-background/25 pt-8 sm:grid-cols-3">
              {PROCESS.map(([number, title, copy]) => (
                <div key={title}>
                  <span className="font-mono text-sm text-primary">{number}</span>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-.03em]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-background/70">{copy}</p>
                </div>
              ))}
            </div>
            <Link href="/#contact" className="mt-12 inline-flex min-h-14 items-center gap-3 bg-primary px-6 font-semibold text-primary-foreground">Start a conversation <ArrowUpRight className="size-5" /></Link>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-primary">Frequently asked</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">A few questions before we talk.</h2>
          <div className="mt-10 border-t border-foreground">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group border-b border-foreground py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl font-medium"><span>{question}</span><ChevronDown className="size-5 transition-transform duration-300 group-open:rotate-180" /></summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mx-auto flex max-w-[1400px] flex-col gap-3 border-t border-foreground px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Mateo Rodríguez</p>
          <Link href="/" className="font-mono text-xs uppercase tracking-[.15em] hover:underline hover:underline-offset-4">Back to Spanish version</Link>
        </footer>
      </main>
    </PageTransition>
  )
}
