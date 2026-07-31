import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { LogoMark } from '@/components/logo-mark'

const LINKS = [
  { label: 'Perfil', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Habilidades', href: '#work' },
  { label: 'Método', href: '#process' },
]

export function SiteFooter() {
  return (
    <footer className="bg-accent text-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid items-center gap-8 border-b border-foreground pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-14">
          <a href="#top" className="group flex w-fit items-center gap-5" aria-label="Volver al inicio">
            <LogoMark className="size-32 sm:size-48 lg:size-56" />
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] sm:block">
              Identidad<br />MR14
            </span>
          </a>

          <div>
            <p className="max-w-3xl text-[clamp(2.5rem,6vw,6rem)] leading-[0.86] font-semibold tracking-[-0.065em] text-balance">
              Una buena web debería sentirse inevitable.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full bg-foreground px-6 font-semibold text-background transition-transform hover:-translate-y-1"
            >
              Construyamos la tuya <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>

        <div className="grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">Navegación</p>
            <nav className="mt-3 flex flex-col items-start" aria-label="Pie de página">
              {LINKS.map((link) => (
                <a key={link.href} href={link.href} className="py-1.5 text-lg font-medium hover:underline hover:underline-offset-4">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">Contacto directo</p>
            <a href="mailto:mrdgz14dev@gmail.com" className="mt-4 inline-flex items-center gap-2 font-semibold hover:underline hover:underline-offset-4">
              <Mail className="size-4" /> mrdgz14dev@gmail.com
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/65">Respuesta habitual en menos de 24 horas, de lunes a viernes.</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">En línea</p>
            <a href="https://github.com/Mateo14RDGZ" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold hover:underline hover:underline-offset-4">
              <GithubIcon className="size-4" /> GitHub
            </a>
            <div className="mt-4 flex items-center gap-2 text-sm text-foreground/65">
              <span className="size-2 rounded-full bg-primary" /> Disponible para conversar
            </div>
          </div>

          <a href="#top" className="grid size-14 place-items-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-background" aria-label="Volver arriba">
            <ArrowUp />
          </a>
        </div>

        <div className="flex flex-col gap-2 border-t border-foreground/35 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mateo Rodríguez</p>
          <p>Diseño y desarrollo independiente · Uruguay</p>
        </div>
      </div>
    </footer>
  )
}
