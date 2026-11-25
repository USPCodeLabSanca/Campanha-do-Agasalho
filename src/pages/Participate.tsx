import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'
import { ParticipateNuclei } from '../components/participate/ParticipateNuclei'
import { ParticipateFormsSelection } from '../components/participate/ParticipateFormsSelection'

import floqInBox from '../assets/images/floq_in_box.svg'

export function Participate() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        label={t('nav.participate')}
        title={t('participate.hero.title')}
        description={t('participate.hero.description')}
        image={floqInBox}
        variant="pink"
      />
      <ParticipateNuclei/>
      <ParticipateFormsSelection/>
    </>
  )
}
