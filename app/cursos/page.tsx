import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, Users, MessageCircle, ArrowRight } from 'lucide-react'
import Nav from '@/components/Nav'
import PageHeader from '@/components/PageHeader'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { professors } from '@/lib/data/professors'
import {
  getUpcomingCourses,
  getPastCourses,
  editionNumber,
  formatPrice,
} from '@/lib/data/courses'
import { whatsappCourse, CONTACT } from '@/lib/contact'
import { SITE_URL, SITE_NAME, pageMetadata } from '@/lib/site'
import type { Course } from '@/types'

const DESCRIPTION =
  'Próximos cursos para dentistas en Vera (Almería) y archivo de ediciones celebradas: endodoncia, ortodoncia con alineadores y más, en grupos reducidos.'

export const metadata: Metadata = pageMetadata({
  title: 'Cursos de odontología en Vera (Almería)',
  socialTitle: `Cursos — ${SITE_NAME}`,
  description: DESCRIPTION,
  path: '/cursos',
})

const MONTH = (c: Course) =>
  c.dateISO
    ? new Date(`${c.dateISO}T12:00:00Z`)
        .toLocaleDateString('es-ES', { month: 'short', timeZone: 'UTC' })
        .replace('.', '')
    : ''
const DAY = (c: Course) => (c.dateISO ? String(Number(c.dateISO.slice(8, 10))) : '')
const YEAR = (c: Course) => c.dateISO?.slice(0, 4) ?? ''
const professorOf = (c: Course) => professors.find((p) => p.id === c.professorId)

