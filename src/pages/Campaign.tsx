import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'
import { CampaignValues } from '../components/campaign/CampaignValues'
import { CampaignHistory } from '../components/campaign/CampaignHistory'
import { CampaignHowItWorks } from '../components/campaign/CampaignHowItWorks'
import { CampaignMemories } from '../components/campaign/CampaignMemories'

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
      <CampaignHistory />
      <CampaignHowItWorks />
      <CampaignMemories />
    </>
  )
}
