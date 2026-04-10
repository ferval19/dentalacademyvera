import type { Professor } from '@/types'

export const professors: Professor[] = [
  {
    id: 'rafael-ibanez',
    initials: 'RI',
    name: 'Dr. Rafael Ibáñez',
    specialty: 'Endodoncia',
    bio: 'Especialista con práctica exclusiva en Endodoncia. Referente nacional con más de una década de formación avanzada y actividad clínica ininterrumpida en la especialidad.',
    credentialGroups: [
      {
        label: 'Formación',
        items: [
          'Licenciado en Odontología — Universidad Europea de Madrid, 2011',
          'Postgrado en Endodoncia clínica y microscópica BZ. Leioa Bizkaia (2013, 2014, 2017)',
          'Máster en Endodoncia — Universidad de Sevilla, 2014–2016',
        ],
      },
      {
        label: 'Actividad clínica y docente',
        items: [
          'Conferenciante en Congresos nacionales e internacionales',
          'Docente en Postgrados de Endodoncia',
          'KOL en Endogal',
          'Práctica Endodoncia Exclusiva',
        ],
      },
    ],
    imageUrl: '/images/professors/rafael-ibanez.jpg',
  },
]
