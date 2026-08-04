import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ProjectBack({ className }: { className?: string }) {
  return (
    <Link href="/proyectos" className={cn('inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-transform duration-300 hover:translate-x-1', className)}>
      <ArrowLeft className="size-4" /> Volver a proyectos
    </Link>
  )
}
