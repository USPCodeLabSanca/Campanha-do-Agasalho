import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRightIcon } from '@phosphor-icons/react'

import type { CollectionPoint } from '../../types/collectionPoint'
import { googleMapsUrl } from '../../utils/collectionPoints'
import { Button } from '../Button'

type CollectionPointCardProps = {
  point: CollectionPoint
  highlighted: boolean
  distanceKm?: number
  canHighlight: boolean
  onHighlight: () => void
}

export const CollectionPointCard = forwardRef<
  HTMLLIElement,
  CollectionPointCardProps
>(function CollectionPointCard(
  { point, highlighted, distanceKm, canHighlight, onHighlight },
  ref,
) {
  const { t } = useTranslation()

  return (
    <li
      ref={ref}
      className={[
        'flex flex-col gap-3 rounded-2xl border bg-white p-5 transition',
        highlighted ? 'border-pink-1' : 'border-blue-1/20',
      ].join(' ')}
    >
      <h3 className="text-h4">{point.name}</h3>

      <p className="text-small text-blue-1/80">{point.address}</p>

      <p className="text-small text-orange-2">
        {point.hours}
        {distanceKm !== undefined && (
          <span className="ml-2 text-blue-1/70">
            · {t('collection.card.distance', { km: distanceKm.toFixed(1) })}
          </span>
        )}
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="dark"
          size="small"
          href={googleMapsUrl(point)}
          rightIcon={<ArrowUpRightIcon size={16} weight="bold" />}
        >
          {t('collection.card.openMap')}
        </Button>
        {canHighlight && (
          <Button variant="outlineDark" size="small" onClick={onHighlight}>
            {t('collection.card.highlight')}
          </Button>
        )}
      </div>
    </li>
  )
})
