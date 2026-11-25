import { useTranslation } from 'react-i18next'

import { Carousel, type CarouselCard } from '../Carousel'

import teamPhoto from '../../assets/images/team.webp'
import floqIdea from '../../assets/images/floq_idea.svg'

const cards: CarouselCard[] = [
  {
    image: teamPhoto,
    alt: 'Equipe da Campanha do Agasalho reunida',
    title: '2026',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: floqIdea,
    alt: 'Floquinho, mascote da campanha',
    title: '2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: teamPhoto,
    alt: 'Equipe da Campanha do Agasalho reunida',
    title: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: floqIdea,
    alt: 'Floquinho, mascote da campanha',
    title: '2023',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    image: teamPhoto,
    alt: 'Equipe da Campanha do Agasalho reunida',
    title: '2022',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
]

export function CampaignMemories() {
  const { t } = useTranslation()

  return (
    <section
      className="section-spacing"
      aria-labelledby="campaign-memories-title"
    >
      <div className="page-container">
        <h2 id="campaign-memories-title" className="text-h2">
          {t('campaign.carousel.title')}
        </h2>
        <p className="mt-2 text-body-lg">
          {t('campaign.carousel.description')}
        </p>
        <Carousel label={t('campaign.carousel.title')} cards={cards} />
      </div>
    </section>
  )
}
