import { useTranslation } from 'react-i18next'

import { ValueCard } from '../ValueCard'

import floqBoxClothes from '../../assets/images/floq_box_clothes.svg'
import floqDuoScarves from '../../assets/images/floq_duo_scarves.svg'
import floqIdea from '../../assets/images/floq_idea.svg'

const values = [
  {
    titleKey: 'campaign.values.impact.title',
    descriptionKey: 'campaign.values.impact.description',
    image: floqBoxClothes,
  },
  {
    titleKey: 'campaign.values.dignity.title',
    descriptionKey: 'campaign.values.dignity.description',
    image: floqDuoScarves,
  },
  {
    titleKey: 'campaign.values.mobilization.title',
    descriptionKey: 'campaign.values.mobilization.description',
    image: floqIdea,
  },
] as const

export function CampaignValues() {
  const { t } = useTranslation()

  return (
    <section className="section-spacing" aria-labelledby="values-title">
      <div className="page-container">
        <h2 id="values-title" className="text-h2">
          {t('campaign.values.title')}
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3" role="list">
          {values.map((value) => (
            <li key={value.titleKey}>
              <ValueCard
                title={t(value.titleKey)}
                description={t(value.descriptionKey)}
                image={value.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
