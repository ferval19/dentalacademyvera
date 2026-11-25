import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'
import { getUpcomingCourses, formatPrice, formatShortDate } from '@/lib/data/courses'
import { professors } from '@/lib/data/professors'
import { whatsappCourse, CONTACT } from '@/lib/contact'
import { Section, Eyebrow, Title, Lead, PillLink, ChevronLink } from './ui'

export default function Courses() {
  const upcoming = getUpcomingCourses()
  // Con un solo curso próximo, el hero ya lo presenta: no lo repetimos aquí
  if (upcoming.length < 2) return null

  return (
    <Section id="cursos" tone="white" labelledBy="cursos-heading">
      <AnimateOnScroll className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <Eyebrow>Cursos</Eyebrow>
          <Title id="cursos-heading">Próximos cursos.</Title>
        </div>
        <ChevronLink href="/cursos" className="flex-shrink-0">Todos los cursos y ediciones anteriores</ChevronLink>
      </AnimateOnScroll>

      {upcoming.length === 0 ? (
        <div className="rounded-[28px] bg-surface p-10 md:p-14 text-center">
          <Lead>Estamos preparando nuevas fechas. Escríbenos y te avisamos cuando abramos inscripciones.</Lead>
          <div className="mt-8 flex justify-center">
            <PillLink href={CONTACT.whatsappGeneral} external>Avisadme por WhatsApp</PillLink>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {upcoming.map((course) => {
            const professor = professors.find((p) => p.id === course.professorId)
            return (
              <li key={course.id}>
                <AnimateOnScroll>
                  <article className="rounded-[28px] bg-surface p-8 md:p-12 grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-8 md:gap-12 items-center">
                    <div>
                      <p className="tabular-nums text-[clamp(2.4rem,4vw,3.2rem)] font-semibold tracking-[-0.03em] leading-none text-ink">
                        {formatShortDate(course)}
                      </p>
                      <p className="mt-2 text-[14px] text-ink-2">{course.dateISO?.slice(0, 4)} · {course.categoryLabel}</p>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-balance text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.02em] leading-[1.12] text-ink">
                        <Link href={`/cursos/${course.id}`} className="hover:text-teal-deep transition-colors">
                          {course.title}
                        </Link>
                      </h3>
                      {course.subtitle && <p className="mt-2 text-[17px] text-ink-2">{course.subtitle}</p>}
                      <p className="mt-4 text-[15px] text-ink-2">
                        {course.duration} · {course.location} · {course.spots} plazas
                      </p>
                      {professor && (
                        <div className="mt-6 flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center text-[13px] font-semibold text-teal-deep flex-shrink-0">
                            {professor.avatarUrl ? (
                              <Image src={professor.avatarUrl} alt="" width={40} height={40} className="w-full h-full object-cover" />
                            ) : professor.initials}
                          </span>
                          <span className="text-[15px] text-ink">{professor.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap md:flex-col items-center md:items-end gap-x-6 gap-y-3">
                      <p className="w-full md:w-auto text-[17px] font-semibold text-ink md:mb-2">{formatPrice(course)}</p>
                      <PillLink href={whatsappCourse(course.title)} external className="text-[15px] px-5 py-2">
                        Reservar
                      </PillLink>
                      <ChevronLink href={`/cursos/${course.id}`} className="text-[15px]">Más información</ChevronLink>
                    </div>
                  </article>
                </AnimateOnScroll>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}
