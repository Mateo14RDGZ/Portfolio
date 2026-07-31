'use client'

import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'

const FOOTER_LINKS = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proyectos', href: '#work' },
  { label: 'Proceso', href: '#process' },
  { label: 'Contacto', href: '#contact' },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
]

export function SiteFooter() {
  return (
    <footer className="border-border relative border-t">
      <Reveal className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <a href="#top" className="flex min-h-11 items-center gap-2.5">
              <Image src="/mr14-logo-transparent.png" alt="MR14" width={44} height={44} className="size-11 object-contain" />
              <span className="text-sm font-medium tracking-tight">Mateo Rodríguez</span>
            </a>

            <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {SOCIALS.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="size-11 rounded-none border-foreground"
                  aria-label={social.label}
                  render={
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <social.icon />
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-none border-foreground"
                aria-label="Volver arriba"
                render={<a href="#top" />}
              >
                <ArrowUp />
              </Button>
            </div>
          </div>

          <div className="border-border flex flex-col-reverse justify-between gap-3 border-t pt-8 sm:flex-row sm:items-center">
            <p className="text-muted-foreground font-mono text-xs">
              © {new Date().getFullYear()} Mateo Rodríguez. Todos los derechos reservados.
            </p>
            <p className="text-muted-foreground font-mono text-xs">
              Diseñado y desarrollado desde cero — Next.js, TypeScript, Tailwind CSS
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
