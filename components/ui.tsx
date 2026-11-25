import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/*
 * Primitivas de diseño (estilo Apple) compartidas por toda la web.
 * Tonos: blanco, gris claro (surface) y negro para la sección de énfasis.
 */

type Tone = 'white' | 'surface' | 'dark'

const TONE: Record<Tone, string> = {
  white: 'bg-white text-ink',
  surface: 'bg-surface text-ink',
  dark: 'bg-black text-white',
}

export function Section({
  tone = 'white',
  id,
  className = '',
  children,
  labelledBy,
}: {
  tone?: Tone
  id?: string
  className?: string
  children: React.ReactNode
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${TONE[tone]} px-6 py-24 md:py-32 scroll-mt-[72px] ${className}`}
    >
      <div className="max-w-[1080px] mx-auto">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[17px] font-semibold mb-3 ${dark ? 'text-[#5fd3bf]' : 'text-teal-deep'}`}>{children}</p>
  )
}

export function Title({
  children,
  id,
  as: Tag = 'h2',
  className = '',
}: {
  children: React.ReactNode
  id?: string
  as?: 'h1' | 'h2'
  className?: string
}) {
  const size =
    Tag === 'h1'
      ? 'text-[clamp(2.6rem,7vw,5rem)] leading-[1.04] tracking-[-0.035em]'
      : 'text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.06] tracking-[-0.03em]'
  return (
    <Tag id={id} className={`text-balance font-semibold ${size} ${className}`}>
      {children}
    </Tag>
  )
}

export function Lead({ children, className = '', dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={`text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.45] ${dark ? 'text-white/70' : 'text-ink-2'} ${className}`}>
      {children}
    </p>
  )
}

const PILL =
  'inline-flex items-center justify-center gap-2 rounded-full text-[17px] font-medium px-6 py-3 transition-colors'

export function PillLink({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  ariaLabel,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'secondary-dark'
  external?: boolean
  className?: string
  ariaLabel?: string
}) {
  const style =
    variant === 'primary'
      ? 'bg-teal-deep hover:bg-teal-deep-hover text-white'
      : variant === 'secondary-dark'
        ? 'border border-white/30 hover:border-white/60 text-white'
        : 'border border-ink/20 hover:border-ink/40 text-ink'
  const cls = `${PILL} ${style} ${className}`
  return external || href.startsWith('tel:') || href.startsWith('http') ? (
    <a href={href} className={cls} aria-label={ariaLabel} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}

export function ChevronLink({
  href,
  children,
  dark = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  dark?: boolean
  className?: string
}) {
  const cls = `group inline-flex items-center gap-1 text-[17px] hover:underline underline-offset-4 ${
    dark ? 'text-[#5fd3bf]' : 'text-teal-deep'
  } ${className}`
  const inner = (
    <>
      {children}
      <ChevronRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </>
  )
  return href.startsWith('#') || href.startsWith('http') ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  )
}
