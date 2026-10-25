import { useTranslation } from 'react-i18next'

import { Button } from '../Button'

import clothesFloq from '../../assets/images/clothes_floq.svg'

export function HomeJoin() {
  const { t } = useTranslation()

  return (
    <section className="section-spacing" aria-labelledby="join-title">
      <div className="page-container grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 id="join-title" className="text-h2">
            {t('home.join.title')}
          </h2>
          <p className="mt-4 text-body">{t('home.join.description')}</p>
          <div className="mt-8">
            <Button to="/participe">{t('home.join.button')}</Button>
          </div>
        </div>
        <img
          src={clothesFloq}
          alt={t('home.join.imageAlt')}
          className="w-40 justify-self-center md:w-48"
        />
      </div>
    </section>
  )
}
