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
        'flex max-w-2xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <RevealItem>
        <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
          {eyebrow}
        </span>
      </RevealItem>
      <RevealItem>
        <h2 className="text-gradient text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </RevealItem>
      {description ? (
        <RevealItem>
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
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
