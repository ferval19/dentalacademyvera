import { CONTACT } from '@/lib/contact'
import { getNextCourse, formatLongDate } from '@/lib/data/courses'

export interface FaqItem {
  question: string
  answer: string
}

/*
 * Preguntas frecuentes de la portada. Las respuestas salen de los datos del
 * próximo curso para que nunca se queden desactualizadas.
 *
 * PENDIENTE (necesitan respuesta de la academia antes de publicarse):
 *  - ¿Recibo certificado de asistencia?
 *  - ¿Emitís factura a nombre de la clínica?
 *  - ¿Qué pasa si no puedo asistir? (política de cancelación / devolución)
 *  - ¿Hay aparcamiento cerca?
 *  - ¿Está incluida la comida en el curso de alineadores?
 */
export function getFaq(): FaqItem[] {
  const course = getNextCourse()
  const items: FaqItem[] = [
    {
      question: '¿A quién van dirigidos los cursos?',
      answer:
        'A dentistas y odontólogos que quieren actualizarse en una especialidad concreta con un enfoque clínico. En la página de cada curso tienes el programa o los objetivos de aprendizaje.',
    },
    {
      question: '¿Cómo reservo mi plaza?',
      answer: `Escríbenos por WhatsApp o llámanos al ${CONTACT.phoneFormatted}. Te confirmamos si quedan plazas y te explicamos cómo formalizar la reserva.`,
    },
  ]

  if (course) {
    items.push(
      {
        question: '¿Dónde y cuándo es el próximo curso?',
        answer: `«${course.title}» se celebra el ${formatLongDate(course)} en ${course.location} (Vera, Almería)${
          course.schedule ? `, en horario de ${course.schedule}` : ''
        }.`,
      },
      {
        question: '¿Cuántas plazas hay?',
        answer: `Un máximo de ${course.spots} asistentes. Mantenemos grupos reducidos para que puedas preguntar y comentar tus casos con el ponente.`,
      },
    )
    if (course.price != null) {
      items.push({
        question: '¿Cuánto cuesta?',
        answer: `El precio es de ${course.price} € por asistente${
          course.includes?.length ? ` e incluye ${course.includes.join(' y ').toLowerCase()}` : ''
        }.`,
      })
    }
  }

  items.push({
    question: '¿Y si ahora no puedo asistir?',
    answer:
      'Organizamos nuevas ediciones y cursos de otras especialidades. Pídenos que te avisemos y te escribiremos cuando abramos las próximas fechas.',
  })

  return items
}
