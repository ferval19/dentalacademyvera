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

export interface Collaborator {
  name: string
  url: string
  logoUrl: string           // para la web (/public)
  ogLogoB64?: string        // data URI para la imagen OG (edge runtime)
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
  schedule?: string         // horario, p. ej. "9:30–14:00 y 16:00–20:00"
  location: string
  price?: number            // sin precio → "Consultar precio"
  spots: number
  emoji: string
  gradient: string
  imageUrl?: string
  ogImage?: string
  includesPractice?: boolean
  locationUrl?: string
  includes?: string[]
  program?: ProgramModule[]
  summary?: string          // párrafo descriptivo del curso
  objectives?: string[]     // objetivos de aprendizaje
  quote?: string            // frase destacada en el hero de la portada
  collaborators?: Collaborator[]
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
  tagline?: string          // línea corta bajo el nombre, p. ej. "Endodoncia · KOL Endogal"
  bio?: string
  credentials?: string[]
  credentialGroups?: CredentialGroup[]
  imageUrl?: string
  avatarUrl?: string
}

export interface CourseFilter {
  value: CourseCategory | 'all'
  label: string
}
