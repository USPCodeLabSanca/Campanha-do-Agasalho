import type { TranslatedText } from '../types/translatedText'

export function getTranslatedText(
  text: TranslatedText,
  language: string | undefined,
) {
  if (language === 'en' && text.en) {
    return text.en
  }

  return text.pt
}
