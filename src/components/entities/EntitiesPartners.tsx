import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EntityCard } from '../EntityCard'

import { getEntities } from '../../services/entities'
import type { Entity } from '../../types/entity'
import { getTranslatedText } from '../../utils/getTranslatedText'

import floqThinks from '../../assets/images/floq_thinking.svg'

export function EntitiesPartners() {
  const { t, i18n } = useTranslation()
  const [entities, setEntities] = useState<Entity[]>([])
  const language = i18n.resolvedLanguage

  useEffect(() => {
    getEntities().then((data) =>
      setEntities(data.filter((entity) => entity.isActive)),
    )
  }, [])

  return (
    <section
      className="bg-purple-4 section-spacing"
      aria-labelledby="entities-title"
    >
      <div className="page-container">
        <h2 id="entities-title" className="text-h2">
          {t('entities.partners.title')}
        </h2>
        <ul
          className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {entities.map((entity) => (
            <li key={entity.id}>
              <EntityCard
                image={floqThinks}
                title={entity.name}
                sectionTitle={entity.neighborhood}
                subtitleHighlight={t('entities.partners.target')}
                subtitleText={getTranslatedText(
                  entity.targetAudience,
                  language,
                )}
                descriptionHighlight={t('entities.partners.description')}
                descriptionText={getTranslatedText(
                  entity.contribution,
                  language,
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
