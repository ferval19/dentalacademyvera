/** Central source of truth for contact details */
export const CONTACT = {
  phone: '672830248',
  phoneFormatted: '672 830 248',
  phoneTel: 'tel:+34672830248',
  email: 'info@dentalacademyvera.com',
  emailHref: 'mailto:info@dentalacademyvera.com',
  whatsappBase: 'https://wa.me/34672830248',
  whatsappGeneral:
    'https://wa.me/34672830248?text=Hola%2C%20me%20interesa%20recibir%20información%20sobre%20los%20cursos%20de%20Dental%20Academy%20Vera',
} as const

export function whatsappCourse(courseTitle: string) {
  const msg = encodeURIComponent(
    `Hola, me interesa el curso "${courseTitle}". ¿Podéis darme más información?`,
  )
  return `${CONTACT.whatsappBase}?text=${msg}`
}

/** "Avisadme de los próximos cursos" (sin base de datos: mensaje ya redactado). */
export const NOTIFY = {
  whatsapp: `${CONTACT.whatsappBase}?text=${encodeURIComponent(
    'Hola, me gustaría que me avisarais cuando haya nuevos cursos en Dental Academy Vera.',
  )}`,
  email: `${CONTACT.emailHref}?subject=${encodeURIComponent('Avisadme de los próximos cursos')}&body=${encodeURIComponent(
    'Hola, me gustaría que me avisarais cuando abráis nuevos cursos.\n\nNombre:\nEspecialidad o temas que me interesan:\n',
  )}`,
}
