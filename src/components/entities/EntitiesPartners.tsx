import { useTranslation } from 'react-i18next'

import { EntityCard } from '../EntityCard'

import floqThinks from '../../assets/images/floq_thinking.svg'

export interface EntityPartner {
  id: string
  name: string
  location: string
  targetAudience: string
  description: string
  image: string
}

const BASE_ENTITY: Omit<EntityPartner, 'id'> = {
  name: 'Lar das crianças',
  location: 'Vila Prado',
  targetAudience: 'Crianças e adolescentes',
  description: 'Roupas infantis e calçados triados por tamanho',
  image: floqThinks,
}

const MOCK_ENTITIES: EntityPartner[] = Array.from(
  { length: 8 },
  (_, index) => ({
    ...BASE_ENTITY,
    id: String(index + 1),
  }),
)

export function EntitiesPartners() {
  const { t } = useTranslation()

  const entities = MOCK_ENTITIES

  return (
    <section
      className="bg-purple-4 section-spacing"
      aria-labelledby="Entities-title"
    >
      <div className="page-container">
        <h2 id="Entities-title" className="text-h2">
          {t('entities.partners.title')}
        </h2>
        <ul className="mt-10 grid gap-8 lg:grid-cols-4 md:grid-cols-2" role="list">
          {entities.map((entities) => (
            <li key={entities.id}>
              <EntityCard
                image={entities.image}
                title={entities.name}
                sectionTitle={entities.location}
                subtitleHighlight={t('entities.partners.target')}
                subtitleText={entities.targetAudience}
                descriptionHighlight={t('entities.partners.description')}
                descriptionText={entities.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
