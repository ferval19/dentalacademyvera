import type { Professor } from '@/types'

export const professors: Professor[] = [
  {
    id: 'rafael-ibanez',
    initials: 'RI',
    name: 'Dr. Rafael Ibáñez',
    specialty: 'Endodoncia',
    tagline: 'Endodoncia Exclusiva · KOL Endogal',
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
    avatarUrl: '/images/professors/rafael-ibanez-avatar.png',
  },
  {
    id: 'juan-manuel-bailon',
    initials: 'JB',
    name: 'Dr. Juan Manuel Bailón Rivera',
    specialty: 'Ortodoncia',
    tagline: 'Ortodoncista · KOL Ormco Spark',
    bio: 'Odontólogo con más de veinte años de práctica clínica y dedicación exclusiva a la Ortodoncia desde 2016. Referente en ortodoncia con alineadores, KOL de Ormco Spark y docente en másteres de ortodoncia y alineadores.',
    credentialGroups: [
      {
        label: 'Formación',
        items: [
          'Licenciado en Odontología — Universidad de Granada, 2002',
          'Experto Universitario en Prótesis Dental — Universidad de Granada, 2004',
          'Máster Damon — Dres. Perera y Espejo, Madrid, 2014',
          'Estancia clínica en UCLA — Dr. Moon, Los Ángeles (EE. UU.), 2018',
          'Máster Experto en Ortodoncia Invisible — Manuel Román Academy, 2022',
          'Máster COIP Advanced — Breukelen, 2026',
        ],
      },
      {
        label: 'Actividad clínica y docente',
        items: [
          'Ortodoncia exclusiva desde 2016 en clínica propia (Atarfe, Granada)',
          'KOL Ormco Spark desde 2024',
          'Ponente en SEDO Alineadores y Nuevas Tecnologías (2022–2026)',
          'Docente colaborador del Máster de Ortodoncia — Universidad de Granada',
          'Docente en el Máster Propio “Aligners Unlimited” con el Dr. José Menacho',
          'Docente Spark Aligners en el “Master OIA”',
        ],
      },
    ],
    imageUrl: '/images/professors/juan-manuel-bailon.jpg',
    avatarUrl: '/images/professors/juan-manuel-bailon-avatar.png',
  },
]
