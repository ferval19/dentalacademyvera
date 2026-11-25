import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/Nav'
import PageHeader from '@/components/PageHeader'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { professors } from '@/lib/data/professors'
import { getCoursesByProfessor, isPastCourse, formatShortDate } from '@/lib/data/courses'
import { SITE_URL, pageMetadata } from '@/lib/site'

const DESCRIPTION =
  'Ponentes de Dental Academy Vera en endodoncia y ortodoncia con alineadores: formación, trayectoria y cursos que han impartido en Vera (Almería).'

export const metadata: Metadata = pageMetadata({
  title: 'Profesorado',
  description: DESCRIPTION,
  path: '/profesores',
})

export default function ProfessorsPage() {
  // Primero quien tiene un curso próximo; después, por su curso más reciente
  const roster = professors
    .map((professor) => {
      const taught = getCoursesByProfessor(professor.id)
      return {
        professor,
        taught,
        hasUpcoming: taught.some((c) => !isPastCourse(c)),
        latest: taught[0]?.dateISO ?? '',
      }
    })
    .filter((r) => r.taught.length > 0)
    .sort((a, b) =>
      a.hasUpcoming !== b.hasUpcoming ? (a.hasUpcoming ? -1 : 1) : b.latest.localeCompare(a.latest),
    )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Profesorado de Dental Academy Vera',
    itemListElement: roster.map(({ professor }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: professor.name,
        jobTitle: professor.specialty,
        url: `${SITE_URL}/profesores#${professor.id}`,
        ...(professor.imageUrl && { image: `${SITE_URL}${professor.imageUrl}` }),
      },
    })),
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pt-[72px]">
        <PageHeader
          eyebrow="Profesorado"
          title="Quién enseña en Vera"
          lead="Clínicos en activo que dedican una jornada a compartir cómo trabajan. Estos son los ponentes que han formado parte de Dental Academy Vera."
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Profesorado' }]}
          stats={[{ label: 'Ponentes', value: roster.length }]}
        />

        <div className="bg-off-white py-20">
          <div className="max-w-[1200px] mx-auto px-6 space-y-10">
            {roster.map(({ professor, taught, hasUpcoming }) => (
              <AnimateOnScroll key={professor.id}>
                <article
                  id={professor.id}
                  aria-labelledby={`${professor.id}-name`}
                  className="scroll-mt-[96px] grid grid-cols-1 lg:grid-cols-[360px_1fr] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md"
                >
                  {/* Foto */}
                  <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[480px] bg-[#f0eeea]">
                    {professor.imageUrl ? (
                      <Image
                        src={professor.imageUrl}
                        alt={professor.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className={`object-cover object-top ${hasUpcoming ? '' : 'grayscale-[35%]'}`}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-label text-[3.5rem] font-bold text-teal">
                        {professor.initials}
                      </span>
                    )}
                    {hasUpcoming && (
                      <span className="absolute top-5 left-5 bg-teal text-white font-label text-[0.7rem] font-bold uppercase tracking-[0.08em] px-3 py-[6px] rounded-full">
                        Próximo curso
                      </span>
                    )}
                  </div>

                  {/* Perfil */}
                  <div className="p-8 md:p-12">
                    <div className="font-label text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-teal mb-2">
                      {professor.tagline ?? professor.specialty}
                    </div>
                    <h2 id={`${professor.id}-name`} className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-navy leading-[1.1] mb-4">
                      {professor.name}
                    </h2>
                    <div className="w-12 h-[3px] bg-teal mb-6" />

                    {professor.bio && (
                      <p className="text-[1.03rem] text-gray-600 leading-[1.8] mb-8 max-w-[640px]">{professor.bio}</p>
                    )}

                    {professor.credentialGroups && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {professor.credentialGroups.map((group) => (
                          <div key={group.label}>
                            <h3 className="font-label text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-3">
                              {group.label}
                            </h3>
                            <ul className="space-y-2">
                              {group.items.map((item) => (
                                <li key={item} className="flex gap-3 items-start text-[0.9rem] text-gray-600 leading-[1.5]">
                                  <span className="w-[5px] h-[5px] rounded-full bg-teal flex-shrink-0 mt-[8px]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cursos impartidos */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-label text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">
                        En Dental Academy Vera
                      </h3>
                      <ul className="space-y-3">
                        {taught.map((course) => {
                          const past = isPastCourse(course)
                          return (
                            <li key={course.id}>
                              <Link
                                href={`/cursos/${course.id}`}
                                className="group flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg -mx-3 px-3 py-2 hover:bg-off-white transition-colors"
                              >
                                <span
                                  className={`font-label text-[0.66rem] font-bold uppercase tracking-[0.08em] px-[9px] py-[3px] rounded-full ${
                                    past ? 'bg-gray-100 text-gray-500' : 'bg-teal text-white'
                                  }`}
                                >
                                  {past ? 'Celebrado' : 'Próximo'}
                                </span>
                                <span className="font-label text-[0.78rem] uppercase tracking-[0.1em] text-gray-400">
                                  {formatShortDate(course)} {course.dateISO?.slice(0, 4)}
                                </span>
                                <span className="font-display text-[1.05rem] font-semibold text-navy group-hover:text-teal transition-colors">
                                  {course.title}
                                </span>
                                <ArrowRight className="w-4 h-4 text-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
