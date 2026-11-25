import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import PageHeader from '@/components/PageHeader'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { ChevronLink } from '@/components/ui'
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
          title="Quién enseña en Vera."
          lead="Clínicos en activo que dedican una jornada a compartir cómo trabajan."
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Profesorado' }]}
          stats={[{ label: roster.length === 1 ? 'ponente' : 'ponentes', value: roster.length }]}
        />

        {roster.map(({ professor, taught, hasUpcoming }, i) => {
          const dark = i === 0 && hasUpcoming
          return (
            <section
              key={professor.id}
              id={professor.id}
              aria-labelledby={`${professor.id}-name`}
              className={`scroll-mt-[72px] px-6 py-24 md:py-28 ${dark ? 'bg-black text-white' : i % 2 ? 'bg-white text-ink' : 'bg-surface text-ink'}`}
            >
              <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 md:gap-16 items-start">
                <AnimateOnScroll>
                  <div className={`relative aspect-[4/5] rounded-[28px] overflow-hidden ${dark ? 'bg-[#1d1d1f]' : 'bg-surface ring-1 ring-black/[0.08]'}`}>
                    {professor.imageUrl ? (
                      <Image
                        src={professor.imageUrl}
                        alt={professor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 460px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-semibold text-teal-deep/40">
                        {professor.initials}
                      </span>
                    )}
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={100}>
                  <p className={`text-[17px] font-semibold mb-3 ${dark ? 'text-[#5fd3bf]' : 'text-teal-deep'}`}>
                    {hasUpcoming ? 'Imparte el próximo curso' : professor.specialty}
                  </p>
                  <h2
                    id={`${professor.id}-name`}
                    className="text-balance text-[clamp(2.2rem,4.6vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.05]"
                  >
                    {professor.name}
                  </h2>
                  {professor.tagline && (
                    <p className={`mt-3 text-[19px] ${dark ? 'text-white/60' : 'text-ink-2'}`}>{professor.tagline}</p>
                  )}
                  {professor.bio && (
                    <p className={`mt-8 text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.55] ${dark ? 'text-white/80' : 'text-[#424245]'}`}>
                      {professor.bio}
                    </p>
                  )}

                  {professor.credentialGroups?.map((group) => (
                    <div key={group.label} className="mt-10">
                      <h3 className={`text-[14px] font-semibold mb-1 ${dark ? 'text-white/60' : 'text-ink-2'}`}>{group.label}</h3>
                      <ul className={`border-t ${dark ? 'border-white/15' : 'border-black/[0.1]'}`}>
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className={`py-3 border-b text-[15px] leading-snug ${dark ? 'border-white/15 text-white/75' : 'border-black/[0.1] text-[#424245]'}`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="mt-10">
                    <h3 className={`text-[14px] font-semibold mb-3 ${dark ? 'text-white/60' : 'text-ink-2'}`}>En Dental Academy Vera</h3>
                    <ul className="space-y-3">
                      {taught.map((course) => {
                        const past = isPastCourse(course)
                        return (
                          <li key={course.id}>
                            <Link
                              href={`/cursos/${course.id}`}
                              className={`group flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[18px] px-5 py-4 transition-colors ${
                                dark ? 'bg-[#1d1d1f] hover:bg-[#2a2a2c]' : 'bg-white hover:bg-white/70'
                              }`}
                            >
                              <span className={`text-[13px] font-semibold ${past ? (dark ? 'text-white/50' : 'text-ink-2') : dark ? 'text-[#5fd3bf]' : 'text-teal-deep'}`}>
                                {past ? 'Celebrado' : 'Próximo'} · {formatShortDate(course)} {course.dateISO?.slice(0, 4)}
                              </span>
                              <span className="text-[17px] font-semibold group-hover:underline underline-offset-4">{course.title}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </AnimateOnScroll>
              </div>
            </section>
          )
        })}

        <div className="bg-white px-6 pt-16">
          <div className="max-w-[1080px] mx-auto">
            <ChevronLink href="/cursos">Ver todos los cursos</ChevronLink>
          </div>
        </div>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
