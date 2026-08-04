import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Disclaimer bar shown at the top of every fictional case-study page.
 * Text is fixed by design brief - always "Caso de diseño", never
 * "Proyecto conceptual".
 */
export function ConceptNotice({ className }: { className: string }) {
  return (
    <div className={cn('relative z-30 px-5 py-3 text-center text-[10px] font-medium tracking-[0.13em] uppercase', className)}>
      Caso de diseño. Marca y contenido ficticios.{' '}
      <Link href="/proyectos" className="underline underline-offset-4">Volver a proyectos</Link>
    </div>
  )
}
