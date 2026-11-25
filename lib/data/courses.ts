import type { Course, CourseFilter } from '@/types'

export const courses: Course[] = [
  {
    id: 'endodoncia-clinica',
    title: 'Actualización en Endodoncia Clínica',
    subtitle: 'Ponte al día desde el diagnóstico hasta la obturación',
    category: 'endodoncia',
    categoryLabel: 'Endodoncia',
    modality: 'presencial',
    date: '29 May 2026',
    dateISO: '2026-05-29',
    duration: '8 horas',
    location: 'The Work Club Vera',
    locationUrl: 'https://theworkclub.es',
    price: 300,
    includes: ['Comida incluida', 'Coffee break'],
    spots: 10,
    emoji: '🔬',
    gradient: 'linear-gradient(135deg, #1E2D3D, #3A5068)',
    imageUrl: '/images/courses/endodoncia-clinica.jpg',
    ogImage: '/images/courses/endodoncia-og.jpg',
    includesPractice: true,
    quote: 'Ponte al día en diagnóstico, instrumentación, irrigación y obturación en una sola jornada.',
    collaborators: [
      {
        name: 'Endogal',
        url: 'https://www.endogal.com',
        logoUrl: '/images/patrocinadores/endogal.png',
      },
    ],
    professorId: 'rafael-ibanez',
    program: [
      {
        number: 1,
        title: 'Diagnóstico en Endodoncia',
        topics: [
          'Patología pulpo-periapical',
          'Pruebas diagnósticas',
          'Lesiones Endo-Perio',
          'Microscopio operatorio y CBCT',
          'Pronóstico',
        ],
      },
      {
        number: 2,
        title: 'Instrumentación',
        topics: [
          'Anatomía',
          'Conceptos claves',
          'Técnicas',
          'Aleaciones modernas',
          'Complicaciones',
        ],
      },
      {
        number: 3,
        title: 'Irrigación',
        topics: [
          'Irrigantes en endodoncia',
          'Sistemas de irrigación',
          'Complicaciones',
        ],
      },
      {
        number: 4,
        title: 'Obturación',
        topics: [
          'Materiales',
          'Sistemas de obturación',
          '1 vs 2 sesiones',
        ],
      },
    ],
  },
  {
    id: 'alineadores-pacientes-crecimiento',
    title: 'Alineadores transparentes en pacientes en crecimiento',
    subtitle: 'Claves para el éxito',
    category: 'ortodoncia',
    categoryLabel: 'Ortodoncia',
    modality: 'presencial',
    date: '5 Feb 2027',
    dateISO: '2027-02-05',
    duration: '8,5 horas',
    schedule: '9:30–14:00 y 16:00–20:00',
    location: 'The Work Club Vera',
    locationUrl: 'https://theworkclub.es',
    // price: pendiente de confirmar → se muestra "Consultar precio"
    spots: 20,
    emoji: '🦷',
    gradient: 'linear-gradient(135deg, #1E2D3D, #2E5560)',
    ogImage: '/images/courses/alineadores-og.jpg',
    summary:
      'Cada día atendemos en nuestras consultas a más pacientes en crecimiento con maloclusiones y la pregunta más recurrente es siempre: ¿lo trato ahora o espero? Raramente al final del tratamiento lamentamos haber comenzado antes, sin embargo, hay ocasiones en que hemos lamentado haber dejado pasar el tiempo para empezar. El tratamiento con alineadores abre un nuevo mundo de posibilidades para dar respuestas a esta pregunta y decidir tratar a estos pacientes de una manera sencilla y eficaz en el momento adecuado.',
    objectives: [
      'Revisar los conceptos de biomecánica con alineadores',
      'Revisar las particularidades de la biomecánica y la planificación en niños',
      'Identificar qué maloclusiones “no pueden esperar”',
      'Elegir la mejor opción de tratamiento',
      'Resolver complicaciones cuando no llegas a tiempo',
    ],
    quote: '¿Lo trato ahora o espero? Claves para decidir y tratar en el momento adecuado.',
    collaborators: [
      {
        name: 'Ormco',
        url: 'https://ormco.com',
        logoUrl: '/images/patrocinadores/ormco.png',
      },
      {
        name: 'Spark Clear Aligner System',
        url: 'https://sparkaligners.com',
        logoUrl: '/images/patrocinadores/spark.png',
      },
    ],
    professorId: 'juan-manuel-bailon',
  },
]

export const courseFilters: CourseFilter[] = [
  { value: 'all', label: 'Todos' },
  { value: 'endodoncia', label: 'Endodoncia' },
  { value: 'ortodoncia', label: 'Ortodoncia' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────
// Las páginas son estáticas: "hoy" es el momento del build. Un curso pasa a
// "celebrado" en la web cuando se vuelve a desplegar después de su fecha.

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function isPastCourse(course: Course): boolean {
  return !!course.dateISO && course.dateISO < todayISO()
}

/** Cursos futuros ordenados por fecha (el primero es el próximo). */
export function getUpcomingCourses(): Course[] {
  return courses
    .filter((c) => !isPastCourse(c))
    .sort((a, b) => (a.dateISO ?? '').localeCompare(b.dateISO ?? ''))
}

export function getNextCourse(): Course | undefined {
  return getUpcomingCourses()[0]
}

export function formatPrice(course: Course): string {
  return course.price != null ? `${course.price} €` : 'Consultar precio'
}

/** "5 de febrero de 2027" */
export function formatLongDate(course: Course): string {
  if (!course.dateISO) return course.date
  return new Date(`${course.dateISO}T12:00:00Z`).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}

/** "5 Feb" */
export function formatShortDate(course: Course): string {
  if (!course.dateISO) return course.date
  const d = new Date(`${course.dateISO}T12:00:00Z`)
  const month = d.toLocaleDateString('es-ES', { month: 'short', timeZone: 'UTC' }).replace('.', '')
  return `${d.getUTCDate()} ${month.charAt(0).toUpperCase()}${month.slice(1)}`
}

/** Divide el título en dos líneas en el primer " en " (la segunda va resaltada). */
export function splitTitle(title: string): [string, string] {
  const i = title.indexOf(' en ')
  return i === -1 ? [title, ''] : [title.slice(0, i + 3), title.slice(i + 4)]
}

/** Todos los cursos en orden cronológico (la primera edición primero). */
export function getCoursesChronological(): Course[] {
  return [...courses].sort((a, b) => (a.dateISO ?? '').localeCompare(b.dateISO ?? ''))
}

/** Cursos ya celebrados, del más reciente al más antiguo. */
export function getPastCourses(): Course[] {
  return getCoursesChronological().filter(isPastCourse).reverse()
}

/** Número de edición de la academia (1 = primer curso celebrado). */
export function editionNumber(course: Course): number {
  return getCoursesChronological().findIndex((c) => c.id === course.id) + 1
}

/** Cursos de un ponente, del más reciente al más antiguo. */
export function getCoursesByProfessor(professorId: string): Course[] {
  return getCoursesChronological()
    .filter((c) => c.professorId === professorId)
    .reverse()
}
