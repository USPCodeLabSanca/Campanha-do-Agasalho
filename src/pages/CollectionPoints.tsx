import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'
import floqCollectionBox from '../assets/images/floq_collection_box.svg'

import { CollectionPointsSection } from '../components/collectionPoints/CollectionPointsSection'

export function CollectionPoints() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        label={t('nav.collectionPoints')}
        title={t('collectionPoints.hero.title')}
        description={t('collectionPoints.hero.description')}
        image={floqCollectionBox}
        variant="pink"
      />
      <CollectionPointsSection/>
    </>
  )
}
