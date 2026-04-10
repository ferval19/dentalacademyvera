import Image from 'next/image'
import { CONTACT } from '@/lib/contact'

const FOOTER_LINKS = {
  cursos: [
    { label: 'Estética Dental', href: '#cursos' },
    { label: 'Endodoncia', href: '#cursos' },
    { label: 'Ortodoncia', href: '#cursos' },
    { label: 'Implantología', href: '#cursos' },
    { label: 'Prótesis', href: '#cursos' },
  ],
  academia: [
    { label: 'Sobre nosotros', href: '#nosotros' },
    { label: 'Profesores', href: '#profesores' },
    { label: 'Blog', href: '#' },
    { label: 'Contacto', href: '#contacto' },
  ],
  legal: [
    { label: 'Aviso legal', href: '#' },
    { label: 'Privacidad', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Condiciones', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 pt-[60px] pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand + contact */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Dental Academy Vera"
                width={140}
                height={46}
                className="h-[46px] w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[0.85rem] leading-[1.6] mb-5">
              Formación dental de excelencia en Vera, Almería. Cursos presenciales y online para
              dentistas, higienistas y profesionales del sector.
            </p>
            {/* Contact info */}
            <div className="space-y-2">
              <a
                href={CONTACT.phoneTel}
                className="flex items-center gap-2 text-[0.85rem] hover:text-teal transition-colors duration-300"
              >
                <span className="text-teal">📞</span>
                {CONTACT.phoneFormatted}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2 text-[0.85rem] hover:text-teal transition-colors duration-300"
              >
                <span className="text-teal">✉️</span>
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[0.85rem] hover:text-teal transition-colors duration-300"
              >
                <span className="text-teal">💬</span>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Cursos */}
          <div>
            <h4 className="font-label text-[0.85rem] font-semibold text-white mb-4 tracking-[0.06em] uppercase">
              Cursos
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.cursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.85rem] hover:text-teal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academia */}
          <div>
            <h4 className="font-label text-[0.85rem] font-semibold text-white mb-4 tracking-[0.06em] uppercase">
              Academia
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.academia.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.85rem] hover:text-teal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-label text-[0.85rem] font-semibold text-white mb-4 tracking-[0.06em] uppercase">
              Legal
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.85rem] hover:text-teal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-6 text-center text-[0.8rem]">
          © 2026 Dental Academy Vera. Todos los derechos reservados. | dentalacademyvera.com
        </div>
      </div>
    </footer>
  )
}
