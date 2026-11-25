import type { TranslatedText } from './translatedText'

export type Milestone = {
  id: string
  year: number
  title: TranslatedText
  description: TranslatedText
}

export type MilestoneInput = Omit<Milestone, 'id'>
