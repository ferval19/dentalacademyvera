'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ANCHORS = [
  { anchor: 'cursos', label: 'Cursos' },
  { anchor: 'profesores', label: 'Profesores' },
  { anchor: 'nosotros', label: 'Sobre nosotros' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // On the homepage use bare hash links (smooth scroll, no navigation).
  // On any other page prefix with / so Next.js navigates home first.
  const href = (anchor: string) =>
    pathname === '/' ? `#${anchor}` : `/#${anchor}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] bg-white/[0.94] backdrop-blur-xl border-b border-navy/[0.06] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between max-w-[1200px] mx-auto px-6 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px]">
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={38}
            height={38}
            className="h-[38px] w-auto object-contain flex-shrink-0"
            priority
          />
          <div className="font-label font-semibold text-[1.1rem] tracking-[0.08em] uppercase text-navy leading-[1.15]">
            Dental Academy{' '}
            <span className="text-teal block font-medium">Vera</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ANCHORS.map((link) => (
            <Link
              key={link.anchor}
              href={href(link.anchor)}
              className="nav-link font-body text-[0.9rem] font-medium text-gray-500 hover:text-navy transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={href('contacto')}
            className="bg-teal text-white px-6 py-[10px] rounded-[8px] font-semibold text-[0.85rem] tracking-[0.02em] hover:bg-teal-dark hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(43,181,160,0.3)] transition-all duration-300"
          >
            Contactar
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-navy my-[5px] transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-navy my-[5px] transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-navy my-[5px] transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white px-6 py-6 shadow-lg gap-4">
          {NAV_ANCHORS.map((link) => (
            <Link
              key={link.anchor}
              href={href(link.anchor)}
              className="font-body text-[0.9rem] font-medium text-gray-500 hover:text-navy transition-colors"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={href('contacto')}
            className="bg-teal text-white px-6 py-[10px] rounded-[8px] font-semibold text-[0.85rem] text-center"
            onClick={closeMenu}
          >
            Contactar
          </Link>
        </div>
      )}
    </nav>
  )
}
