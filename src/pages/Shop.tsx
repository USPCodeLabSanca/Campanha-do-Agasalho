import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'

import floqDuoShopping from '../assets/images/floq_duo_shopping.svg'

export function Shop() {
  const { t } = useTranslation()

  return (
    <PageHero
      label={t('nav.shop')}
      title={t('shop.hero.title')}
      description={t('shop.hero.description')}
      image={floqDuoShopping}
      variant="green"
    />
  )
}
