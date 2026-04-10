import AnimateOnScroll from './AnimateOnScroll'
import { features } from '@/lib/data/features'

export default function Features() {
  return (
    <section className="py-[100px] bg-off-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <AnimateOnScroll className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 font-label text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-teal mb-4">
            <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
            ¿Por qué elegirnos?
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-navy leading-[1.2] mb-4">
            Formación diseñada para
            <br />
            profesionales exigentes
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[560px] mx-auto leading-[1.7]">
            Combinamos la experiencia clínica real con metodologías de aprendizaje modernas
            para que cada curso transforme tu práctica diaria.
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((feature, index) => (
            <AnimateOnScroll key={feature.title} delay={index * 80}>
              <div className="feature-card-bar bg-white rounded border border-gray-200 p-9 hover:-translate-y-1 hover:shadow-lg hover:border-transparent transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] h-full">
                <div className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center text-[1.5rem] mb-5 bg-teal-light">
                  {feature.icon}
                </div>
                <h3 className="font-display text-[1.2rem] font-semibold text-navy mb-[10px]">
                  {feature.title}
                </h3>
                <p className="text-[0.9rem] text-gray-500 leading-[1.65]">
                  {feature.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
