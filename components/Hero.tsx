import { Clock, Users, FlaskConical, CalendarDays } from 'lucide-react'

const STATS = [
  { number: '8h', label: 'Formación intensiva', icon: Clock },
  { number: '8', label: 'Plazas limitadas', icon: Users },
  { number: '100%', label: 'Práctica clínica', icon: FlaskConical },
  { number: '5 Jun', label: 'Próxima edición', icon: CalendarDays },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-[72px]">
      <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern opacity-[0.025] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center w-full">

        {/* ── Text column ─────────────────────────────────── */}
        <div className="text-white text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-teal/[0.12] border border-teal/[0.25] px-4 py-[9px] rounded-full font-label text-[0.82rem] font-medium tracking-[0.06em] uppercase mb-8 animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]">
            <span className="w-[6px] h-[6px] bg-teal rounded-full animate-blink flex-shrink-0" />
            Vera, Almería · 5 de junio de 2026
          </div>

          <h1 className="font-display text-[clamp(2.6rem,5vw,4rem)] font-bold leading-[1.12] mb-6 animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.2s_both]">
            Actualización en{' '}
            <em className="italic text-teal not-italic">
              <span className="italic">Endodoncia</span>
            </em>
            <br />
            <em className="italic text-teal">Clínica</em>
          </h1>

          <p className="text-[1.15rem] leading-[1.78] opacity-[0.82] max-w-[500px] mb-10 animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.35s_both] mx-auto lg:mx-0">
            Ponte al día desde el diagnóstico hasta la obturación. Un día intensivo con el
            Dr. Rafael Ibáñez — referente en Endodoncia Exclusiva.
          </p>

          <div className="flex gap-4 flex-wrap justify-center lg:justify-start animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.5s_both]">
            <a
              href="#cursos"
              className="inline-flex items-center gap-2 px-8 py-[15px] rounded-[10px] font-body font-semibold text-[1rem] bg-teal text-white hover:bg-teal-dark hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(43,181,160,0.4)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Ver programa →
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-8 py-[15px] rounded-[10px] font-body font-semibold text-[1rem] bg-transparent text-white border border-white/30 hover:border-white/55 hover:bg-white/[0.07] transition-all duration-300"
            >
              Reservar plaza
            </a>
          </div>
        </div>

        {/* ── Stats card ──────────────────────────────────── */}
        <div className="animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.4s_both] max-w-[480px] mx-auto lg:mx-0 w-full">
          <div className="bg-white/[0.06] border border-white/10 rounded-xl p-10 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-teal/70 stroke-[1.5]" />
                      <div className="font-label text-[0.8rem] opacity-[0.6] tracking-[0.03em]">
                        {stat.label}
                      </div>
                    </div>
                    <div className="font-display text-[2.6rem] font-bold text-teal leading-none pl-6">
                      {stat.number}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-label text-[0.8rem] text-teal font-bold flex-shrink-0">
                  RI
                </div>
                <div>
                  <div className="font-display text-[0.98rem] font-semibold">Dr. Rafael Ibáñez</div>
                  <div className="font-label text-[0.74rem] text-teal opacity-90 uppercase tracking-[0.04em]">
                    Endodoncia Exclusiva · KOL Endogal
                  </div>
                </div>
              </div>
              <p className="font-display italic text-[0.97rem] opacity-[0.72] leading-relaxed pl-[52px]">
                "Ponte al día en diagnóstico, instrumentación, irrigación y obturación en una sola jornada."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
