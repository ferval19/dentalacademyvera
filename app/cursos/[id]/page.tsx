import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { courses } from '@/lib/data/courses'
import { professors } from '@/lib/data/professors'
import { CONTACT, whatsappCourse } from '@/lib/contact'
import Nav from '@/components/Nav'

const SITE_URL = 'https://dentalacademyvera.com'

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
  const url = `${SITE_URL}/cursos/${id}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: `/cursos/${id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/cursos/${id}/opengraph-image`],
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

  // JSON-LD — Course + Event schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.subtitle ?? `Curso de ${course.categoryLabel}`,
    url: `${SITE_URL}/cursos/${course.id}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dental Academy Vera',
      sameAs: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: String(course.price),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/LimitedAvailability',
      url: `${SITE_URL}/cursos/${course.id}`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.modality,
      startDate: course.dateISO,
      location: {
        '@type': 'Place',
        name: course.location,
      },
      ...(professor && {
        instructor: {
          '@type': 'Person',
          name: professor.name,
          jobTitle: professor.specialty,
        },
      }),
    },
  }

  const waLink = whatsappCourse(course.title)

  return (
    <>
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pt-[72px]">
        {/* ── Hero ────────────────────────────────────────────── */}
        <div className="relative bg-hero-gradient overflow-hidden">
          <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />

          {course.imageUrl && (
            <div className="absolute inset-0">
              <Image
                src={course.imageUrl}
                alt=""
                fill
                className="object-cover object-top opacity-15"
                priority
                sizes="100vw"
              />
            </div>
          )}

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 md:py-24">
            {/* Breadcrumb */}
            <nav aria-label="Navegación de breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-label text-[0.75rem] text-white/50">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/#cursos" className="hover:text-white transition-colors">
                    Cursos
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-white/80 truncate max-w-[200px]">{course.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="font-label text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-teal">
                    {course.categoryLabel}
                  </span>
                  {course.includesPractice && (
                    <span className="bg-teal/20 border border-teal/40 text-teal font-label text-[0.68rem] font-bold tracking-[0.06em] uppercase px-3 py-1 rounded-full">
                      ✓ Incluye práctica
                    </span>
                  )}
                </div>
                <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.1] mb-4">
                  {course.title}
                </h1>
                {course.subtitle && (
                  <p className="text-[1.1rem] opacity-80 max-w-[600px] leading-relaxed">
                    {course.subtitle}
                  </p>
                )}
              </div>

              {/* Quick info pill */}
              <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                {[
                  { icon: '📅', text: course.date },
                  { icon: '⏱', text: course.duration },
                  { icon: '📍', text: course.location },
                  { icon: '👥', text: `${course.spots} plazas` },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full font-body text-[0.85rem] text-white"
                  >
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky CTA bar ──────────────────────────────────── */}
        <div className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[1.5rem] font-bold text-navy">
                {course.price} €
              </span>
              <span className="font-label text-[0.75rem] text-gray-400">desde · IVA no incl.</span>
            </div>
            <div className="flex gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[8px] bg-[#25D366] text-white font-body font-semibold text-[0.85rem] hover:bg-[#20BD5A] transition-colors"
              >
                💬 WhatsApp
              </a>
              <a
                href={`tel:+34${CONTACT.phone}`}
                className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[8px] bg-teal text-white font-body font-semibold text-[0.85rem] hover:bg-teal-dark transition-colors"
              >
                📞 {CONTACT.phoneFormatted}
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
                  className="font-display text-[1.8rem] font-bold text-navy mb-10 flex items-center gap-4"
                >
                  <span className="w-10 h-[3px] bg-teal flex-shrink-0" />
                  Programa del curso
                </h2>

                <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                  {course.program.map((module, idx) => (
                    <div
                      key={module.number}
                      className={`p-6 md:p-8 ${idx !== 0 ? 'border-t border-gray-200' : ''} ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-off-white'
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center font-label font-bold text-[0.9rem] text-teal flex-shrink-0 mt-[2px]">
                          {module.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-[1.15rem] font-semibold text-navy mb-4">
                            {module.title}
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                            {module.topics.map((topic) => (
                              <li
                                key={topic}
                                className="flex gap-2 items-start text-[0.9rem] text-gray-500 leading-[1.5]"
                              >
                                <span className="text-teal font-bold flex-shrink-0 mt-[1px]">—</span>
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

            {/* Professor (on mobile shows here, on desktop in sidebar) */}
            {professor && (
              <section aria-labelledby="ponente-heading" className="mt-12 lg:hidden">
                <ProfessorCard professor={professor} />
              </section>
            )}
          </div>

          {/* RIGHT: Sidebar (desktop only) */}
          <aside className="hidden lg:block space-y-6">
            {/* Price card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="font-label text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1">
                Inversión
              </div>
              <div className="font-display text-[2.4rem] font-bold text-navy leading-none mb-1">
                {course.price} €
              </div>
              <div className="font-label text-[0.75rem] text-gray-400 mb-5">IVA no incluido</div>

              <div className="space-y-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-[13px] rounded-[8px] bg-[#25D366] text-white font-body font-semibold text-[0.9rem] hover:bg-[#20BD5A] transition-colors"
                >
                  💬 WhatsApp
                </a>
                <a
                  href={`tel:+34${CONTACT.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-[13px] rounded-[8px] bg-teal text-white font-body font-semibold text-[0.9rem] hover:bg-teal-dark transition-colors"
                >
                  📞 {CONTACT.phoneFormatted}
                </a>
                <a
                  href={CONTACT.emailHref}
                  className="flex items-center justify-center gap-2 w-full py-[13px] rounded-[8px] border border-gray-200 text-gray-600 font-body font-semibold text-[0.9rem] hover:border-teal hover:text-teal transition-colors"
                >
                  ✉️ {CONTACT.email}
                </a>
              </div>
            </div>

            {/* Logistics */}
            <div className="bg-off-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-label text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">
                Detalles
              </h3>
              <div className="space-y-3 text-[0.88rem] text-gray-600">
                {[
                  { icon: '📅', label: 'Fecha', value: course.date },
                  { icon: '⏱', label: 'Duración', value: course.duration },
                  { icon: '📍', label: 'Lugar', value: course.location },
                  { icon: '👥', label: 'Plazas', value: `Máximo ${course.spots}` },
                  { icon: '🎓', label: 'Modalidad', value: course.modality.charAt(0).toUpperCase() + course.modality.slice(1) },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-[1rem] flex-shrink-0">{icon}</span>
                    <div>
                      <div className="font-label text-[0.68rem] font-semibold tracking-[0.06em] uppercase text-gray-400">
                        {label}
                      </div>
                      <div className="text-navy font-medium">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professor sidebar */}
            {professor && <ProfessorCard professor={professor} />}
          </aside>
        </div>
      </main>

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="bg-cta-gradient py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-radial-overlay pointer-events-none" />
        <div className="relative z-10 max-w-[700px] mx-auto px-6">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold mb-3">
            ¿Listo para inscribirte?
          </h2>
          <p className="text-[1rem] opacity-75 mb-8">
            Plazas limitadas — {course.spots} asistentes máximo para garantizar la calidad de la
            formación.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[10px] bg-[#25D366] text-white font-body font-semibold hover:bg-[#20BD5A] hover:-translate-y-[2px] transition-all duration-300"
            >
              💬 WhatsApp
            </a>
            <a
              href={`tel:+34${CONTACT.phone}`}
              className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[10px] bg-teal text-white font-body font-semibold hover:bg-teal-dark hover:-translate-y-[2px] transition-all duration-300"
            >
              📞 {CONTACT.phoneFormatted}
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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {professor.imageUrl && (
        <div className="relative h-48 overflow-hidden bg-navy-deep">
          <Image
            src={professor.imageUrl}
            alt={professor.name}
            fill
            className="object-cover object-right"
            sizes="360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
        </div>
      )}
      <div className="p-5">
        <div className="font-label text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-teal mb-1">
          Ponente
        </div>
        <h3 className="font-display text-[1.1rem] font-semibold text-navy mb-1">
          {professor.name}
        </h3>
        <div className="font-label text-[0.72rem] text-teal uppercase tracking-[0.04em] font-semibold mb-3">
          {professor.specialty}
        </div>
        <p className="text-[0.82rem] text-gray-500 leading-[1.55] mb-4">{professor.bio}</p>

        {professor.credentialGroups?.map((group) => (
          <div key={group.label} className="mb-3">
            <div className="font-label text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-1">
              {group.label}
            </div>
            <ul className="space-y-[4px]">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 items-start text-[0.78rem] text-gray-500 leading-[1.4]">
                  <span className="text-teal flex-shrink-0">•</span>
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
