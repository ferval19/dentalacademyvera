import { MessageCircle, Phone, Bell } from 'lucide-react'
import { CONTACT, NOTIFY } from '@/lib/contact'
import { Section, Title, Lead, PillLink, ChevronLink } from './ui'

export default function CTA() {
  return (
    <Section id="contacto" tone="white" labelledBy="contacto-heading" className="text-center">
      <div className="max-w-[720px] mx-auto">
        <Title id="contacto-heading">¿Hablamos?</Title>
        <Lead className="mt-5">
          Escríbenos o llámanos y te asesoramos sobre el curso que mejor encaja con tu perfil y tus objetivos.
        </Lead>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <PillLink href={CONTACT.whatsappGeneral} external>
            <MessageCircle aria-hidden className="w-[18px] h-[18px]" />
            Escribir por WhatsApp
          </PillLink>
          <PillLink href={CONTACT.phoneTel} variant="secondary">
            <Phone aria-hidden className="w-[18px] h-[18px]" />
            {CONTACT.phoneFormatted}
          </PillLink>
        </div>
      </div>

      {/* Aviso de próximos cursos: para quien llega entre ediciones */}
      <div className="mt-20 max-w-[880px] mx-auto rounded-[28px] bg-surface p-8 md:p-12 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center text-left">
        <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <Bell aria-hidden className="w-6 h-6 text-teal-deep stroke-[1.75]" />
        </span>
        <div>
          <h3 className="text-[21px] font-semibold tracking-[-0.015em] text-ink">¿Esta fecha no te viene bien?</h3>
          <p className="mt-1 text-[17px] text-ink-2">Te avisamos cuando abramos nuevas ediciones y cursos.</p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col items-start gap-3">
          <ChevronLink href={NOTIFY.whatsapp} className="text-[15px]">Avisadme por WhatsApp</ChevronLink>
          <a href={NOTIFY.email} className="group inline-flex items-center gap-1 text-[15px] text-teal-deep hover:underline underline-offset-4">
            Avisadme por email <span aria-hidden>›</span>
          </a>
        </div>
      </div>
    </Section>
  )
}
