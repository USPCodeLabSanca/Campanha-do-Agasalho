import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'
import { CampaignValues } from '../components/campaign/CampaignValues'

import floqGroup from '../assets/images/floq_group.svg'

export function Campaign() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        label={t('nav.campaign')}
        title={t('campaign.hero.title')}
        description={t('campaign.hero.description')}
        image={floqGroup}
      />
      <CampaignValues />
    </>
  )
}
