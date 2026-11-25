import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'
import { professors } from '@/lib/data/professors'
import { getCoursesChronological, getNextCourse, isPastCourse, formatShortDate } from '@/lib/data/courses'
import { Section, Eyebrow, Title, Lead, ChevronLink } from './ui'

/** Línea de tiempo de todas las ediciones (versión clara). */
export default function Trajectory() {
  const editions = getCoursesChronological()
  if (editions.length === 0) return null

  const next = getNextCourse()
  const speakerCount = new Set(editions.map((c) => c.professorId).filter(Boolean)).size
  const pastCount = editions.filter(isPastCourse).length

  return (
    <Section id="trayectoria" tone="white" labelledBy="trayectoria-heading">
      <AnimateOnScroll className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <Eyebrow>Trayectoria</Eyebrow>
          <Title id="trayectoria-heading">Todas nuestras ediciones.</Title>
          <Lead className="mt-4 max-w-[34ch]">Los cursos que ya hemos celebrado y los que están por llegar.</Lead>
        </div>
        <dl className="flex gap-12">
          <div>
            <dd className="tabular-nums text-[clamp(2.4rem,4vw,3.2rem)] font-semibold tracking-[-0.03em] leading-none text-ink">{pastCount}</dd>
            <dt className="mt-2 text-[14px] text-ink-2">{pastCount === 1 ? 'edición celebrada' : 'ediciones celebradas'}</dt>
          </div>
          <div>
            <dd className="tabular-nums text-[clamp(2.4rem,4vw,3.2rem)] font-semibold tracking-[-0.03em] leading-none text-ink">{speakerCount}</dd>
            <dt className="mt-2 text-[14px] text-ink-2">ponentes</dt>
          </div>
        </dl>
      </AnimateOnScroll>

      <AnimateOnScroll delay={100}>
        <ol className="md:flex md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-4 [scrollbar-width:thin]">
          {editions.map((course, idx) => {
            const past = isPastCourse(course)
            const isNext = course.id === next?.id
            const professor = professors.find((p) => p.id === course.professorId)
            return (
              <li
                key={course.id}
                className="relative snap-start border-l md:border-l-0 md:border-t border-black/[0.12] pl-8 pb-12 md:pl-0 md:pb-0 md:pt-10 md:pr-12 md:w-[340px] md:flex-shrink-0"
              >
                <span
                  aria-hidden
                  className={`absolute -left-[6px] top-[6px] md:left-0 md:-top-[6px] w-[11px] h-[11px] rounded-full ${
                    isNext ? 'bg-teal-deep ring-4 ring-teal-deep/15' : 'bg-white border-2 border-ink/30'
                  }`}
                />
                <p className={`text-[14px] font-semibold mb-2 ${isNext ? 'text-teal-deep' : 'text-ink-2'}`}>
                  Edición {String(idx + 1).padStart(2, '0')} · {isNext ? 'Próxima' : past ? 'Celebrada' : 'Programada'}
                </p>
                <p className="tabular-nums text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.025em] leading-none text-ink">
                  <time dateTime={course.dateISO}>{formatShortDate(course)}</time>
                  <span className="text-ink-2/60"> {course.dateISO?.slice(0, 4)}</span>
                </p>
                <h3 className="mt-4 text-[19px] font-semibold leading-[1.25] tracking-[-0.01em]">
                  <Link href={`/cursos/${course.id}`} className="text-ink hover:text-teal-deep transition-colors">
                    {course.title}
                  </Link>
                </h3>
                <p className="mt-1 text-[15px] text-ink-2">{course.categoryLabel}</p>
                {professor && (
                  <div className="mt-5 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full overflow-hidden bg-surface flex items-center justify-center text-[11px] font-semibold text-teal-deep flex-shrink-0">
                      {professor.avatarUrl ? (
                        <Image src={professor.avatarUrl} alt="" width={32} height={32} className="w-full h-full object-cover" />
                      ) : professor.initials}
                    </span>
                    <span className="text-[14px] text-ink-2">{professor.name}</span>
                  </div>
                )}
              </li>
            )
          })}
          <li aria-hidden className="relative border-l md:border-l-0 md:border-t border-dashed border-black/[0.15] pl-8 md:pl-0 md:pt-10 md:flex-1 md:min-w-[200px]">
            <span className="absolute -left-[6px] top-[6px] md:left-0 md:-top-[6px] w-[11px] h-[11px] rounded-full border-2 border-dashed border-ink/25 bg-white" />
            <p className="text-[17px] text-ink-2">Próximas ediciones, muy pronto.</p>
          </li>
        </ol>
      </AnimateOnScroll>

      <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
        <ChevronLink href="/cursos">Ver todos los cursos</ChevronLink>
        <ChevronLink href="/profesores">Conocer al profesorado</ChevronLink>
      </div>
    </Section>
  )
}
