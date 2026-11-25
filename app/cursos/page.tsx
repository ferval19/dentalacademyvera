import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import PageHeader from '@/components/PageHeader'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { Section, Title, Lead, PillLink, ChevronLink } from '@/components/ui'
import { professors } from '@/lib/data/professors'
import {
  getUpcomingCourses,
  getPastCourses,
  editionNumber,
  formatPrice,
  formatShortDate,
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
          title="Cursos."
          lead="Jornadas presenciales e intensivas en Vera, con grupos reducidos. Las próximas fechas y todas las ediciones que ya hemos celebrado."
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Cursos' }]}
          stats={[
            { label: upcoming.length === 1 ? 'próximo' : 'próximos', value: upcoming.length },
            { label: past.length === 1 ? 'celebrado' : 'celebrados', value: past.length },
          ]}
        />

        {/* ── Próximos cursos ──────────────────────────────── */}
        <Section tone="surface" labelledBy="proximos-heading" className="!py-20 md:!py-24">
          <Title id="proximos-heading" className="mb-12">Próximos cursos.</Title>

          {upcoming.length === 0 ? (
            <div className="rounded-[28px] bg-white p-10 md:p-14 text-center">
              <Lead>Estamos preparando nuevas fechas. Escríbenos y te avisamos cuando abramos inscripciones.</Lead>
              <div className="mt-8 flex justify-center">
                <PillLink href={CONTACT.whatsappGeneral} external>Avisadme por WhatsApp</PillLink>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {upcoming.map((course) => {
                const professor = professorOf(course)
                return (
                  <li key={course.id}>
                    <AnimateOnScroll>
                      <article className="rounded-[28px] bg-white overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_300px]">
                        <div className="p-8 md:p-12">
                          <p className="text-[14px] font-semibold text-teal-deep">
                            {course.categoryLabel} · Edición {String(editionNumber(course)).padStart(2, '0')}
                          </p>
                          <h3 className="mt-2 text-balance text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.025em] leading-[1.08] text-ink">
                            <Link href={`/cursos/${course.id}`} className="hover:text-teal-deep transition-colors">
                              {course.title}
                            </Link>
                          </h3>
                          {course.subtitle && <p className="mt-2 text-[19px] text-ink-2">{course.subtitle}</p>}

                          <dl className="mt-8 grid grid-cols-3 gap-4 max-w-[460px]">
                            {[
                              { label: 'Fecha', value: formatShortDate(course) },
                              { label: 'Duración', value: course.duration.replace(/\s*horas?$/, ' h') },
                              { label: 'Plazas', value: String(course.spots) },
                            ].map((f) => (
                              <div key={f.label}>
                                <dt className="text-[12px] text-ink-2">{f.label}</dt>
                                <dd className="tabular-nums text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.02em] text-ink">{f.value}</dd>
                              </div>
                            ))}
                          </dl>
                          <p className="mt-3 text-[15px] text-ink-2">{course.location} · {formatPrice(course)}</p>

                          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <PillLink href={whatsappCourse(course.title)} external>Reservar plaza</PillLink>
                            <ChevronLink href={`/cursos/${course.id}`}>Más información</ChevronLink>
                          </div>
                        </div>

                        {professor && (
                          <Link href={`/profesores#${professor.id}`} className="group relative min-h-[300px] bg-[#1d1d1f] block">
                            {professor.imageUrl && (
                              <Image
                                src={professor.imageUrl}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover object-top"
                              />
                            )}
                            <span className="absolute inset-x-0 bottom-0 p-6 pt-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                              <span className="block text-[12px] text-white/70">Ponente</span>
                              <span className="block text-[17px] font-semibold group-hover:underline underline-offset-4">{professor.name}</span>
                            </span>
                          </Link>
                        )}
                      </article>
                    </AnimateOnScroll>
                  </li>
                )
              })}
            </ul>
          )}
        </Section>

        {/* ── Archivo ──────────────────────────────────────── */}
        {past.length > 0 && (
          <Section tone="white" labelledBy="archivo-heading" className="!py-20 md:!py-24">
            <Title id="archivo-heading">Ediciones celebradas.</Title>
            <Lead className="mt-4 mb-14 max-w-[40ch]">
              Cada edición conserva su página con el programa completo y el ponente que la impartió.
            </Lead>

            {years.map((year) => (
              <div key={year} className="mb-14 last:mb-0">
                <h3 className="tabular-nums text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] text-ink pb-4 border-b border-black/[0.12]">
                  {year}
                </h3>
                <ul>
                  {byYear[year].map((course) => {
                    const professor = professorOf(course)
                    return (
                      <li key={course.id} className="border-b border-black/[0.08]">
                        <Link
                          href={`/cursos/${course.id}`}
                          className="group grid grid-cols-[72px_1fr] md:grid-cols-[96px_1fr_auto_auto] items-center gap-x-6 gap-y-3 py-7"
                        >
                          <time dateTime={course.dateISO} className="tabular-nums text-[22px] font-semibold tracking-[-0.02em] text-ink">
                            {DAY(course)} <span className="text-ink-2 font-normal text-[17px]">{MONTH(course)}</span>
                          </time>
                          <div className="min-w-0">
                            <p className="text-[13px] text-ink-2 mb-1">
                              Edición {String(editionNumber(course)).padStart(2, '0')} · {course.categoryLabel}
                            </p>
                            <p className="text-[21px] font-semibold tracking-[-0.015em] leading-snug text-ink group-hover:text-teal-deep transition-colors">
                              {course.title}
                            </p>
                          </div>
                          {professor && (
                            <div className="col-start-2 md:col-start-auto flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full overflow-hidden bg-surface flex items-center justify-center text-[11px] font-semibold text-teal-deep flex-shrink-0">
                                {professor.avatarUrl ? (
                                  <Image src={professor.avatarUrl} alt="" width={32} height={32} className="w-full h-full object-cover" />
                                ) : professor.initials}
                              </span>
                              <span className="text-[15px] text-ink-2">{professor.name}</span>
                            </div>
                          )}
                          <span className="hidden md:inline text-[15px] text-teal-deep group-hover:underline underline-offset-4">
                            Ver la edición ›
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </Section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  )
}
