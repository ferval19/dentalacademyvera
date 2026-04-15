import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  CalendarDays, Clock, MapPin, Users, MessageCircle, Phone,
  GraduationCap, ChevronRight,
} from 'lucide-react'
import { courses } from '@/lib/data/courses'
import { professors } from '@/lib/data/professors'
import { CONTACT, whatsappCourse } from '@/lib/contact'
import Nav from '@/components/Nav'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.dentalacademyvera.com')

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

  const title = course.title
  const description =
    course.subtitle ??
    `Curso de ${course.categoryLabel} en ${course.location}. ${course.date}. Impartido por Dr. Rafael Ibáñez.`
  const pageUrl = `${SITE_URL}/cursos/${id}`

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      images: [{ url: `${SITE_URL}${course.ogImage ?? `/cursos/${id}/opengraph-image`}`, width: 1200, height: 630, alt: `${title} — Dental Academy Vera` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}${course.ogImage ?? `/cursos/${id}/opengraph-image`}`],
    },
  }
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description:
      course.subtitle ??
      `Curso de ${course.categoryLabel} en ${course.location}. ${course.date}. Formación presencial impartida por referentes del sector.`,
    url: courseUrl,
    educationalLevel: 'Professional',
    teaches: course.program?.flatMap((m) => m.topics) ?? [],
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dental Academy Vera',
      url: SITE_URL,
    },
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
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.modality === 'online' ? 'online' : 'onsite',
      startDate: course.dateISO,
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
      { '@type': 'ListItem', position: 2, name: 'Cursos', item: `${SITE_URL}/#cursos` },
      { '@type': 'ListItem', position: 3, name: course.title, item: courseUrl },
    ],
  }

  const waLink = whatsappCourse(course.title)

  const META_PILLS = [
    { icon: CalendarDays, text: course.date,             href: undefined },
    { icon: Clock,        text: course.duration,         href: undefined },
    { icon: MapPin,       text: course.location,         href: course.locationUrl },
    { icon: Users,        text: `${course.spots} plazas`, href: undefined },
  ]

  const LOGISTICS = [
    { icon: CalendarDays, label: 'Fecha',     value: course.date,       href: undefined },
    { icon: Clock,        label: 'Duración',  value: course.duration,   href: undefined },
    { icon: MapPin,       label: 'Lugar',     value: course.location,   href: course.locationUrl },
    { icon: Users,        label: 'Plazas',    value: `Máximo ${course.spots}`, href: undefined },
    { icon: GraduationCap, label: 'Modalidad', value: course.modality.charAt(0).toUpperCase() + course.modality.slice(1), href: undefined },
  ]

  return (
    <>
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="pt-[72px]">
        {/* ── Hero ────────────────────────────────────────────── */}
        <div className="relative bg-hero-gradient overflow-hidden">
          <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />

          {course.imageUrl && (
            <div className="absolute inset-0">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover object-top opacity-20 scale-110 blur"
                priority
                sizes="100vw"
              />
            </div>
          )}

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 md:py-24">
            {/* Breadcrumb */}
            <nav aria-label="Navegación de breadcrumb" className="mb-8">
              <ol className="flex items-center gap-[6px] font-label text-[0.78rem] text-white/50">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                </li>
                <li aria-hidden><ChevronRight className="w-3 h-3" /></li>
                <li>
                  <Link href="/#cursos" className="hover:text-white transition-colors">Cursos</Link>
                </li>
                <li aria-hidden><ChevronRight className="w-3 h-3" /></li>
                <li className="text-white/80 truncate max-w-[200px]">{course.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="font-label text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-teal">
                    {course.categoryLabel}
                  </span>
                  {course.includesPractice && (
                    <span className="bg-teal/20 border border-teal/40 text-teal font-label text-[0.72rem] font-bold tracking-[0.06em] uppercase px-3 py-[5px] rounded-full">
                      ✓ Incluye práctica
                    </span>
                  )}
                </div>
                <h1 className="font-display text-[clamp(2.3rem,5vw,3.8rem)] font-bold leading-[1.1] mb-5">
                  {course.title}
                </h1>
                {course.subtitle && (
                  <p className="text-[1.15rem] opacity-78 max-w-[600px] leading-[1.7]">
                    {course.subtitle}
                  </p>
                )}
              </div>

              {/* Quick info pills */}
              <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                {META_PILLS.map(({ icon: Icon, text, href }) => (
                  <div
                    key={text}
                    className="flex items-center gap-[10px] bg-white/10 border border-white/15 px-4 py-[9px] rounded-full font-body text-[0.88rem] text-white"
                  >
                    <Icon className="w-4 h-4 text-teal/80 flex-shrink-0 stroke-[1.75]" />
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">
                        {text}
                      </a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky CTA bar ──────────────────────────────────── */}
        <div className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-6 py-[10px] flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[1.6rem] font-bold text-navy">
                {course.price} €
              </span>
            </div>
            <div className="flex gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[8px] bg-[#25D366] text-white font-body font-semibold text-[0.88rem] hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="w-4 h-4 stroke-[2]" />
                WhatsApp
              </a>
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[8px] bg-teal text-white font-body font-semibold text-[0.88rem] hover:bg-teal-dark transition-colors"
              >
                <Phone className="w-4 h-4 stroke-[2]" />
                {CONTACT.phoneFormatted}
              </a>
            </div>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* LEFT: Program */}
          <div>
            {course.program && (
              <section aria-labelledby="programa-heading">
                <h2
                  id="programa-heading"
                  className="font-display text-[1.95rem] font-bold text-navy mb-10 flex items-center gap-4"
                >
                  <span className="w-10 h-[3px] bg-teal flex-shrink-0" />
                  Programa del curso
                </h2>

                <div className="space-y-0 border border-gray-200 rounded-xl overflow-hidden">
                  {course.program.map((module, idx) => (
                    <div
                      key={module.number}
                      className={`p-7 md:p-9 ${idx !== 0 ? 'border-t border-gray-200' : ''} ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-off-white'
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-11 h-11 rounded-full bg-teal-light flex items-center justify-center font-label font-bold text-[0.95rem] text-teal flex-shrink-0 mt-[2px]">
                          {module.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-[1.2rem] font-semibold text-navy mb-5">
                            {module.title}
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-[10px]">
                            {module.topics.map((topic) => (
                              <li
                                key={topic}
                                className="flex gap-2 items-start text-[0.95rem] text-gray-500 leading-[1.55]"
                              >
                                <span className="text-teal font-bold flex-shrink-0 mt-[2px]">—</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professor on mobile */}
            {professor && (
              <section aria-labelledby="ponente-heading" className="mt-12 lg:hidden">
                <ProfessorCard professor={professor} />
              </section>
            )}

            {/* Collaborator on mobile */}
            <div className="mt-8 lg:hidden bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="font-label text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-4">
                Colabora
              </div>
              <a
                href="https://www.endogal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Image
                  src="/images/endogal.png"
                  alt="Endogal"
                  width={120}
                  height={80}
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          {/* RIGHT: Sidebar (desktop) */}
          <aside className="hidden lg:block space-y-5">
            {/* Price card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="font-label text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1">
                Inversión
              </div>
              <div className="font-display text-[2.6rem] font-bold text-navy leading-none mb-6">
                {course.price} €
              </div>

              <div className="space-y-[10px]">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-[14px] rounded-[8px] bg-[#25D366] text-white font-body font-semibold text-[0.95rem] hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 stroke-[2]" />
                  WhatsApp
                </a>
                <a
                  href={CONTACT.phoneTel}
                  className="flex items-center justify-center gap-2 w-full py-[14px] rounded-[8px] bg-teal text-white font-body font-semibold text-[0.95rem] hover:bg-teal-dark transition-colors"
                >
                  <Phone className="w-4 h-4 stroke-[2]" />
                  {CONTACT.phoneFormatted}
                </a>
              </div>
            </div>

            {/* Logistics */}
            <div className="bg-off-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-label text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-5">
                Detalles del curso
              </h3>
              <div className="space-y-4">
                {LOGISTICS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-teal-light flex items-center justify-center flex-shrink-0 mt-[1px]">
                      <Icon className="w-4 h-4 text-teal stroke-[1.75]" />
                    </div>
                    <div>
                      <div className="font-label text-[0.7rem] font-semibold tracking-[0.06em] uppercase text-gray-400">
                        {label}
                      </div>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer"
                           className="text-[0.95rem] text-teal font-medium hover:underline">
                          {value}
                        </a>
                      ) : (
                        <div className="text-[0.95rem] text-navy font-medium">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Includes */}
              {course.includes && course.includes.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <div className="font-label text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-3">
                    Incluido en el precio
                  </div>
                  <ul className="space-y-2">
                    {course.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[0.9rem] text-gray-600">
                        <span className="w-[6px] h-[6px] rounded-full bg-teal flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Collaborator */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="font-label text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-4">
                Colabora
              </div>
              <a
                href="https://www.endogal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Image
                  src="/images/endogal.png"
                  alt="Endogal"
                  width={120}
                  height={80}
                  className="object-contain"
                />
              </a>
            </div>

            {/* Professor sidebar */}
            {professor && <ProfessorCard professor={professor} />}
          </aside>
        </div>
      </main>

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="bg-cta-gradient py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-radial-overlay pointer-events-none" />
        <div className="relative z-10 max-w-[700px] mx-auto px-6">
          <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold mb-4">
            ¿Listo para inscribirte?
          </h2>
          <p className="text-[1.05rem] opacity-72 mb-10 leading-[1.7]">
            Plazas limitadas — {course.spots} asistentes máximo para garantizar la calidad de la
            formación.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[10px] px-8 py-[14px] rounded-[10px] bg-[#25D366] text-white font-body font-semibold text-[1rem] hover:bg-[#20BD5A] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 stroke-[2]" />
              WhatsApp
            </a>
            <a
              href={CONTACT.phoneTel}
              className="inline-flex items-center gap-[10px] px-8 py-[14px] rounded-[10px] bg-teal text-white font-body font-semibold text-[1rem] hover:bg-teal-dark hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(43,181,160,0.4)] transition-all duration-300"
            >
              <Phone className="w-5 h-5 stroke-[2]" />
              {CONTACT.phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Professor card sub-component ─────────────────────────────────────────────
function ProfessorCard({
  professor,
}: {
  professor: NonNullable<ReturnType<typeof professors.find>>
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {professor.imageUrl && (
        <div className="relative h-52 overflow-hidden bg-[#f0eeea]">
          <Image
            src={professor.imageUrl}
            alt={professor.name}
            fill
            className="object-cover object-top"
            sizes="360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0eeea]/40 via-transparent to-transparent" />
        </div>
      )}
      <div className="p-6">
        <div className="font-label text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-teal mb-1">
          Ponente
        </div>
        <h3 className="font-display text-[1.15rem] font-semibold text-navy mb-1">
          {professor.name}
        </h3>
        <div className="font-label text-[0.74rem] text-teal uppercase tracking-[0.04em] font-semibold mb-4">
          {professor.specialty}
        </div>
        <p className="text-[0.88rem] text-gray-500 leading-[1.6] mb-5">{professor.bio}</p>

        {professor.credentialGroups?.map((group) => (
          <div key={group.label} className="mb-4">
            <div className="font-label text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-2">
              {group.label}
            </div>
            <ul className="space-y-[6px]">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 items-start text-[0.82rem] text-gray-500 leading-[1.45]">
                  <span className="w-[5px] h-[5px] rounded-full bg-teal flex-shrink-0 mt-[6px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
