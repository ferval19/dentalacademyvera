import Image from 'next/image'
import { professors } from '@/lib/data/professors'
import { getNextCourse, formatLongDate, formatShortDate } from '@/lib/data/courses'
import { whatsappCourse, CONTACT } from '@/lib/contact'
import { Title, PillLink, ChevronLink } from './ui'

/** Portada: el próximo curso como "producto" protagonista. */
export default function Hero() {
  const course = getNextCourse()
  const professor = course?.professorId ? professors.find((p) => p.id === course.professorId) : undefined

  if (!course) {
    return (
      <section className="bg-white px-6 pt-[160px] pb-28 text-center">
        <p className="text-[17px] md:text-[21px] font-semibold text-teal-deep mb-3">Dental Academy Vera</p>
        <Title as="h1" className="mx-auto max-w-[16ch] text-ink">Formación dental en Vera.</Title>
        <p className="mt-5 text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium text-ink-2">
          Estamos preparando las próximas fechas.
        </p>
        <div className="mt-10 flex justify-center">
          <PillLink href={CONTACT.whatsappGeneral} external>Avisadme por WhatsApp</PillLink>
        </div>
      </section>
    )
  }

  return (
    <section id="inicio" className="bg-white px-6 pt-[136px] md:pt-[160px] pb-20 md:pb-28">
      <div className="text-center">
        <p className="text-[17px] md:text-[21px] font-semibold text-teal-deep mb-3">
          Próximo curso · {formatLongDate(course)}
        </p>
        <Title as="h1" className="mx-auto max-w-[17ch] text-ink">{course.title}</Title>
        {course.subtitle && (
          <p className="mt-5 text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium text-ink-2 tracking-[-0.015em]">
            {course.subtitle}
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <PillLink href={whatsappCourse(course.title)} external>Reservar plaza</PillLink>
          <ChevronLink href={`/cursos/${course.id}`}>Ver el curso</ChevronLink>
        </div>
      </div>

      {/* Tarjeta de datos: lo que se decide antes de reservar (el ponente tiene su propia sección) */}
      <div className="mt-16 md:mt-20 max-w-[1080px] mx-auto rounded-[32px] bg-black text-white overflow-hidden grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="p-10 md:p-14 flex flex-col justify-between gap-10 border-b md:border-b-0 md:border-r border-white/10">
          {course.quote && (
            <p className="text-balance text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.18] tracking-[-0.02em]">
              &ldquo;{course.quote}&rdquo;
            </p>
          )}
          {professor && (
            <a href="#profesores" className="group flex items-center gap-4">
              <span className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                {professor.avatarUrl ? (
                  <Image src={professor.avatarUrl} alt="" fill sizes="48px" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-[14px] font-semibold text-white/60">
                    {professor.initials}
                  </span>
                )}
              </span>
              <span>
                <span className="block text-[13px] text-white/55">Imparte</span>
                <span className="block text-[17px] font-semibold group-hover:underline underline-offset-4">{professor.name}</span>
              </span>
            </a>
          )}
        </div>
        <dl className="p-10 md:p-14 grid grid-cols-2 gap-x-6 gap-y-10 content-center">
          {[
            { label: 'Fecha', value: formatShortDate(course), note: course.dateISO?.slice(0, 4) },
            { label: 'Duración', value: course.duration.replace(/\s*horas?$/, ' h'), note: course.schedule },
            { label: 'Plazas', value: String(course.spots), note: 'grupo reducido' },
            { label: 'Precio', value: course.price != null ? `${course.price} €` : 'Consultar', note: course.price != null ? 'por asistente' : undefined },
          ].map((f) => (
            <div key={f.label}>
              <dt className="text-[13px] text-white/55">{f.label}</dt>
              <dd className="mt-1 tabular-nums text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold tracking-[-0.03em] leading-none">{f.value}</dd>
              {f.note && <dd className="mt-2 text-[14px] text-white/55 leading-snug">{f.note}</dd>}
            </div>
          ))}
          <div className="col-span-2 pt-6 border-t border-white/10 text-[15px] text-white/70">
            {course.location} · Vera, Almería
          </div>
        </dl>
      </div>
    </section>
  )
}
