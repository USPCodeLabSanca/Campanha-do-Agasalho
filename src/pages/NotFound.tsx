import { useTranslation } from 'react-i18next'

import { Button } from '../components/Button'
import { Snowfall } from '../components/Snowfall'

import floqThinking from '../assets/images/floq_thinking.svg'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-linear-to-b from-blue-1 to-blue-5 section-spacing text-white"
      aria-labelledby="not-found-title"
    >
      <Snowfall count={45} />
      <div className="relative page-container flex flex-col items-center text-center">
        <img src={floqThinking} alt="" className="h-40 w-auto md:h-52" />
        <p className="mt-6 text-display text-orange-1">404</p>
        <h1 id="not-found-title" className="mt-2 text-h2">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 max-w-md text-body-lg">
          {t('notFound.description')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">{t('notFound.home')}</Button>
          <Button variant="outlineLight" to="/pontos-coleta">
            {t('notFound.collectionPoints')}
          </Button>
        </div>
      </div>
    </section>
  )
}
