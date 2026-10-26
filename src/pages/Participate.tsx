import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'

import floqInBox from '../assets/images/floq_in_box.svg'

export function Participate() {
  const { t } = useTranslation()

  return (
    <PageHero
      label={t('nav.participate')}
      title={t('participate.hero.title')}
      description={t('participate.hero.description')}
      image={floqInBox}
      variant="pink"
    />
  )
}
