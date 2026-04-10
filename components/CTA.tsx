import { CONTACT } from '@/lib/contact'

export default function CTA() {
  return (
    <section
      className="bg-cta-gradient py-20 text-center text-white relative overflow-hidden"
      id="contacto"
    >
      <div className="absolute inset-0 cta-radial-overlay pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold mb-4 leading-[1.2]">
          ¿Listo para dar el siguiente paso
          <br />
          en tu carrera profesional?
        </h2>
        <p className="text-[1.05rem] opacity-75 max-w-[520px] mx-auto mb-10 leading-[1.7]">
          Escríbenos o llámanos y te asesoramos sobre el curso que mejor se adapta a tu perfil y
          objetivos.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={CONTACT.whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] font-body font-semibold text-[0.95rem] bg-[#25D366] text-white hover:bg-[#20BD5A] hover:-translate-y-[2px] transition-all duration-300"
          >
            💬 WhatsApp
          </a>
          <a
            href={CONTACT.phoneTel}
            className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] font-body font-semibold text-[0.95rem] bg-white/10 text-white border border-white/25 hover:bg-white/20 hover:border-white/50 hover:-translate-y-[2px] transition-all duration-300"
          >
            📞 {CONTACT.phoneFormatted}
          </a>
          <a
            href={CONTACT.emailHref}
            className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] font-body font-semibold text-[0.95rem] bg-teal text-white hover:bg-teal-dark hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(43,181,160,0.35)] transition-all duration-300"
          >
            ✉️ Email
          </a>
        </div>
      </div>
    </section>
  )
}
