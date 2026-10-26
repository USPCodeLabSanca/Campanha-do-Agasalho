import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'

import floqMother from '../assets/images/floq_mother.svg'

export function Entities() {
  const { t } = useTranslation()

  return (
    <PageHero
      label={t('nav.entities')}
      title={t('entities.hero.title')}
      description={t('entities.hero.description')}
      image={floqMother}
      variant="purple"
    />
  )
}
