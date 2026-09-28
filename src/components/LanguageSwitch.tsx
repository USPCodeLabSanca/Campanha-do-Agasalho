import { GlobeIcon } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export function LanguageSwitch() {
  const { t, i18n } = useTranslation()
  const nextLanguage = i18n.resolvedLanguage === 'pt' ? 'en' : 'pt'

  function toggleLanguage() {
    i18n.changeLanguage(nextLanguage)
  }

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 rounded-full border border-white px-3 py-1.5 text-button text-white transition-colors hover:bg-white hover:text-blue-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-2"
      onClick={toggleLanguage}
    >
      <GlobeIcon aria-hidden="true" size={20} />
      <span lang={nextLanguage}>{t('language.switch')}</span>
    </button>
  )
}
