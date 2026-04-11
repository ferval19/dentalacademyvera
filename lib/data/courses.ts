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
    spots: 8,
    emoji: '🔬',
    gradient: 'linear-gradient(135deg, #1E2D3D, #3A5068)',
    imageUrl: '/images/courses/endodoncia-clinica.jpg',
    includesPractice: true,
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
]

export const courseFilters: CourseFilter[] = [
  { value: 'all', label: 'Todos' },
  { value: 'endodoncia', label: 'Endodoncia' },
]
