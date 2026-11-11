import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

import { PageHero } from '../components/PageHero'
import { CampaignValues } from '../components/campaign/CampaignValues'
import { CampaignHistory } from '../components/campaign/CampaignHistory'
import { CampaignHowItWorks } from '../components/campaign/CampaignHowItWorks'

import floqGroup from '../assets/images/floq_group.svg'

export function Campaign() {
  const { t } = useTranslation()
  const { hash } = useLocation()

  // Rola até a seção quando o link tem #, ex.: /campanha#como-funciona
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    }
  }, [hash])

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
    </>
  )
}
