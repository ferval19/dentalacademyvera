import Link from 'next/link'
import { CONTACT } from '@/lib/contact'

const FOOTER_LINKS = [
  { label: 'Cursos', href: '/cursos' },
  { label: 'Profesorado', href: '/profesores' },
  { label: 'Sobre nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
]

/** Pie al estilo apple.com (texto pequeño, filetes finos) sobre el oscuro de marca. */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-deep text-white/65 text-[12px] leading-[1.6] px-6 pt-10 pb-8">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b border-white/[0.12]">
          <div>
            <h2 className="text-white font-semibold mb-2">Dental Academy <span className="text-mint">Vera</span></h2>
            <p>Cursos presenciales para dentistas en Vera, Almería.</p>
          </div>
          <div>
            <h2 className="text-white font-semibold mb-2">Explorar</h2>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white hover:underline underline-offset-2">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-white font-semibold mb-2">Contacto</h2>
            <ul className="space-y-2">
              <li>
                <a href={CONTACT.phoneTel} className="hover:text-white hover:underline underline-offset-2">
                  {CONTACT.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline underline-offset-2"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="hover:text-white hover:underline underline-offset-2">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>Copyright © {year} Dental Academy Vera. Todos los derechos reservados.</span>
          <span>Vera, Almería · España</span>
        </div>
      </div>
    </footer>
  )
}
