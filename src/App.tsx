import { useTranslation } from 'react-i18next'

export function App() {
  const { t, i18n } = useTranslation()

  function toggleLanguage() {
    i18n.changeLanguage(i18n.resolvedLanguage === 'pt' ? 'en' : 'pt')
  }

  return (
    <>
      <button type="button" onClick={toggleLanguage}>
        {t('language.switch')}
      </button>
      <h1 className="text-display">{t('title')}</h1>
    </>
  )
}
