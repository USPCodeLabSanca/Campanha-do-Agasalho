import type { TranslatedText } from './translatedText'

export type Entity = {
  id: string
  name: string
  neighborhood: string
  targetAudience: TranslatedText
  contribution: TranslatedText
  isActive: boolean
}

export type EntityInput = Omit<Entity, 'id'>
