import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'
import { courses } from '@/lib/data/courses'
import { professors } from '@/lib/data/professors'
import { CONTACT, whatsappCourse } from '@/lib/contact'

const MODALITY_LABEL: Record<string, string> = {
  presencial: 'Presencial',
  online: 'Online',
  hibrido: 'Híbrido',
}

export default function Courses() {
  // Single featured course — first in the list
  const course = courses[0]
  if (!course) return null

  const professor = course.professorId
    ? professors.find((p) => p.id === course.professorId)
    : undefined

  const waLink = whatsappCourse(course.title)

  return (
    <section className="py-[100px] bg-white" id="cursos">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section header */}
        <AnimateOnScroll className="mb-12">
          <div className="inline-flex items-center gap-2 font-label text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-teal mb-4">
            <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
            Catálogo formativo
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-navy leading-[1.2] mb-3">
            Próximo curso
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[560px] leading-[1.7]">
            Una jornada intensiva con uno de los referentes de la endodoncia en España.
          </p>
        </AnimateOnScroll>

        {/* ── Featured card ─────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg grid grid-cols-1 lg:grid-cols-[3fr_2fr]">

            {/* Left: Image */}
            <div className="relative min-h-[300px] lg:min-h-[480px] bg-navy-deep overflow-hidden">
              {course.imageUrl ? (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: course.gradient }}
                >
                  <span className="text-[5rem] opacity-20 text-white">{course.emoji}</span>
                </div>
              )}
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="bg-navy text-white font-label text-[0.68rem] font-bold tracking-[0.06em] uppercase px-3 py-[5px] rounded-[6px]">
                  {MODALITY_LABEL[course.modality] ?? course.modality}
                </span>
                {course.includesPractice && (
                  <span className="bg-teal text-white font-label text-[0.68rem] font-bold tracking-[0.06em] uppercase px-3 py-[5px] rounded-[6px]">
                    ✓ Práctica
                  </span>
                )}
              </div>
              <span className="absolute top-5 right-5 bg-black/50 text-white font-label text-[0.68rem] font-semibold px-[10px] py-[5px] rounded-[6px] backdrop-blur-sm">
                {course.spots} plazas
              </span>
            </div>

            {/* Right: Info panel */}
            <div className="bg-navy-deep text-white p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="font-label text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-teal mb-3">
                  {course.categoryLabel}
                </div>
                <h3 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.2] mb-2">
                  {course.title}
                </h3>
                {course.subtitle && (
                  <p className="text-[0.9rem] opacity-70 mb-6 leading-[1.6]">{course.subtitle}</p>
                )}

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
                  {[
                    { icon: '📅', value: course.date },
                    { icon: '⏱', value: course.duration },
                    { icon: '📍', value: course.location },
                    { icon: '👥', value: `${course.spots} plazas` },
                  ].map(({ icon, value }) => (
                    <div key={value} className="flex items-center gap-2 text-[0.85rem] text-white/70">
                      <span>{icon}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Professor mini */}
                {professor && (
                  <div className="flex items-center gap-3 py-4 border-t border-white/10 mb-6">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-label text-[0.85rem] text-teal font-bold flex-shrink-0">
                      {professor.initials}
                    </div>
                    <div>
                      <div className="font-body font-semibold text-[0.9rem]">{professor.name}</div>
                      <div className="font-label text-[0.7rem] text-teal uppercase tracking-[0.04em]">
                        {professor.specialty}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price + CTAs */}
              <div>
                <div className="mb-4">
                  <div className="font-label text-[0.7rem] text-white/40 tracking-[0.06em] uppercase mb-1">
                    desde
                  </div>
                  <div className="font-display text-[2.4rem] font-bold text-teal leading-none">
                    {course.price} €
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-[13px] rounded-[8px] bg-[#25D366] text-white font-body font-semibold text-[0.88rem] hover:bg-[#20BD5A] transition-colors text-center"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href={CONTACT.phoneTel}
                    className="flex items-center justify-center gap-2 py-[13px] rounded-[8px] bg-teal text-white font-body font-semibold text-[0.88rem] hover:bg-teal-dark transition-colors text-center"
                  >
                    📞 Llamar
                  </a>
                  <Link
                    href={`/cursos/${course.id}`}
                    className="col-span-2 flex items-center justify-center gap-2 py-[11px] rounded-[8px] border border-white/20 text-white font-body font-semibold text-[0.88rem] hover:bg-white/10 hover:border-white/40 transition-all"
                  >
                    Ver programa completo →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── Program preview 2×2 ───────────────────────────── */}
        {course.program && (
          <AnimateOnScroll delay={100} className="mt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-t-0 border-gray-200 rounded-b-lg overflow-hidden">
              {course.program.map((module, idx) => (
                <div
                  key={module.number}
                  className={`p-6 ${idx !== 0 ? 'border-l border-gray-200' : ''} bg-off-white hover:bg-white transition-colors duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-teal-light flex items-center justify-center font-label font-bold text-[0.78rem] text-teal flex-shrink-0">
                      {module.number}
                    </div>
                    <h4 className="font-display text-[0.95rem] font-semibold text-navy leading-tight">
                      {module.title}
                    </h4>
                  </div>
                  <ul className="space-y-[5px]">
                    {module.topics.slice(0, 3).map((topic) => (
                      <li key={topic} className="flex gap-2 items-start text-[0.78rem] text-gray-500 leading-[1.4]">
                        <span className="text-teal flex-shrink-0 font-bold">—</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                    {module.topics.length > 3 && (
                      <li className="text-[0.75rem] text-teal font-semibold pl-4">
                        +{module.topics.length - 3} más
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  )
}
