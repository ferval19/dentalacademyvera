import { MapPin } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

export default function About() {
  return (
    <section className="py-[110px] bg-white" id="nosotros">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[70px] items-center">
          {/* Visual / quote panel */}
          <AnimateOnScroll>
            <div className="relative bg-about-visual rounded-xl p-[60px_44px] min-h-[440px] flex flex-col justify-end text-white overflow-hidden shadow-xl">
              <div className="absolute inset-0 about-radial-overlay pointer-events-none" />
              {/* Decorative element */}
              <div className="absolute top-10 right-10 w-24 h-24 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute top-6 right-6 w-36 h-36 rounded-full border border-white/[0.06] pointer-events-none" />
              <blockquote className="relative z-10 font-display text-[1.45rem] italic leading-[1.55] mb-5">
                "Creemos que la formación continua no es un lujo, es la responsabilidad de cada
                profesional con sus pacientes."
              </blockquote>
              <cite className="relative z-10 not-italic font-label text-[0.85rem] opacity-[0.6] tracking-[0.04em] flex items-center gap-2">
                <span className="w-5 h-[1px] bg-white/40 inline-block" />
                Equipo Dental Academy Vera
              </cite>
            </div>
          </AnimateOnScroll>

          {/* Text column */}
          <AnimateOnScroll delay={100}>
            <div>
              <div className="inline-flex items-center gap-2 font-label text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-teal mb-4">
                <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
                Sobre nosotros
              </div>
              <h2 className="font-display text-[clamp(2rem,3vw,2.6rem)] font-bold text-navy mb-6 leading-[1.2]">
                Formación dental en el corazón del Mediterráneo
              </h2>
              <p className="text-[1rem] text-gray-600 mb-5 leading-[1.78]">
                Dental Academy Vera nace con la misión de acercar formación dental de primer nivel
                a profesionales que buscan actualizar sus conocimientos y mejorar su práctica
                clínica diaria.
              </p>
              <p className="text-[1rem] text-gray-600 mb-5 leading-[1.78]">
                Desde Vera (Almería), ofrecemos cursos presenciales intensivos en instalaciones
                equipadas con la última tecnología, combinados con formación online para llegar a
                profesionales de toda España y Latinoamérica.
              </p>
              <p className="text-[1rem] text-gray-600 mb-7 leading-[1.78]">
                Nuestro compromiso: cada curso debe generar un impacto directo y medible en la
                calidad de tu trabajo con pacientes.
              </p>
              <div className="inline-flex items-center gap-3 bg-teal-light px-5 py-[12px] rounded-[10px] font-label text-[0.85rem] font-medium text-navy tracking-[0.02em]">
                <MapPin className="w-4 h-4 text-teal flex-shrink-0 stroke-[2]" />
                Vera, Almería — Costa mediterránea, excelentes conexiones
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
