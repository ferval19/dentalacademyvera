import Image from 'next/image'
import { courses } from '@/lib/data/courses'
import type { Collaborator } from '@/types'

/** Franja de confianza bajo el hero: empresas que han colaborado en algún curso. */
export default function Collaborators() {
  const unique = new Map<string, Collaborator>()
  for (const c of courses) for (const col of c.collaborators ?? []) unique.set(col.name, col)
  const list = [...unique.values()]
  if (list.length === 0) return null

  return (
    <section aria-labelledby="colaboradores-heading" className="bg-white px-6 pb-20 md:pb-24">
      <div className="max-w-[1080px] mx-auto border-t border-black/[0.08] pt-12 text-center">
        <h2 id="colaboradores-heading" className="text-[14px] text-ink-2 mb-8">
          Han colaborado con nosotros
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {list.map((c) => (
            <li key={c.name}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-300"
              >
                <Image src={c.logoUrl} alt={c.name} width={160} height={56} className="h-10 md:h-11 w-auto object-contain" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
