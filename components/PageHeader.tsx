import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props {
  eyebrow: string
  title: string
  lead: string
  crumbs: { label: string; href?: string }[]
  stats?: { label: string; value: string | number }[]
}

/** Cabecera oscura de las páginas interiores (catálogo, profesorado). */
export default function PageHeader({ eyebrow, title, lead, crumbs, stats }: Props) {
  return (
    <header className="relative bg-hero-gradient text-white overflow-hidden">
      <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern opacity-[0.025] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-14 pb-16 md:pt-16 md:pb-20">
        <nav aria-label="Ruta de navegación" className="mb-10">
          <ol className="flex items-center gap-[6px] font-label text-[0.78rem] text-white/50">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-[6px]">
                {i > 0 && <ChevronRight aria-hidden className="w-3 h-3" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white/80">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 font-label text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-teal mb-5">
              <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
              {eyebrow}
            </div>
            <h1 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-[1.08] mb-4">
              {title}
            </h1>
            <p className="text-[1.1rem] text-white/65 max-w-[560px] leading-[1.7]">{lead}</p>
          </div>

          {stats && (
            <dl className="flex gap-10 font-label flex-shrink-0">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-white/40 mb-1">{s.label}</dt>
                  <dd className="font-display text-[2.4rem] leading-none">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </header>
  )
}
