import { useTranslation } from 'react-i18next'
import { MultiCardCarousel } from '../Slider'

import teamPhoto from '../../assets/images/team.webp'
import floqIdea from '../../assets/images/floq_idea.svg'

const cards = [
  {
    image: teamPhoto,
    title: '2026',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: floqIdea,
    title: '2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: teamPhoto,
    title: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: floqIdea,
    title: '2023',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: teamPhoto,
    title: '2022',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
]

export function CampaignMemories() {
  const { t } = useTranslation()
  return (
    <section
      className="m-10 page-container"
      aria-labelledby="campaign-memories-title"
    >
      <h2 id="campaign-memories-title" className="text-h2">
        {t('campaign.carousel.title')}
      </h2>
      <p className="mt-2 text-body">{t('campaign.carousel.description')}</p>
      <MultiCardCarousel cards={cards} />
    </section>
  )
}
