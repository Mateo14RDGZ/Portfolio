import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { LogoMark } from '@/components/logo-mark'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo se tratan los datos enviados a través del portfolio de Mateo Rodríguez.',
  alternates: { canonical: '/privacidad' },
}

const SECTIONS = [
  {
    title: 'Responsable',
    copy: 'Mateo Rodríguez es responsable del tratamiento de los datos recibidos mediante este sitio. Podés escribir a mrdgz14dev@gmail.com para cualquier consulta relacionada con tu privacidad.',
  },
  {
    title: 'Datos recopilados',
    copy: 'El formulario solicita tu nombre, correo electrónico, plan de interés y el mensaje que decidas enviar. No se solicitan datos sensibles ni información de pago.',
  },
  {
    title: 'Finalidad y base legal',
    copy: 'Los datos se utilizan únicamente para responder tu consulta, preparar una propuesta y continuar una relación profesional si ambas partes lo acuerdan. La base legal es tu consentimiento al enviar el formulario.',
  },
  {
    title: 'Proveedores',
    copy: 'El sitio está alojado en Vercel y los mensajes se envían mediante Resend. Estos proveedores pueden procesar datos técnicos o del formulario solo para prestar sus servicios.',
  },
  {
    title: 'Conservación',
    copy: 'Las consultas se conservan durante el tiempo necesario para responderlas y, como máximo, 12 meses si no se inicia una relación profesional. Los datos contractuales podrán conservarse durante los plazos legales aplicables.',
  },
  {
    title: 'Tus derechos',
    copy: 'Podés solicitar acceso, corrección o eliminación de tus datos, así como retirar tu consentimiento. Escribí al correo indicado y voy a responder a tu solicitud lo antes posible.',
  },
  {
    title: 'Analítica y cookies',
    copy: 'Este sitio utiliza Vercel Web Analytics para conocer métricas agregadas de uso y mejorar la experiencia. No se emplean cookies publicitarias ni se venden datos personales.',
  },
]

export default function PrivacyPage() {
  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground">
        <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Volver al portfolio">
            <LogoMark className="size-16" animateIntro={false} />
            <span className="font-semibold uppercase tracking-tight">Mateo Rodríguez</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background">
            <ArrowLeft className="size-4" /> Portfolio
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="border-t border-foreground pt-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Información legal</p>
          <h1 className="mt-4 max-w-4xl text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.86] font-semibold tracking-[-0.07em] text-balance">
            Privacidad, explicada con claridad.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Esta política explica qué ocurre con la información que compartís al contactarme a través de este portfolio.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground/55">Última actualización: 31 de julio de 2026</p>
        </div>

        <div className="mt-14 grid border-t border-foreground sm:grid-cols-2">
          {SECTIONS.map((section, index) => (
            <section key={section.title} className={`border-b border-foreground py-8 sm:p-8 ${index % 2 === 0 ? 'sm:border-r' : ''}`}>
              <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{section.copy}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[0.75rem_3rem_0.75rem_0.75rem] bg-foreground p-7 text-background sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">¿Alguna duda?</p>
            <p className="mt-2 text-2xl font-semibold">Hablemos directamente.</p>
          </div>
          <a href="mailto:mrdgz14dev@gmail.com" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground">
            <Mail className="size-4" /> mrdgz14dev@gmail.com
          </a>
        </div>
      </div>
    </main>
  )
}
