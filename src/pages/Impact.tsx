import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'

import floqLaptopChart from '../assets/images/floq_laptop_chart.svg'

export function Impact() {
  const { t } = useTranslation()

  return (
    <PageHero
      label={t('nav.impact')}
      title={t('impact.hero.title')}
      description={t('impact.hero.description')}
      image={floqLaptopChart}
    />
  )
}