export default function CoursesPage() {
  const upcoming = getUpcomingCourses()
  const past = getPastCourses()

  // Archivo agrupado por año (más reciente primero)
  const byYear = past.reduce<Record<string, Course[]>>((acc, c) => {
    ;(acc[YEAR(c)] ??= []).push(c)
    return acc
  }, {})
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a))

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cursos de Dental Academy Vera',
    itemListElement: [...upcoming, ...past].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/cursos/${c.id}`,
      name: c.title,
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Cursos', item: `${SITE_URL}/cursos` },
    ],
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="pt-[72px]">
        <PageHeader
          eyebrow="Catálogo formativo"
          title="Cursos"
          lead="Jornadas presenciales e intensivas en Vera, con grupos reducidos. Aquí tienes las próximas fechas y todas las ediciones que ya hemos celebrado."
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Cursos' }]}
          stats={[
            { label: 'Próximos', value: upcoming.length },
            { label: 'Celebrados', value: past.length },
          ]}
        />

        {/* ── Próximos cursos ──────────────────────────────── */}
        <section aria-labelledby="proximos-heading" className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 id="proximos-heading" className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-navy mb-10 flex items-center gap-4">
              <span className="w-10 h-[3px] bg-teal flex-shrink-0" />
              Próximos cursos
            </h2>

            {upcoming.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center">
                <p className="text-gray-600 text-[1.05rem] mb-6">
                  Estamos preparando nuevas fechas. Escríbenos y te avisamos cuando abramos inscripciones.
                </p>
                <a
                  href={CONTACT.whatsappGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-[12px] rounded-[8px] bg-[#25D366] text-white font-semibold text-[0.92rem] hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Avisadme por WhatsApp
                </a>
              </div>
            ) : (
              <ul className="space-y-6">
                {upcoming.map((course) => {
                  const professor = professorOf(course)
                  return (
                    <AnimateOnScroll key={course.id}>
                      <li className="group grid grid-cols-1 md:grid-cols-[150px_1fr_auto] rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        {/* Fecha */}
                        <div className="bg-navy-deep text-white flex md:flex-col items-center md:justify-center gap-3 md:gap-0 px-6 py-4 md:py-8">
                          <span className="font-display text-[2.2rem] md:text-[3.4rem] font-bold leading-none text-teal">{DAY(course)}</span>
                          <span className="font-label text-[0.8rem] uppercase tracking-[0.16em] text-white/70 md:mt-2">
                            {MONTH(course)} {YEAR(course)}
                          </span>
                          <span className="ml-auto md:ml-0 md:mt-4 font-label text-[0.68rem] uppercase tracking-[0.1em] text-white/40">
                            Edición Nº {String(editionNumber(course)).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Contenido */}
                        <div className="p-7 md:p-8">
                          <div className="font-label text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-teal mb-2">
                            {course.categoryLabel}
                          </div>
                          <h3 className="font-display text-[1.55rem] font-bold text-navy leading-[1.2] mb-1">
                            <Link href={`/cursos/${course.id}`} className="hover:text-teal transition-colors">
                              {course.title}
                            </Link>
                          </h3>
                          {course.subtitle && <p className="text-gray-500 mb-5">{course.subtitle}</p>}

                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.88rem] text-gray-600 mb-5">
                            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-teal" />{course.duration}</span>
                            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-teal" />{course.location}</span>
                            <span className="inline-flex items-center gap-2"><Users className="w-4 h-4 text-teal" />{course.spots} plazas</span>
                          </div>

                          {professor && (
                            <Link href={`/profesores#${professor.id}`} className="inline-flex items-center gap-3 group/prof">
                              <span className="w-9 h-9 rounded-full overflow-hidden bg-teal-light flex items-center justify-center font-label text-[0.75rem] font-bold text-teal">
                                {professor.avatarUrl ? (
                                  <Image src={professor.avatarUrl} alt="" width={36} height={36} className="w-full h-full object-cover" />
                                ) : professor.initials}
                              </span>
                              <span className="text-[0.92rem] text-navy font-medium group-hover/prof:text-teal transition-colors">
                                {professor.name}
                              </span>
                            </Link>
                          )}
                        </div>

                        {/* Precio + acciones */}
                        <div className="border-t md:border-t-0 md:border-l border-gray-200 bg-off-white p-7 md:p-8 flex md:flex-col justify-between md:justify-center items-center md:items-stretch gap-4 md:min-w-[230px]">
                          <div className={`font-display font-bold text-navy leading-none ${course.price != null ? 'text-[2rem]' : 'text-[1.3rem]'}`}>
                            {formatPrice(course)}
                          </div>
                          <div className="flex md:flex-col gap-2">
                            <Link
                              href={`/cursos/${course.id}`}
                              className="inline-flex items-center justify-center gap-2 px-5 py-[11px] rounded-[8px] bg-teal text-white font-semibold text-[0.9rem] hover:bg-teal-dark transition-colors"
                            >
                              Ver programa
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                              href={whatsappCourse(course.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Reservar plaza en ${course.title} por WhatsApp`}
                              className="inline-flex items-center justify-center gap-2 px-5 py-[11px] rounded-[8px] border border-gray-300 text-navy font-semibold text-[0.9rem] hover:border-[#25D366] hover:text-[#1da851] transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="hidden md:inline">Reservar plaza</span>
                            </a>
                          </div>
                        </div>
                      </li>
                    </AnimateOnScroll>
                  )
                })}
              </ul>
            )}
          </div>
        </section>

        {/* ── Archivo ──────────────────────────────────────── */}
        {past.length > 0 && (
          <section aria-labelledby="archivo-heading" className="py-20 bg-off-white">
            <div className="max-w-[1200px] mx-auto px-6">
              <h2 id="archivo-heading" className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-navy mb-3 flex items-center gap-4">
                <span className="w-10 h-[3px] bg-teal flex-shrink-0" />
                Ediciones celebradas
              </h2>
              <p className="text-gray-500 mb-12 md:pl-14 max-w-[620px]">
                Cada edición conserva su página con el programa completo y el ponente que la impartió.
              </p>

              {years.map((year) => (
                <div key={year} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-display italic text-[1.8rem] text-navy/30 leading-none">{year}</span>
                    <span className="h-px flex-1 bg-gray-300" />
                  </div>

                  <ul>
                    {byYear[year].map((course) => {
                      const professor = professorOf(course)
                      return (
                        <li key={course.id} className="border-b border-gray-200 last:border-b-0">
                          <Link
                            href={`/cursos/${course.id}`}
                            className="group grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr_auto_auto] items-center gap-x-6 gap-y-3 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-md"
                          >
                            <time dateTime={course.dateISO} className="text-center">
                              <span className="block font-display text-[2rem] font-bold text-navy leading-none">{DAY(course)}</span>
                              <span className="block font-label text-[0.72rem] uppercase tracking-[0.14em] text-gray-400 mt-1">{MONTH(course)}</span>
                            </time>

                            <div className="min-w-0">
                              <div className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-1">
                                Nº {String(editionNumber(course)).padStart(2, '0')} · {course.categoryLabel}
                              </div>
                              <div className="font-display text-[1.25rem] font-semibold text-navy leading-snug group-hover:text-teal transition-colors">
                                {course.title}
                              </div>
                              <div className="text-[0.85rem] text-gray-500 mt-1">
                                {course.location} · {course.duration} · {course.spots} plazas
                              </div>
                            </div>

                            {professor && (
                              <div className="col-start-2 md:col-start-auto flex items-center gap-3">
                                <span className="w-9 h-9 rounded-full overflow-hidden bg-teal-light flex items-center justify-center font-label text-[0.72rem] font-bold text-teal flex-shrink-0">
                                  {professor.avatarUrl ? (
                                    <Image src={professor.avatarUrl} alt="" width={36} height={36} className="w-full h-full object-cover grayscale-[40%]" />
                                  ) : professor.initials}
                                </span>
                                <span className="text-[0.88rem] text-gray-600">{professor.name}</span>
                              </div>
                            )}

                            <span className="hidden md:inline-flex items-center gap-1 font-label text-[0.82rem] font-semibold text-teal opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                              Ver la edición <ArrowRight className="w-4 h-4" />
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  )
}
