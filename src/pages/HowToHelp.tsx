import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'
import { HowToHelpOptions } from '../components/howToHelp/HowToHelpOptions'
import { HowToHelpDonationGuide } from '../components/howToHelp/HowToHelpDonationGuide'

import floqHoldingHeart from '../assets/images/floq_holding_heart.svg'

export function HowToHelp() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        label={t('nav.howToHelp')}
        title={t('howToHelp.hero.title')}
        description={t('howToHelp.hero.description')}
        image={floqHoldingHeart}
        variant="green"
      />
      <HowToHelpOptions />
      <HowToHelpDonationGuide />
    </>
  )
}
