import { useTranslation } from 'react-i18next'

import { NucleusCard } from './ParticipateNucleusCard'
import generalImage from '../../assets/images/floq_suit.svg'
import outreachImage from '../../assets/images/floq_smartphone_pink.svg'
import organizationsImage from '../../assets/images/floq_car_entity.svg'
import externalImage from '../../assets/images/floq_money_orange.svg'
import infrastructureImage from '../../assets/images/floq_jumping_infra.svg'

const nuclei = [
  {
    image: generalImage,
    titleKey: 'participate.nuclei.items.general.title',
    descriptionKey: 'participate.nuclei.items.general.description',
  },
  {
    image: outreachImage,
    titleKey: 'participate.nuclei.items.outreach.title',
    descriptionKey: 'participate.nuclei.items.outreach.description',
  },
  {
    image: organizationsImage,
    titleKey: 'participate.nuclei.items.organizations.title',
    descriptionKey: 'participate.nuclei.items.organizations.description',
  },
  {
    image: externalImage,
    titleKey: 'participate.nuclei.items.external.title',
    descriptionKey: 'participate.nuclei.items.external.description',
  },
  {
    image: infrastructureImage,
    titleKey: 'participate.nuclei.items.infrastructure.title',
    descriptionKey: 'participate.nuclei.items.infrastructure.description',
  },
] as const

export function ParticipateNuclei() {
  const { t } = useTranslation()

  return (
    <section className="section-spacing" aria-labelledby="nuclei-title">
      <div className="page-container">
        <h2 id="nuclei-title" className="text-h2">
          {t('participate.nuclei.title')}
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-2" role="list">
          {nuclei.map((nucleus) => (
            <li key={nucleus.titleKey}>
              <NucleusCard
                image={nucleus.image}
                title={t(nucleus.titleKey)}
                description={t(nucleus.descriptionKey)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}