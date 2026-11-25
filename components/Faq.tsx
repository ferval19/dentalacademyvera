import { Plus } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { getFaq } from '@/lib/data/faq'
import { Section, Eyebrow, Title } from './ui'

/** Preguntas frecuentes con <details> nativo: accesible y sin JavaScript. */
export default function Faq() {
  const faq = getFaq()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <Section id="preguntas" tone="surface" labelledBy="preguntas-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-10 md:gap-16">
        <AnimateOnScroll>
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <Title id="preguntas-heading">Lo que nos suelen preguntar.</Title>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <ul className="border-t border-black/[0.12]">
            {faq.map((f) => (
              <li key={f.question} className="border-b border-black/[0.12]">
                <details className="group">
                  <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-[19px] md:text-[21px] font-semibold tracking-[-0.015em] text-ink">{f.question}</span>
                    <Plus
                      aria-hidden
                      className="w-5 h-5 flex-shrink-0 text-ink-2 transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-7 -mt-1 pr-10 text-[17px] leading-[1.55] text-[#424245]">{f.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </Section>
  )
}
