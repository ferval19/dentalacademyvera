import Image from 'next/image'
import AnimateOnScroll from './AnimateOnScroll'
import { professors } from '@/lib/data/professors'
import { getNextCourse } from '@/lib/data/courses'

export default function Professors() {
  const course = getNextCourse()
  const professor = professors.find((p) => p.id === course?.professorId)
  if (!professor) return null

  return (
    <section className="py-[110px] bg-off-white" id="profesores">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section header */}
        <AnimateOnScroll className="mb-14">
          <div className="inline-flex items-center gap-2 font-label text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-teal mb-5">
            <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
            Ponente
          </div>
          <h2 className="font-display text-[clamp(2.1rem,3.5vw,3rem)] font-bold text-navy leading-[1.15]">
            Conoce a tu formador
          </h2>
        </AnimateOnScroll>

        {/* ── Magazine layout ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 rounded-xl overflow-hidden border border-gray-200 shadow-lg">

          {/* Left: Photo */}
          <AnimateOnScroll>
            <div className={`relative ${professor.imageUrl ? 'min-h-[440px] lg:min-h-[600px]' : 'min-h-[280px] lg:min-h-[420px]'} bg-[#f0eeea] overflow-hidden h-full`}>
              {professor.imageUrl ? (
                <>
                  <Image
                    src={professor.imageUrl}
                    alt={professor.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#f0eeea]/50 hidden lg:block pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f0eeea]/60 lg:hidden pointer-events-none" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center pb-16 lg:pb-0">
                  <div className="font-label text-[4rem] text-teal font-bold">{professor.initials}</div>
                </div>
              )}

              {/* Name overlay at bottom of image (mobile) */}
              <div className="absolute bottom-0 left-0 right-0 p-7 lg:hidden">
                <div className={`font-display text-[1.6rem] font-bold leading-tight ${professor.imageUrl ? 'text-white' : 'text-navy'}`}>
                  {professor.name}
                </div>
                <div className="font-label text-[0.85rem] text-teal uppercase tracking-[0.06em] font-semibold mt-1">
                  {professor.specialty}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: Credentials */}
          <AnimateOnScroll delay={100}>
            <div className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center h-full">

              {/* Name (desktop) */}
              <div className="hidden lg:block mb-7">
                <div className="font-label text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-teal mb-2">
                  {professor.tagline ?? professor.specialty}
                </div>
                <h3 className="font-display text-[clamp(1.9rem,2.5vw,2.7rem)] font-bold text-navy leading-[1.1] mb-4">
                  {professor.name}
                </h3>
                <div className="w-12 h-[3px] bg-teal mb-6" />
              </div>

              {/* Bio */}
              {professor.bio && (
                <p className="text-[1.05rem] text-gray-600 leading-[1.8] mb-9">
                  {professor.bio}
                </p>
              )}

              {/* Credential groups */}
              <div className="space-y-8">
                {professor.credentialGroups?.map((group) => (
                  <div key={group.label}>
                    <div className="font-label text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4 flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-gray-300 inline-block" />
                      {group.label}
                    </div>
                    <ul className="space-y-[10px]">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 items-start text-[0.95rem] text-gray-600 leading-[1.55]"
                        >
                          <span className="w-[6px] h-[6px] rounded-full bg-teal flex-shrink-0 mt-[8px]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Fallback: flat credentials */}
                {!professor.credentialGroups && professor.credentials?.map((cred) => (
                  <div key={cred} className="flex gap-3 items-start text-[0.95rem] text-gray-600 leading-[1.55]">
                    <span className="w-[6px] h-[6px] rounded-full bg-teal flex-shrink-0 mt-[8px]" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
