import AnimateOnScroll from './AnimateOnScroll'
import { Section, Eyebrow } from './ui'

export default function About() {
  return (
    <Section id="nosotros" tone="surface" labelledBy="nosotros-heading">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 md:gap-20">
        <AnimateOnScroll>
          <Eyebrow>Sobre nosotros</Eyebrow>
          <h2
            id="nosotros-heading"
            className="text-balance text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-ink"
          >
            La formación continua no es un lujo. Es una responsabilidad con cada paciente.
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <div className="space-y-6 text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.65] text-[#424245] max-w-[60ch] md:pt-10">
            <p>
              Dental Academy Vera nace con la misión de acercar formación dental de primer nivel a profesionales que
              buscan actualizar sus conocimientos y mejorar su práctica clínica diaria.
            </p>
            <p>
              Desde Vera (Almería), ofrecemos cursos presenciales intensivos en instalaciones equipadas con la última
              tecnología, combinados con formación online para llegar a profesionales de toda España y Latinoamérica.
            </p>
            <p>
              Nuestro compromiso: que cada curso tenga un impacto directo y medible en la calidad de tu trabajo con
              pacientes.
            </p>
            <p className="text-[15px] text-ink-2">Vera, Almería · Costa mediterránea, bien comunicada.</p>
          </div>
        </AnimateOnScroll>
      </div>
    </Section>
  )
}
