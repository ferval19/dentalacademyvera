import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'
import { professors } from '@/lib/data/professors'
import { getNextCourse, getPastCourses, formatShortDate } from '@/lib/data/courses'
import type { Course, Professor } from '@/types'
import { Section, Eyebrow, Title, ChevronLink } from './ui'

/** Sección de énfasis en negro: ponente del próximo curso + quienes ya formaron aquí. */
export default function Professors() {
  const nextCourse = getNextCourse()
  const pastCourses = getPastCourses()
  const featuredCourse = nextCourse ?? pastCourses[0]
  const professor = professors.find((p) => p.id === featuredCourse?.professorId)
  if (!professor) return null

  // Histórico: ponentes de ediciones celebradas, sin repetir al destacado
  const alumniMap = new Map<string, { professor: Professor; courses: Course[] }>()
  for (const c of pastCourses) {
    if (!c.professorId || c.professorId === professor.id) continue
    const p = professors.find((x) => x.id === c.professorId)
    if (!p) continue
    const entry = alumniMap.get(p.id) ?? { professor: p, courses: [] }
    entry.courses.push(c)
    alumniMap.set(p.id, entry)
  }
  const alumni = [...alumniMap.values()]
  const highlights = professor.credentialGroups?.flatMap((g) => g.items).slice(0, 4) ?? []

  return (
    <Section id="profesores" tone="dark" labelledBy="profesores-heading">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 md:gap-16 items-center">
        <AnimateOnScroll>
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#1d1d1f]">
            {professor.imageUrl ? (
              <Image
                src={professor.imageUrl}
                alt={professor.name}
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover object-top"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-semibold text-white/30">
                {professor.initials}
              </span>
            )}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <Eyebrow dark>{nextCourse ? 'Imparte el próximo curso' : 'Nuestro último ponente'}</Eyebrow>
          <Title id="profesores-heading">{professor.name}</Title>
          {professor.tagline && <p className="mt-3 text-[19px] text-white/60">{professor.tagline}</p>}
          {professor.bio && (
            <p className="mt-8 text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.55] text-white/80">{professor.bio}</p>
          )}
          {highlights.length > 0 && (
            <ul className="mt-10 border-t border-white/15">
              {highlights.map((item) => (
                <li key={item} className="py-4 border-b border-white/15 text-[15px] text-white/70 leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          )}
          <ChevronLink href={`/profesores#${professor.id}`} dark className="mt-8">
            Ver perfil completo
          </ChevronLink>
        </AnimateOnScroll>
      </div>

      {alumni.length > 0 && (
        <AnimateOnScroll className="mt-24">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h3 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.025em]">Han formado con nosotros.</h3>
            <ChevronLink href="/profesores" dark className="flex-shrink-0 text-[15px]">Todo el profesorado</ChevronLink>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alumni.map(({ professor: p, courses: taught }) => (
              <li key={p.id}>
                <Link
                  href={`/profesores#${p.id}`}
                  className="group flex items-center gap-5 rounded-[24px] bg-[#1d1d1f] hover:bg-[#2a2a2c] transition-colors p-5"
                >
                  <span className="relative w-[72px] h-[72px] rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                    {p.avatarUrl ? (
                      <Image src={p.avatarUrl} alt="" fill sizes="72px" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-[18px] font-semibold text-white/60">{p.initials}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[17px] font-semibold">{p.name}</span>
                    <span className="block text-[14px] text-white/55 truncate">{p.tagline ?? p.specialty}</span>
                    {taught.map((c) => (
                      <span key={c.id} className="block mt-1 text-[13px] text-white/45 truncate">
                        {c.title} · {formatShortDate(c)} {c.dateISO?.slice(0, 4)}
                      </span>
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      )}
    </Section>
  )
}
