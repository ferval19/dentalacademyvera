const STATS = [
  { number: '8h', label: 'Formación intensiva' },
  { number: '8', label: 'Plazas limitadas' },
  { number: '100%', label: 'Práctica clínica' },
  { number: '5 Jun', label: 'Próxima edición' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-[72px]">
      <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern opacity-[0.025] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center w-full">

        {/* ── Text column ─────────────────────────────────── */}
        <div className="text-white text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-teal/[0.12] border border-teal/[0.25] px-4 py-2 rounded-full font-label text-[0.78rem] font-medium tracking-[0.06em] uppercase mb-7 animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]">
            <span className="w-[6px] h-[6px] bg-teal rounded-full animate-blink flex-shrink-0" />
            Vera, Almería · 5 de junio de 2026
          </div>

          <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] font-bold leading-[1.15] mb-6 animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.2s_both]">
            Actualización en{' '}
            <em className="italic text-teal">Endodoncia Clínica</em>
          </h1>

          <p className="text-[1.12rem] leading-[1.75] opacity-[0.82] max-w-[500px] mb-9 animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.35s_both] mx-auto lg:mx-0">
            Ponte al día desde el diagnóstico hasta la obturación. Un día intensivo con el
            Dr. Rafael Ibáñez — referente en Endodoncia Exclusiva.
          </p>

          <div className="flex gap-4 flex-wrap justify-center lg:justify-start animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.5s_both]">
            <a
              href="#cursos"
              className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] font-body font-semibold text-[0.95rem] bg-teal text-white hover:bg-teal-dark hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(43,181,160,0.35)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Ver programa →
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] font-body font-semibold text-[0.95rem] bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/[0.05] transition-all duration-300"
            >
              Reservar plaza
            </a>
          </div>
        </div>

        {/* ── Stats card ──────────────────────────────────── */}
        <div className="animate-[fadeInUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.4s_both] max-w-[480px] mx-auto lg:mx-0 w-full">
          <div className="bg-white/[0.06] border border-white/10 rounded-lg p-10 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center text-white">
                  <div className="font-display text-[2.8rem] font-bold text-teal leading-none">
                    {stat.number}
                  </div>
                  <div className="font-label text-[0.82rem] opacity-[0.65] mt-[6px] tracking-[0.03em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-label text-[0.8rem] text-teal font-bold flex-shrink-0">
                  RI
                </div>
                <div>
                  <div className="font-display text-[0.95rem] font-semibold">Dr. Rafael Ibáñez</div>
                  <div className="font-label text-[0.72rem] text-teal opacity-90 uppercase tracking-[0.04em]">
                    Endodoncia Exclusiva · KOL Endogal
                  </div>
                </div>
              </div>
              <p className="font-display italic text-[0.95rem] opacity-[0.75] leading-relaxed">
                "Ponte al día en diagnóstico, instrumentación, irrigación y obturación en una sola jornada."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
