import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'
import { professors } from '@/lib/data/professors'
import {
  getCoursesChronological,
  getNextCourse,
  isPastCourse,
  formatShortDate,
} from '@/lib/data/courses'

export default function Trajectory() {
  const editions = getCoursesChronological()
  if (editions.length === 0) return null

  const next = getNextCourse()
  const speakerCount = new Set(editions.map((c) => c.professorId).filter(Boolean)).size
  const pastCount = editions.filter(isPastCourse).length

  return (
    <section
      id="trayectoria"
      aria-labelledby="trayectoria-heading"
      className="relative bg-cta-gradient text-white py-[110px] overflow-hidden"
    >
      <div className="absolute inset-0 about-radial-overlay pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <AnimateOnScroll className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-label text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-teal mb-5">
              <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
              Trayectoria
            </div>
            <h2
              id="trayectoria-heading"
              className="font-display text-[clamp(2.1rem,3.5vw,3rem)] font-bold leading-[1.15] mb-4"
            >
              Todas nuestras ediciones
            </h2>
            <p className="text-[1.05rem] text-white/60 max-w-[520px] leading-[1.75]">
              Los cursos que ya hemos celebrado en Vera y los que están por llegar, con quién los impartió.
            </p>
          </div>

          <dl className="flex gap-10 font-label">
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-white/40 mb-1">Celebradas</dt>
              <dd className="font-display text-[2.4rem] leading-none text-white">{pastCount}</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-white/40 mb-1">Ponentes</dt>
              <dd className="font-display text-[2.4rem] leading-none text-white">{speakerCount}</dd>
            </div>
          </dl>
        </AnimateOnScroll>

        {/* Timeline: vertical en móvil, horizontal (con scroll) en escritorio */}
        <AnimateOnScroll delay={100}>
          <ol className="md:flex md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-4 md:-mx-6 md:px-6 [scrollbar-width:thin]">
            {editions.map((course, idx) => {
              const past = isPastCourse(course)
              const isNext = course.id === next?.id
              const professor = professors.find((p) => p.id === course.professorId)
              const number = String(idx + 1).padStart(2, '0')

              return (
                <li
                  key={course.id}
                  className="relative snap-start border-l md:border-l-0 md:border-t border-white/20 pl-8 pb-12 md:pl-0 md:pb-0 md:pt-10 md:pr-12 md:w-[340px] md:flex-shrink-0"
                >
                  {/* Nodo */}
                  <span
                    aria-hidden
                    className={`absolute -left-[7px] top-[6px] md:left-0 md:-top-[7px] w-[13px] h-[13px] rounded-full ${
                      isNext
                        ? 'bg-teal shadow-[0_0_0_6px_rgba(43,181,160,0.18)]'
                        : 'bg-navy-deep border-2 border-white/40'
                    }`}
                  />

                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className={`font-display italic text-[2.8rem] leading-none ${
                        isNext ? 'text-teal' : 'text-white/25'
                      }`}
                    >
                      <span className="sr-only">Edición </span>Nº {number}
                    </span>
                    <span
                      className={`font-label text-[0.68rem] font-bold uppercase tracking-[0.1em] px-[10px] py-[4px] rounded-full ${
                        isNext
                          ? 'bg-teal text-white'
                          : past
                            ? 'border border-white/20 text-white/50'
                            : 'border border-teal/40 text-teal'
                      }`}
                    >
                      {isNext ? 'Próxima' : past ? 'Celebrada' : 'Programada'}
                    </span>
                  </div>

                  <div className="font-label text-[0.78rem] uppercase tracking-[0.12em] text-white/50 mb-4">
                    <time dateTime={course.dateISO}>{formatShortDate(course)} {course.dateISO?.slice(0, 4)}</time>
                    <span className="mx-2 text-white/25">·</span>
                    {course.categoryLabel}
                  </div>

                  <h3 className="font-display text-[1.3rem] font-semibold leading-[1.25] mb-5">
                    <Link
                      href={`/cursos/${course.id}`}
                      className={`hover:text-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm ${
                        past ? 'text-white/80' : 'text-white'
                      }`}
                    >
                      {course.title}
                    </Link>
                  </h3>

                  {professor && (
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 flex-shrink-0 bg-white/10">
                        {professor.avatarUrl ? (
                          <Image
                            src={professor.avatarUrl}
                            alt=""
                            width={36}
                            height={36}
                            className={`w-full h-full object-cover ${past ? 'grayscale-[60%]' : ''}`}
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center font-label text-[0.72rem] font-bold text-teal">
                            {professor.initials}
                          </span>
                        )}
                      </div>
                      <div className="text-[0.88rem] text-white/70 leading-tight">{professor.name}</div>
                    </div>
                  )}

                  <Link
                    href={`/cursos/${course.id}`}
                    className="font-label text-[0.8rem] font-semibold text-teal hover:text-mint transition-colors"
                  >
                    {past ? 'Ver la edición →' : 'Ver programa →'}
                  </Link>
                </li>
              )
            })}

            {/* Lo que viene */}
            <li
              aria-hidden
              className="relative border-l md:border-l-0 md:border-t border-dashed border-white/20 pl-8 md:pl-0 md:pt-10 md:flex-1 md:min-w-[220px]"
            >
              <span className="absolute -left-[7px] top-[6px] md:left-0 md:-top-[7px] w-[13px] h-[13px] rounded-full border-2 border-dashed border-white/30 bg-navy-deep" />
              <div className="font-display italic text-[1.15rem] text-white/35 leading-snug">
                Próximas ediciones,
                <br />
                muy pronto
              </div>
            </li>
          </ol>
        </AnimateOnScroll>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-6 py-[12px] rounded-[8px] border border-white/25 text-white font-semibold text-[0.92rem] hover:bg-white/10 hover:border-white/45 transition-all"
          >
            Ver todos los cursos →
          </Link>
          <Link
            href="/profesores"
            className="inline-flex items-center gap-2 px-6 py-[12px] rounded-[8px] text-white/70 font-semibold text-[0.92rem] hover:text-white transition-colors"
          >
            Conocer al profesorado →
          </Link>
        </div>
      </div>
    </section>
  )
}
