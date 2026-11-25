import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import arrowUpRight from '../../assets/images/ArrowUpRight.svg'
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

  const openMap = () =>
    window.open(googleMapsUrl(point), '_blank', 'noopener,noreferrer')

  return (
    <li
      ref={ref}
      className={[
        'flex flex-col gap-3 rounded-2xl border bg-white p-5 transition',
        highlighted ? 'border-pink-1' : 'border-blue-1/20',
      ].join(' ')}
    >
      <h3 className="text-lg font-bold text-blue-1">{point.name}</h3>

      <p className="text-sm text-blue-1/80">{point.address}</p>

      <p className="text-sm text-orange-1">
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
          onClick={openMap}
          rightIcon={<img src={arrowUpRight} alt="" className="size-4" />}
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
