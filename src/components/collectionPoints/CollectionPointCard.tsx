import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRightIcon, ClockIcon } from '@phosphor-icons/react'

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

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-small">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-orange-3 px-3 py-1 font-bold">
          <ClockIcon size={16} aria-hidden="true" className="shrink-0" />
          {point.hours}
        </p>
        {distanceKm !== undefined && (
          <p className="text-blue-1/70">
            {t('collection.card.distance', { km: distanceKm.toFixed(1) })}
          </p>
        )}
      </div>

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
