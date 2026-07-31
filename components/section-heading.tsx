import { cn } from '@/lib/utils'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/** Consistent eyebrow + headline + copy block used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <StaggerGroup
      className={cn(
        'flex max-w-4xl flex-col gap-3 border-t border-foreground pt-4 sm:gap-4',
        align === 'center' && 'mx-auto text-center sm:items-center',
        className,
      )}
    >
      <RevealItem>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase sm:text-xs">
          {eyebrow}
        </span>
      </RevealItem>
      <RevealItem>
        <h2 className="text-gradient max-w-3xl text-4xl leading-[0.95] font-semibold text-balance min-[380px]:text-5xl sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </RevealItem>
      {description ? (
        <RevealItem>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed text-pretty sm:text-lg">
            {description}
          </p>
        </RevealItem>
      ) : null}
    </StaggerGroup>
  )
}

/** Thin decorative divider that draws itself in on scroll. */
export function SectionDivider() {
  return (
    <Reveal className="w-full">
      <div className="via-border h-px w-full bg-gradient-to-r from-transparent to-transparent" />
    </Reveal>
  )
}
