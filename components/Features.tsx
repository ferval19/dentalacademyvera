import { Target, Stethoscope, Users, Award, Banknote, MapPin } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { features } from '@/lib/data/features'
import { Section, Eyebrow, Title } from './ui'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  target: Target,
  stethoscope: Stethoscope,
  users: Users,
  award: Award,
  banknote: Banknote,
  'map-pin': MapPin,
}

export default function Features() {
  return (
    <Section tone="surface" labelledBy="por-que-heading">
      <AnimateOnScroll className="mb-14">
        <Eyebrow>Por qué Dental Academy Vera</Eyebrow>
        <Title id="por-que-heading" className="max-w-[18ch]">Formación pensada para clínicos exigentes.</Title>
      </AnimateOnScroll>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = ICON_MAP[feature.icon] ?? Target
          return (
            <li key={feature.title}>
              <AnimateOnScroll delay={index * 60} className="h-full">
                <article className="h-full rounded-[28px] bg-white p-8 md:p-10">
                  <Icon aria-hidden className="w-7 h-7 text-teal-deep stroke-[1.75] mb-8" />
                  <h3 className="text-[21px] font-semibold tracking-[-0.015em] text-ink mb-2">{feature.title}</h3>
                  <p className="text-[17px] leading-[1.47] text-ink-2">{feature.description}</p>
                </article>
              </AnimateOnScroll>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
