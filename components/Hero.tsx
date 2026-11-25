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
    <section className="bg-white px-6 pt-[136px] md:pt-[160px] pb-20 md:pb-28">
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

      {/* Tarjeta del ponente: la "imagen de producto" del curso */}
      {professor && (
        <div className="mt-16 md:mt-20 max-w-[1080px] mx-auto rounded-[32px] bg-black text-white overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 md:p-14 flex flex-col justify-end order-2 md:order-1">
            {course.quote && (
              <p className="text-balance text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.18] tracking-[-0.02em] mb-10">
                &ldquo;{course.quote}&rdquo;
              </p>
            )}
            <p className="text-[17px] font-semibold">{professor.name}</p>
            <p className="text-[15px] text-white/60">{professor.tagline ?? professor.specialty}</p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                { label: 'Fecha', value: formatShortDate(course) },
                { label: 'Duración', value: course.duration.replace(/\s*horas?$/, ' h') },
                { label: 'Plazas', value: String(course.spots) },
              ].map((f) => (
                <div key={f.label}>
                  <dt className="text-[12px] text-white/50">{f.label}</dt>
                  <dd className="tabular-nums text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.02em]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[380px] md:min-h-[560px] order-1 md:order-2 bg-[#1d1d1f]">
            {professor.imageUrl ? (
              <Image
                src={professor.imageUrl}
                alt={professor.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 540px"
                className="object-cover object-top"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-semibold text-white/30">
                {professor.initials}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
