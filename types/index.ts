export type CourseModality = 'presencial' | 'online' | 'hibrido'

export type CourseCategory =
  | 'estetica'
  | 'endodoncia'
  | 'ortodoncia'
  | 'protesis'
  | 'implantologia'
  | 'higienistas'
  | 'gestion'

export interface ProgramModule {
  number: number
  title: string
  topics: string[]
}

export interface Course {
  id: string
  title: string
  subtitle?: string
  category: CourseCategory
  categoryLabel: string
  modality: CourseModality
  date: string
  dateISO?: string          // ISO 8601 para JSON-LD y meta
  duration: string
  location: string
  price: number
  spots: number
  emoji: string
  gradient: string
  imageUrl?: string
  includesPractice?: boolean
  program?: ProgramModule[]
  professorId?: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface CredentialGroup {
  label: string
  items: string[]
}

export interface Professor {
  id: string
  initials: string
  name: string
  specialty: string
  bio: string
  credentials?: string[]
  credentialGroups?: CredentialGroup[]
  imageUrl?: string
}

export interface CourseFilter {
  value: CourseCategory | 'all'
  label: string
}
