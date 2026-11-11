import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
] as const

export function LanguageSwitch() {
  const { t, i18n } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="flex w-fit rounded-full bg-black/20 p-1 text-small font-bold"
    >
      {languages.map((language) => {
        const isActive = i18n.resolvedLanguage === language.code

        return (
          <button
            key={language.code}
            type="button"
            lang={language.code}
            aria-pressed={isActive}
            onClick={() => i18n.changeLanguage(language.code)}
            className={`cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
              isActive
                ? 'bg-orange-3 text-blue-1'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {language.label}
            <span className="sr-only"> - {language.name}</span>
          </button>
        )
      })}
    </div>
  )
}
