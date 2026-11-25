export type LocalizedText = { pt: string; en: string }

export type MascotKey = 'suit' | 'smartphone' | 'car' | 'money' | 'infra'

export type Nucleus = {
  id: string
  name: LocalizedText
  description: LocalizedText
  mascot: MascotKey
  isActive: boolean
}

export type NucleusInput = Omit<Nucleus, 'id'>

export type SelectionProcess = {
  isOpen: boolean
  formUrl: string
  closedMessage: LocalizedText
}
