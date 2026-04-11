import Image from 'next/image'
import { Phone, Mail, MessageCircle } from 'lucide-react'
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
    <footer className="bg-gray-900 text-gray-400 pt-[64px] pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-[10px] mb-5">
              <Image
                src="/images/logo-icon.png"
                alt=""
                width={34}
                height={34}
                className="h-[34px] w-auto object-contain flex-shrink-0 brightness-0 invert"
              />
              <div className="font-label text-[1.05rem] font-semibold text-white tracking-[0.08em] uppercase">
                Dental Academy <span className="text-teal">Vera</span>
              </div>
            </div>
            <p className="text-[0.9rem] leading-[1.7] mb-6">
              Formación dental de excelencia en Vera, Almería. Cursos presenciales y online para
              dentistas, higienistas y profesionales del sector.
            </p>
            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={CONTACT.phoneTel}
                className="flex items-center gap-3 text-[0.9rem] hover:text-teal transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-teal flex-shrink-0 stroke-[1.75]" />
                {CONTACT.phoneFormatted}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-3 text-[0.9rem] hover:text-teal transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-teal flex-shrink-0 stroke-[1.75]" />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[0.9rem] hover:text-teal transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4 text-teal flex-shrink-0 stroke-[1.75]" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Cursos */}
          <div>
            <h4 className="font-label text-[0.85rem] font-semibold text-white mb-5 tracking-[0.08em] uppercase">
              Cursos
            </h4>
            <ul className="space-y-[10px]">
              {FOOTER_LINKS.cursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.9rem] hover:text-teal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academia */}
          <div>
            <h4 className="font-label text-[0.85rem] font-semibold text-white mb-5 tracking-[0.08em] uppercase">
              Academia
            </h4>
            <ul className="space-y-[10px]">
              {FOOTER_LINKS.academia.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.9rem] hover:text-teal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-label text-[0.85rem] font-semibold text-white mb-5 tracking-[0.08em] uppercase">
              Legal
            </h4>
            <ul className="space-y-[10px]">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.9rem] hover:text-teal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.82rem]">
          <span>© 2026 Dental Academy Vera. Todos los derechos reservados.</span>
          <span className="text-gray-600">dentalacademyvera.com</span>
        </div>
      </div>
    </footer>
  )
}
