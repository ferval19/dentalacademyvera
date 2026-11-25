import { MessageCircle, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/contact'
import { Section, Title, Lead, PillLink } from './ui'

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
    </Section>
  )
}
