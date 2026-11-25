'use client'

import { useEffect, useState } from 'react'

/**
 * Barra fija inferior en móvil con la acción principal. Aparece cuando el hero
 * (#inicio) sale de pantalla y se oculta al llegar al bloque de contacto, para
 * no duplicar botones.
 */
export default function MobileReserveBar({
  title,
  detail,
  href,
}: {
  title: string
  detail: string
  href: string
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const contact = document.getElementById('contacto')
    if (!hero) return
    let heroVisible = true
    let contactVisible = false
    const update = () => setVisible(!heroVisible && !contactVisible)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting
        // Oculta también por debajo del contacto (pie), no solo mientras se ve
        if (e.target === contact) contactVisible = e.isIntersecting || e.boundingClientRect.top < 0
      }
      update()
    })
    io.observe(hero)
    if (contact) io.observe(contact)
    return () => io.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-[90] bg-white/85 backdrop-blur-xl backdrop-saturate-150 border-t border-black/[0.08] px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-ink truncate">{title}</p>
          <p className="text-[13px] text-ink-2 truncate">{detail}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex-shrink-0 rounded-full bg-teal-deep text-white text-[15px] font-medium px-5 py-[9px]"
        >
          Reservar
        </a>
      </div>
    </div>
  )
}
