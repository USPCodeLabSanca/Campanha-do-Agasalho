import type { TranslatedText } from './translatedText'

export type MascotKey = 'suit' | 'smartphone' | 'car' | 'money' | 'infra'

export type Nucleus = {
  id: string
  name: TranslatedText
  description: TranslatedText
  mascot: MascotKey
  isActive: boolean
}

export type NucleusInput = Omit<Nucleus, 'id'>

export type SelectionProcess = {
  isOpen: boolean
  formUrl: string
  deadline: string
  openMessage: TranslatedText
  closedMessage: TranslatedText
}
