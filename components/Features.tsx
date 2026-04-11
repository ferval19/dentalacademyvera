import { Target, Stethoscope, Users, Award, Banknote, MapPin } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { features } from '@/lib/data/features'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  stethoscope: Stethoscope,
  users: Users,
  award: Award,
  banknote: Banknote,
  'map-pin': MapPin,
}

export default function Features() {
  return (
    <section className="py-[110px] bg-off-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <AnimateOnScroll className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 font-label text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-teal mb-5">
            <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
            ¿Por qué elegirnos?
            <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
          </div>
          <h2 className="font-display text-[clamp(2.1rem,3.5vw,3rem)] font-bold text-navy leading-[1.15] mb-5">
            Formación diseñada para
            <br />
            profesionales exigentes
          </h2>
          <p className="text-[1.1rem] text-gray-500 max-w-[580px] mx-auto leading-[1.75]">
            Combinamos la experiencia clínica real con metodologías de aprendizaje modernas
            para que cada curso transforme tu práctica diaria.
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon] ?? Target
            return (
              <AnimateOnScroll key={feature.title} delay={index * 80}>
                <article className="feature-card-bar group bg-white rounded-xl border border-gray-100 p-9 hover:-translate-y-[3px] hover:shadow-xl hover:border-transparent transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] h-full">
                  <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center mb-6 bg-teal-light group-hover:bg-teal/15 transition-colors duration-300">
                    <Icon className="w-[26px] h-[26px] text-teal stroke-[1.75]" />
                  </div>
                  <h3 className="font-display text-[1.2rem] font-semibold text-navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[0.96rem] text-gray-500 leading-[1.7]">
                    {feature.description}
                  </p>
                </article>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
