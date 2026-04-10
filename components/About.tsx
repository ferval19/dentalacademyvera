import AnimateOnScroll from './AnimateOnScroll'

export default function About() {
  return (
    <section className="py-[100px] bg-white" id="nosotros">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          {/* Visual / quote panel */}
          <AnimateOnScroll>
            <div className="relative bg-about-visual rounded-lg p-[60px_40px] min-h-[420px] flex flex-col justify-end text-white overflow-hidden">
              <div className="absolute inset-0 about-radial-overlay pointer-events-none" />
              <blockquote className="relative z-10 font-display text-[1.4rem] italic leading-[1.5] mb-4">
                "Creemos que la formación continua no es un lujo, es la responsabilidad de cada
                profesional con sus pacientes."
              </blockquote>
              <cite className="relative z-10 not-italic font-label text-[0.85rem] opacity-[0.65] tracking-[0.03em]">
                — Equipo Dental Academy Vera
              </cite>
            </div>
          </AnimateOnScroll>

          {/* Text column */}
          <AnimateOnScroll delay={100}>
            <div>
              <div className="inline-flex items-center gap-2 font-label text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-teal mb-3">
                <span className="w-6 h-[2px] bg-teal flex-shrink-0" />
                Sobre nosotros
              </div>
              <h2 className="font-display text-[2rem] font-bold text-navy mb-5 leading-[1.25]">
                Formación dental en el corazón del Mediterráneo
              </h2>
              <p className="text-gray-600 mb-4 leading-[1.7]">
                Dental Academy Vera nace con la misión de acercar formación dental de primer nivel
                a profesionales que buscan actualizar sus conocimientos y mejorar su práctica
                clínica diaria.
              </p>
              <p className="text-gray-600 mb-4 leading-[1.7]">
                Desde Vera (Almería), ofrecemos cursos presenciales intensivos en instalaciones
                equipadas con la última tecnología, combinados con formación online para llegar a
                profesionales de toda España y Latinoamérica.
              </p>
              <p className="text-gray-600 mb-5 leading-[1.7]">
                Nuestro compromiso: cada curso debe generar un impacto directo y medible en la
                calidad de tu trabajo con pacientes.
              </p>
              <div className="inline-flex items-center gap-2 bg-teal-light px-[18px] py-[10px] rounded-[8px] font-label text-[0.82rem] font-medium text-navy tracking-[0.02em]">
                📍 Vera, Almería — Costa mediterránea, excelentes conexiones
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
