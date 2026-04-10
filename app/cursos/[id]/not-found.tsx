import Link from 'next/link'
import Nav from '@/components/Nav'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="pt-[72px] min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="font-display text-[5rem] font-bold text-gray-200 leading-none mb-4">
            404
          </div>
          <h1 className="font-display text-[1.6rem] font-bold text-navy mb-3">
            Curso no encontrado
          </h1>
          <p className="text-gray-500 mb-8 max-w-[400px] mx-auto">
            El curso que buscas no existe o ya no está disponible.
          </p>
          <Link
            href="/#cursos"
            className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[10px] bg-teal text-white font-body font-semibold hover:bg-teal-dark transition-colors"
          >
            ← Ver todos los cursos
          </Link>
        </div>
      </main>
    </>
  )
}
