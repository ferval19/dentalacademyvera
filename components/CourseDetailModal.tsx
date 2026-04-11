'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Course } from '@/types'
import { professors } from '@/lib/data/professors'
import { CONTACT, whatsappCourse } from '@/lib/contact'

interface Props {
  course: Course
  onClose: () => void
}

export default function CourseDetailModal({ course, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const professor = course.professorId
    ? professors.find((p) => p.id === course.professorId)
    : undefined

  // Lock scroll + close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-navy-deep/80 backdrop-blur-sm flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={course.title}
    >
      <div className="bg-white rounded-lg w-full max-w-5xl shadow-xl my-auto">

        {/* ── Hero header ───────────────────────────────────── */}
        <div className="bg-hero-gradient text-white rounded-t-lg overflow-hidden relative">
          {/* Background: real photo when available, otherwise gradient overlay */}
          {course.imageUrl && (
            <div className="absolute inset-0">
              <Image
                src={course.imageUrl}
                alt=""
                fill
                className="object-cover object-center opacity-20"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          )}
          <div className="absolute inset-0 hero-radial-overlay opacity-60 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors text-lg font-light"
            aria-label="Cerrar"
          >
            ✕
          </button>

          <div className="relative z-10 p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-label text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-teal">
                {course.categoryLabel}
              </span>
              {course.includesPractice && (
                <span className="bg-teal text-white font-label text-[0.68rem] font-bold tracking-[0.06em] uppercase px-3 py-1 rounded-full">
                  ✓ Incluye práctica
                </span>
              )}
            </div>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] mb-2">
              {course.title}
            </h2>
            {course.subtitle && (
              <p className="text-[1rem] opacity-80 font-body">{course.subtitle}</p>
            )}
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">

          {/* Left sidebar: logistics + professor + CTAs */}
          <aside className="bg-off-white p-6 md:p-8 flex flex-col gap-6 border-r border-gray-200 rounded-bl-lg">

            {/* Logistics */}
            <div>
              <h4 className="font-label text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-3">
                Detalles del curso
              </h4>
              <div className="space-y-[10px] text-[0.88rem] text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="text-[1rem]">📅</span>
                  <span>{course.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[1rem]">⏱</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[1rem]">📍</span>
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[1rem]">👥</span>
                  <span>Máximo {course.spots} plazas</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <div className="font-label text-[0.68rem] font-normal text-gray-400 tracking-[0.04em] uppercase mb-1">
                Inversión
              </div>
              <div className="font-display text-[2rem] font-bold text-navy leading-none">
                {course.price} €
              </div>
            </div>

            {/* Professor */}
            {professor && (
              <div>
                <h4 className="font-label text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-3">
                  Ponente
                </h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-deep to-navy-light flex items-center justify-center font-label text-[0.95rem] text-teal font-bold flex-shrink-0 shadow-sm">
                    {professor.initials}
                  </div>
                  <div>
                    <div className="font-display text-[0.95rem] font-semibold text-navy leading-tight">
                      {professor.name}
                    </div>
                    <div className="font-label text-[0.7rem] text-teal font-semibold uppercase tracking-[0.04em] mt-[2px]">
                      {professor.specialty}
                    </div>
                  </div>
                </div>
                {professor.credentials && (
                  <ul className="space-y-[6px]">
                    {professor.credentials.map((cred) => (
                      <li key={cred} className="flex gap-2 items-start text-[0.78rem] text-gray-500 leading-[1.4]">
                        <span className="text-teal flex-shrink-0 mt-[1px]">•</span>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="mt-auto space-y-2 pt-2">
              <a
                href={whatsappCourse(course.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-[13px] rounded-[8px] bg-[#25D366] text-white font-body font-semibold text-[0.9rem] hover:bg-[#20BD5A] hover:-translate-y-px transition-all duration-300"
              >
                💬 WhatsApp
              </a>
              <a
                href={CONTACT.phoneTel}
                className="flex items-center justify-center gap-2 w-full py-[13px] rounded-[8px] bg-teal text-white font-body font-semibold text-[0.9rem] hover:bg-teal-dark hover:-translate-y-px transition-all duration-300"
              >
                📞 {CONTACT.phoneFormatted}
              </a>
            </div>
          </aside>

          {/* Right: Program */}
          {course.program ? (
            <section className="p-6 md:p-10">
              <h3 className="font-display text-[1.5rem] font-bold text-navy mb-8 flex items-center gap-3">
                <span className="w-8 h-[3px] bg-teal inline-block flex-shrink-0" />
                Programa
              </h3>

              <div className="space-y-0">
                {course.program.map((module, idx) => (
                  <div key={module.number}>
                    <div className="flex items-start gap-5 py-6">
                      <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center font-label font-bold text-[0.85rem] text-teal flex-shrink-0 mt-[2px]">
                        {module.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-[1.08rem] font-semibold text-navy mb-3">
                          {module.title}
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-[6px]">
                          {module.topics.map((topic) => (
                            <li
                              key={topic}
                              className="flex gap-2 items-start text-[0.88rem] text-gray-500 leading-[1.45]"
                            >
                              <span className="text-teal flex-shrink-0 font-bold mt-[1px]">—</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {idx < course.program!.length - 1 && (
                      <div className="border-t border-gray-100 ml-14" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="p-10 flex items-center justify-center text-gray-400 text-[0.9rem]">
              Programa disponible próximamente
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
