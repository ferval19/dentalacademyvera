import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  CalendarDays, MapPin, Users, MessageCircle, Phone, ChevronRight, Check, Euro, Sparkles, GraduationCap,
} from 'lucide-react'
import {
  courses, formatPrice, isPastCourse, getNextCourse, formatLongDate, formatShortDate,
} from '@/lib/data/courses'
import type { Course, Professor } from '@/types'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { professors } from '@/lib/data/professors'
import { CONTACT, whatsappCourse } from '@/lib/contact'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import { SITE_URL, SITE_NAME, pageMetadata } from '@/lib/site'

/** Recorta en la última palabra completa antes de `max` caracteres. */
function clip(text: string, max = 158) {
  if (text.length <= max) return text
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:.]$/, '') + '…'
}

function courseDescription(course: Course) {
  const professor = professors.find((p) => p.id === course.professorId)
  const cat = course.categoryLabel.toLowerCase()
  const when = isPastCourse(course)
    ? `Edición celebrada del curso de ${cat} el ${formatLongDate(course)}`
    : `Curso presencial de ${cat} el ${formatLongDate(course)}`
  const who = professor ? ` con el ${professor.name}` : ''
  const lead = `${when} en Vera (Almería)${who}.`
  // Añade la frase extra más informativa que quepa entera; nunca a medias
  const candidates = [
    course.summary?.split(/(?<=[.?!])\s/)[0],
    course.subtitle && `${course.subtitle}.`,
  ].filter(Boolean) as string[]
  const extra = candidates.find((c) => lead.length + 1 + c.length <= 158)
  return clip(extra ? `${lead} ${extra}` : lead)
}

function isoWorkload(duration: string) {
  const h = parseFloat(duration.replace(',', '.'))
  if (!Number.isFinite(h)) return undefined
  const mins = Math.round((h % 1) * 60)
  return `PT${Math.floor(h)}H${mins ? `${mins}M` : ''}`
}

function courseOgImage(course: Course) {
  return course.ogImage ?? `/cursos/${course.id}/opengraph-image`
}

type Props = { params: Promise<{ id: string }> }

