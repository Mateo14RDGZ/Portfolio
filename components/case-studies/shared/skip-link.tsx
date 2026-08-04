/**
 * Same skip-to-content pattern used by app/trabajo-destacado/page.tsx,
 * parameterized so each case-study page can point at its own first heading
 * without hand-copying the href three times.
 */
export function SkipLink({ targetId, label = 'Ir al contenido' }: { targetId: string; label?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="primary-action sr-only bg-primary text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
    >
      {label}
    </a>
  )
}
