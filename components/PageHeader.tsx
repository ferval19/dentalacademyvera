import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props {
  eyebrow: string
  title: string
  lead: string
  crumbs: { label: string; href?: string }[]
  stats?: { label: string; value: string | number }[]
}

/** Cabecera de páginas interiores: blanca, titular grande, cifras a la derecha. */
export default function PageHeader({ eyebrow, title, lead, crumbs, stats }: Props) {
  return (
    <header className="bg-white px-6 pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-[1080px] mx-auto">
        <nav aria-label="Ruta de navegación" className="mb-10">
          <ol className="flex items-center gap-2 text-[12px] text-ink-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight aria-hidden className="w-3 h-3" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="text-[17px] md:text-[21px] font-semibold text-teal-deep mb-3">{eyebrow}</p>
            <h1 className="text-balance text-[clamp(2.8rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              {title}
            </h1>
            <p className="mt-5 text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.45] text-ink-2 max-w-[40ch]">{lead}</p>
          </div>

          {stats && (
            <dl className="flex gap-12 flex-shrink-0">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="tabular-nums text-[clamp(2.4rem,4vw,3.2rem)] font-semibold tracking-[-0.03em] leading-none text-ink">
                    {s.value}
                  </dd>
                  <dt className="mt-2 text-[14px] text-ink-2">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </header>
  )
}
