import type { Feature } from '@/types'

// Solo razones que se pueden comprobar en los propios cursos (plazas, ponentes,
// formato, lugar). Nada de promesas que todavía no existen.
export const features: Feature[] = [
  {
    icon: 'users',
    title: 'Grupos reducidos',
    description:
      'Entre 10 y 20 plazas por curso, para que puedas preguntar, comentar tus casos y hablar con el ponente.',
  },
  {
    icon: 'stethoscope',
    title: 'Ponentes en activo',
    description:
      'Clínicos que trabajan cada día en su especialidad y enseñan cómo lo hacen en su consulta.',
  },
  {
    icon: 'target',
    title: 'Aplicable desde el lunes',
    description:
      'Jornadas intensivas centradas en protocolos, casos reales y decisiones clínicas que puedes llevar a tu práctica.',
  },
  {
    icon: 'map-pin',
    title: 'En Vera, Almería',
    description:
      'Un espacio de trabajo en la costa mediterránea, bien comunicado y fácil de combinar con un fin de semana.',
  },
]
