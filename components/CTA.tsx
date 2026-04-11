import { MessageCircle, Phone, Mail } from 'lucide-react'
import { CONTACT } from '@/lib/contact'

export default function CTA() {
  return (
    <section
      className="bg-cta-gradient py-24 text-center text-white relative overflow-hidden"
      id="contacto"
    >
      <div className="absolute inset-0 cta-radial-overlay pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 font-label text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-teal mb-6">
          <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
          Contacto
          <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
        </div>
        <h2 className="font-display text-[clamp(1.9rem,3vw,2.7rem)] font-bold mb-5 leading-[1.2]">
          ¿Listo para dar el siguiente paso
          <br />
          en tu carrera profesional?
        </h2>
        <p className="text-[1.1rem] opacity-70 max-w-[540px] mx-auto mb-12 leading-[1.75]">
          Escríbenos o llámanos y te asesoramos sobre el curso que mejor se adapta a tu perfil y
          objetivos.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={CONTACT.whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[10px] px-8 py-[15px] rounded-[10px] font-body font-semibold text-[1rem] bg-[#25D366] text-white hover:bg-[#20BD5A] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 stroke-[2]" />
            WhatsApp
          </a>
          <a
            href={CONTACT.phoneTel}
            className="inline-flex items-center gap-[10px] px-8 py-[15px] rounded-[10px] font-body font-semibold text-[1rem] bg-white/10 text-white border border-white/25 hover:bg-white/20 hover:border-white/50 hover:-translate-y-[2px] transition-all duration-300"
          >
            <Phone className="w-5 h-5 stroke-[2]" />
            {CONTACT.phoneFormatted}
          </a>
          <a
            href={CONTACT.emailHref}
            className="inline-flex items-center gap-[10px] px-8 py-[15px] rounded-[10px] font-body font-semibold text-[1rem] bg-teal text-white hover:bg-teal-dark hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(43,181,160,0.4)] transition-all duration-300"
          >
            <Mail className="w-5 h-5 stroke-[2]" />
            Email
          </a>
        </div>
      </div>
    </section>
  )
}
