'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// `page` → página propia; `anchor` → sección de la portada
const NAV_LINKS: { label: string; page?: string; anchor?: string }[] = [
  { label: 'Cursos', page: '/cursos' },
  { label: 'Profesorado', page: '/profesores' },
  { label: 'Sobre nosotros', anchor: 'nosotros' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // En la portada, anclas directas; en otras páginas, volver a la portada primero
  const href = (anchor: string) => (pathname === '/' ? `#${anchor}` : `/#${anchor}`)
  const linkHref = (link: (typeof NAV_LINKS)[number]) => link.page ?? href(link.anchor!)
  // /cursos/[id] cuenta como sección "Cursos"
  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    !!link.page && (pathname === link.page || pathname.startsWith(`${link.page}/`))

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.08]">
      <div className="flex items-center justify-between max-w-[1080px] mx-auto px-6 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px]" onClick={closeMenu}>
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={34}
            height={34}
            className="h-[34px] w-auto object-contain flex-shrink-0"
            priority
          />
          <span className="text-[17px] font-semibold tracking-[-0.01em] text-ink leading-[1.1]">
            Dental Academy <span className="text-teal-deep">Vera</span>
          </span>
        </Link>

        {/* Enlaces (escritorio) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={linkHref(link)}
              aria-current={isActive(link) ? 'page' : undefined}
              className={`text-[14px] transition-colors ${
                isActive(link) ? 'text-ink font-medium' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Enlace de texto, no botón: la acción primaria vive en cada página
              (p. ej. "Reservar" en la barra del curso), como en apple.com */}
          <Link href={href('contacto')} className="text-[14px] text-ink/70 hover:text-ink transition-colors">
            Contacto
          </Link>
        </div>

        {/* Menú móvil */}
        <button
          className="md:hidden -mr-2 p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
        >
          <span
            className={`block w-[18px] h-[1.5px] bg-ink my-[5px] transition-transform duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[3.25px]' : ''
            }`}
          />
          <span
            className={`block w-[18px] h-[1.5px] bg-ink my-[5px] transition-transform duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[3.25px]' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div id="menu-movil" className="md:hidden bg-white border-t border-black/[0.06] px-6 pt-4 pb-8">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="border-b border-black/[0.08]">
                <Link
                  href={linkHref(link)}
                  aria-current={isActive(link) ? 'page' : undefined}
                  className="block py-4 text-[24px] font-semibold tracking-[-0.02em] text-ink"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={href('contacto')}
            className="mt-6 flex justify-center rounded-full bg-teal-deep text-white text-[17px] font-medium py-3"
            onClick={closeMenu}
          >
            Contactar
          </Link>
        </div>
      )}
    </nav>
  )
}