// ── Static generation ─────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }))
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const course = courses.find((c) => c.id === id)
  if (!course) return {}

  return pageMetadata({
    title: course.title,
    socialTitle: course.subtitle ? `${course.title}: ${course.subtitle.toLowerCase()}` : course.title,
    description: courseDescription(course),
    path: `/cursos/${id}`,
    image: { url: courseOgImage(course), width: 1200, height: 630, alt: `${course.title} — ${SITE_NAME}` },
  })
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CoursePage({ params }: Props) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)
  if (!course) notFound()

  const professor = course.professorId
    ? professors.find((p) => p.id === course.professorId)
    : undefined

  const courseUrl = `${SITE_URL}/cursos/${course.id}`
  const past = isPastCourse(course)
  const nextCourse = past ? getNextCourse() : undefined
  const priceLabel = formatPrice(course)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description:
      course.summary ??
      course.subtitle ??
      `Curso de ${course.categoryLabel} en ${course.location}. ${course.date}. Formación presencial impartida por referentes del sector.`,
    url: courseUrl,
    image: `${SITE_URL}${courseOgImage(course)}`,
    inLanguage: 'es',
    educationalLevel: 'Professional',
    teaches: course.program?.flatMap((m) => m.topics) ?? course.objectives ?? [],
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(course.price != null && !past && {
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: 'EUR',
        availability:
          course.spots > 3
            ? 'https://schema.org/InStock'
            : 'https://schema.org/LimitedAvailability',
        validFrom: new Date().toISOString().split('T')[0],
        url: courseUrl,
      },
    }),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.modality === 'online' ? 'online' : 'onsite',
      startDate: course.dateISO,
      endDate: course.dateISO,
      // Google exige courseWorkload (o courseSchedule) en CourseInstance: "8,5 horas" → PT8H30M
      ...(isoWorkload(course.duration) && { courseWorkload: isoWorkload(course.duration) }),
      location: {
        '@type': 'Place',
        name: course.location,
        ...(course.locationUrl && { url: course.locationUrl }),
        address: { '@type': 'PostalAddress', addressLocality: 'Vera', addressRegion: 'Almería', addressCountry: 'ES' },
      },
      ...(professor && {
        instructor: {
          '@type': 'Person',
          name: professor.name,
          jobTitle: professor.specialty,
          worksFor: { '@type': 'Organization', name: 'Dental Academy Vera' },
        },
      }),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Cursos', item: `${SITE_URL}/cursos` },
      { '@type': 'ListItem', position: 3, name: course.title, item: courseUrl },
    ],
  }

  const waLink = whatsappCourse(course.title)
  const year = course.dateISO?.slice(0, 4) ?? ''
  const weekday = course.dateISO
    ? new Date(`${course.dateISO}T12:00:00Z`).toLocaleDateString('es-ES', { weekday: 'long', timeZone: 'UTC' })
    : ''

  const FACTS = [
    { value: formatShortDate(course), caption: `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${year}` },
    { value: course.duration.replace(/\s*horas?$/, ' h'), caption: course.schedule ?? 'Jornada intensiva' },
    { value: String(course.spots), caption: 'plazas como máximo' },
    { value: 'Vera', caption: course.location },
    ...(course.price != null
      ? [{ value: `${course.price} €`, caption: 'por asistente' }]
      : []),
  ]

  const sectionLinks = [
    course.summary && { href: '#resumen', label: 'Resumen' },
    (course.objectives || course.program) && { href: '#programa', label: course.program ? 'Programa' : 'Objetivos' },
    professor && { href: '#ponente', label: 'Ponente' },
    { href: '#detalles', label: 'Detalles' },
  ].filter(Boolean) as { href: string; label: string }[]

  const detailTiles: { icon: typeof CalendarDays; title: string; body: React.ReactNode }[] = [
    {
      icon: CalendarDays,
      title: 'Fecha y horario',
      body: (
        <>
          <p className="text-ink">{formatLongDate(course)}</p>
          {course.schedule && <p>{course.schedule}</p>}
          <p>{course.duration} de formación</p>
        </>
      ),
    },
    {
      icon: MapPin,
      title: 'Lugar',
      body: (
        <>
          <p className="text-ink">{course.location}</p>
          <p>{course.modality === 'online' ? 'Online' : 'Presencial'} · Vera, Almería</p>
          {course.locationUrl && (
            <a
              href={course.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-teal-deep hover:underline underline-offset-4 mt-1"
            >
              Ver el espacio <ChevronRight aria-hidden className="w-4 h-4" />
            </a>
          )}
        </>
      ),
    },
    {
      icon: Users,
      title: 'Plazas',
      body: (
        <>
          <p className="text-ink">Máximo {course.spots} asistentes</p>
          <p>Grupo reducido para que puedas preguntar y comentar tus casos.</p>
        </>
      ),
    },
    {
      icon: Euro,
      title: 'Precio',
      body: (
        <>
          <p className="text-ink">{priceLabel}</p>
          {course.price == null && !past && <p>Escríbenos y te informamos del precio y la reserva.</p>}
        </>
      ),
    },
    ...(course.includes && course.includes.length > 0
      ? [{
          icon: Sparkles,
          title: 'Incluye',
          body: (
            <>
              {course.includes.map((item) => <p key={item} className="text-ink">{item}</p>)}
              {course.includesPractice && <p>Y práctica clínica.</p>}
            </>
          ),
        }]
      : course.includesPractice
        ? [{ icon: GraduationCap, title: 'Práctica', body: <p className="text-ink">Incluye práctica clínica</p> }]
        : []),
  ]

  return (
    <>
      <Nav />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="pt-[72px] font-apple text-ink antialiased">
        {/* ── Barra local (como la subnavegación de producto de Apple) ── */}
        <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.08]">
          <div className="max-w-[1080px] mx-auto px-6 h-[52px] flex items-center justify-between gap-6">
            <span className="text-[17px] md:text-[19px] font-semibold tracking-[-0.01em] truncate">
              {course.title}
            </span>
            <nav aria-label="Secciones del curso" className="flex items-center gap-6 flex-shrink-0">
              <ul className="hidden md:flex items-center gap-6">
                {sectionLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[12px] text-ink/80 hover:text-ink transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              {past ? (
                nextCourse && (
                  <Link
                    href={`/cursos/${nextCourse.id}`}
                    className="rounded-full bg-teal-deep hover:bg-teal-deep-hover text-white text-[12px] font-medium px-[14px] py-[6px] transition-colors"
                  >
                    Próximo curso
                  </Link>
                )
              ) : (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-teal-deep hover:bg-teal-deep-hover text-white text-[12px] font-medium px-[14px] py-[6px] transition-colors"
                >
                  Reservar
                </a>
              )}
            </nav>
          </div>
        </div>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="bg-white px-6 pt-20 md:pt-28 pb-16 md:pb-20 text-center">
          <p className="text-[17px] md:text-[21px] font-semibold text-teal-deep mb-3">
            {course.categoryLabel}
            {past && <span className="text-ink-2 font-normal"> · Edición celebrada</span>}
          </p>
          <h1 className="text-balance mx-auto max-w-[17ch] text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            {course.title}
          </h1>
          {course.subtitle && (
            <p className="mt-5 text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium text-ink-2 tracking-[-0.015em]">
              {course.subtitle}
            </p>
          )}
          <p className="mt-6 text-[17px] text-ink">
            {formatLongDate(course)} · {course.location}
            {professor && <span className="text-ink-2"> · con el {professor.name}</span>}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {past ? (
              nextCourse ? (
                <Link
                  href={`/cursos/${nextCourse.id}`}
                  className="rounded-full bg-teal-deep hover:bg-teal-deep-hover text-white text-[17px] font-medium px-6 py-3 transition-colors"
                >
                  Ver el próximo curso
                </Link>
              ) : (
                <a
                  href={CONTACT.whatsappGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-teal-deep hover:bg-teal-deep-hover text-white text-[17px] font-medium px-6 py-3 transition-colors"
                >
                  Avisadme de la próxima edición
                </a>
              )
            ) : (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-teal-deep hover:bg-teal-deep-hover text-white text-[17px] font-medium px-6 py-3 transition-colors"
              >
                Reservar plaza
              </a>
            )}
            {(course.objectives || course.program) && (
              <a href="#programa" className="group inline-flex items-center gap-1 text-[17px] text-teal-deep hover:underline underline-offset-4">
                {course.program ? 'Ver el programa' : 'Qué vas a aprender'}
                <ChevronRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </section>

        {/* ── Cifras clave ───────────────────────────────────────── */}
        <section aria-label="Datos clave" className="bg-white px-6 pb-20 md:pb-28">
          <dl className={`max-w-[1080px] mx-auto grid grid-cols-2 ${FACTS.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'} border-t border-black/[0.08]`}>
            {FACTS.map((f, i) => (
              <div
                key={f.caption}
                className={`pt-8 pb-2 px-4 text-center ${
                  i === FACTS.length - 1 && FACTS.length % 2 === 1 ? 'col-span-2 md:col-span-1' : ''
                } ${i % 2 === 1 ? 'border-l border-black/[0.08]' : ''} ${
                  i > 0 ? 'md:border-l md:border-black/[0.08]' : ''
                } ${i > 1 ? 'border-t md:border-t-0 border-black/[0.08]' : ''}`}
              >
                <dt className="sr-only">{f.caption}</dt>
                <dd className="tabular-nums text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold tracking-[-0.03em] leading-none">
                  {f.value}
                </dd>
                <dd className="mt-3 text-[14px] text-ink-2 leading-snug">{f.caption}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Sobre el curso ─────────────────────────────────────── */}
        {course.summary && (
          <section id="resumen" className="scroll-mt-[140px] bg-surface px-6 py-24 md:py-32">
            <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 md:gap-20">
              <AnimateOnScroll>
                <h2 className="text-[17px] font-semibold text-teal-deep mb-4">Sobre el curso</h2>
                {/* Titular corto: la idea del curso en una frase */}
                <p className="text-balance text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-ink">
                  {course.quote ?? course.subtitle ?? course.title}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100}>
                <div className="space-y-6 text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.65] text-[#424245] max-w-[60ch] md:pt-10">
                  {summarySentences(course.summary).map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* ── Objetivos / Programa ───────────────────────────────── */}
        {(course.objectives || course.program) && (
          <section id="programa" className="scroll-mt-[140px] bg-white px-6 py-24 md:py-32">
            <div className="max-w-[1080px] mx-auto">
              <AnimateOnScroll>
                <h2 className="text-balance text-[clamp(2.2rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] leading-[1.06] mb-14 max-w-[16ch]">
                  {course.program ? 'El programa, paso a paso.' : 'Lo que vas a aprender.'}
                </h2>
              </AnimateOnScroll>

              {course.objectives && (
                <ul className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  {course.objectives.map((objective, i) => (
                    <li key={objective} className={`${tileSpan(course.objectives!.length, i)}`}>
                      <AnimateOnScroll delay={i * 60} className="h-full">
                        <div className="h-full rounded-[28px] bg-surface p-8 md:p-10 flex flex-col gap-6 min-h-[200px]">
                          <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                            <Check aria-hidden className="w-[18px] h-[18px] text-teal-deep stroke-[2.5]" />
                          </span>
                          <p className="mt-auto text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-[1.22] tracking-[-0.015em]">
                            {objective}
                          </p>
                        </div>
                      </AnimateOnScroll>
                    </li>
                  ))}
                </ul>
              )}

              {course.program && (
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.program.map((module, i) => (
                    <li key={module.number}>
                      <AnimateOnScroll delay={i * 60} className="h-full">
                        <div className="h-full rounded-[28px] bg-surface p-8 md:p-10">
                          <span className="text-[14px] font-semibold text-teal-deep">Módulo {module.number}</span>
                          <h3 className="mt-2 mb-6 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.12]">
                            {module.title}
                          </h3>
                          <ul className="space-y-3">
                            {module.topics.map((topic) => (
                              <li key={topic} className="flex gap-3 text-[17px] text-ink-2 leading-snug">
                                <Check aria-hidden className="w-4 h-4 mt-[3px] text-teal-deep flex-shrink-0 stroke-[2.5]" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AnimateOnScroll>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        )}

        {/* ── Ponente ────────────────────────────────────────────── */}
        {professor && <SpeakerSection professor={professor} />}

        {/* ── Detalles prácticos ─────────────────────────────────── */}
        <section id="detalles" className="scroll-mt-[140px] bg-white px-6 py-24 md:py-32">
          <div className="max-w-[1080px] mx-auto">
            <AnimateOnScroll>
              <h2 className="text-balance text-[clamp(2.2rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] leading-[1.06] mb-14 max-w-[18ch]">
                Todo lo que necesitas saber.
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {detailTiles.map((tile, i) => (
                <div key={tile.title} className={detailSpan(detailTiles.length, i)}>
                  <DetailTile icon={tile.icon} title={tile.title}>{tile.body}</DetailTile>
                </div>
              ))}
            </div>

            {course.collaborators && course.collaborators.length > 0 && (
              <div className="mt-20 text-center">
                <p className="text-[14px] text-ink-2 mb-8">Con la colaboración de</p>
                <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
                  {course.collaborators.map((c) => (
                    <li key={c.name}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block opacity-80 hover:opacity-100 transition-opacity"
                      >
                        <Image
                          src={c.logoUrl}
                          alt={c.name}
                          width={160}
                          height={56}
                          className="h-11 w-auto object-contain"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────── */}
        <section className="bg-surface px-6 py-24 md:py-32 text-center">
          <AnimateOnScroll className="max-w-[720px] mx-auto">
            <h2 className="text-balance text-[clamp(2.4rem,6vw,4.25rem)] font-semibold tracking-[-0.035em] leading-[1.04]">
              {past ? '¿Te interesa la próxima edición?' : 'Reserva tu plaza.'}
            </h2>
            <p className="mt-5 text-[clamp(1.15rem,2vw,1.4rem)] text-ink-2 leading-snug">
              {past
                ? 'Escríbenos y te avisamos en cuanto abramos nuevas fechas.'
                : `Solo ${course.spots} plazas. Escríbenos por WhatsApp o llámanos y te la guardamos.`}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={past ? CONTACT.whatsappGeneral : waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-teal-deep hover:bg-teal-deep-hover text-white text-[17px] font-medium px-7 py-3 transition-colors"
              >
                <MessageCircle aria-hidden className="w-[18px] h-[18px]" />
                Escribir por WhatsApp
              </a>
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 hover:border-ink/40 text-ink text-[17px] font-medium px-7 py-3 transition-colors"
              >
                <Phone aria-hidden className="w-[18px] h-[18px]" />
                {CONTACT.phoneFormatted}
              </a>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Ruta de navegación al final, como en apple.com */}
        <nav aria-label="Ruta de navegación" className="bg-surface border-t border-black/[0.08]">
          <ol className="max-w-[1080px] mx-auto px-6 py-4 flex items-center gap-2 text-[12px] text-ink-2">
            <li><Link href="/" className="hover:text-ink">Inicio</Link></li>
            <li aria-hidden><ChevronRight className="w-3 h-3" /></li>
            <li><Link href="/cursos" className="hover:text-ink">Cursos</Link></li>
            <li aria-hidden><ChevronRight className="w-3 h-3" /></li>
            <li aria-current="page" className="text-ink truncate">{course.title}</li>
          </ol>
        </nav>
      </main>
      <Footer />
    </>
  )
}

// ── "Sobre el curso": párrafos cortos; une frases breves para no trocear de más ──
function summarySentences(summary: string) {
  const paras: string[] = []
  for (const sentence of summary.split(/(?<=[.?!])\s+/)) {
    const last = paras[paras.length - 1]
    if (last && last.length + sentence.length < 160) paras[paras.length - 1] = `${last} ${sentence}`
    else paras.push(sentence)
  }
  return paras
}

// ── Mosaico de objetivos: reparte 6 columnas según cuántos haya ─────────────
function tileSpan(total: number, index: number) {
  if (total === 5) return index < 2 ? 'md:col-span-3' : 'md:col-span-2'
  if (total === 4 || total <= 2) return 'md:col-span-3'
  if (total === 7) return index < 4 ? 'md:col-span-3' : 'md:col-span-2'
  return 'md:col-span-2'
}

// ── Fichas prácticas: rejilla de 6 columnas sin huecos ──────────────────────
function detailSpan(total: number, index: number) {
  if (total === 4) return 'lg:col-span-3'
  if (total === 5) return index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
  return 'lg:col-span-2'
}

// ── Ficha práctica ───────────────────────────────────────────────────────────
function DetailTile({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[24px] bg-surface p-8">
      <Icon aria-hidden className="w-6 h-6 text-teal-deep mb-6 stroke-[1.75]" />
      <h3 className="text-[14px] font-semibold text-ink-2 mb-2">{title}</h3>
      <div className="text-[19px] leading-[1.4] text-ink-2 space-y-1 font-medium tracking-[-0.01em]">{children}</div>
    </div>
  )
}

// ── Ponente: sección oscura, retrato grande ─────────────────────────────────
function SpeakerSection({ professor }: { professor: Professor }) {
  const highlights = professor.credentialGroups?.flatMap((g) => g.items).slice(0, 5) ?? []
  return (
    <section id="ponente" className="scroll-mt-[140px] bg-[#000] text-white px-6 py-24 md:py-32">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 md:gap-16 items-center">
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
          <p className="text-[17px] font-semibold text-[#5fd3bf] mb-3">Imparte el curso</p>
          <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
            {professor.name}
          </h2>
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
          <Link
            href={`/profesores#${professor.id}`}
            className="mt-8 inline-flex items-center gap-1 text-[17px] text-[#5fd3bf] hover:underline underline-offset-4"
          >
            Ver perfil completo <ChevronRight aria-hidden className="w-4 h-4" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
