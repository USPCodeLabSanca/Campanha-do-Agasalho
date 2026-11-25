import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getCollectionPoints } from '../../services/collectionPoints'
import {
  hasCoords,
  type CollectionPoint,
  type LatLng,
  type MappablePoint,
} from '../../types/collectionPoint'
import {
  distanceKm,
  findNearest,
  normalize,
} from '../../utils/collectionPoints'
import { CollectionFilters } from './CollectionFilters'
import { CollectionMap } from './CollectionMap'
import { CollectionPointCard } from './CollectionPointCard'

type GeoError = 'unsupported' | 'denied' | 'unavailable' | null
type LoadStatus = 'loading' | 'ready' | 'error'

export function CollectionPointsSection() {
  const { t } = useTranslation()

  const [points, setPoints] = useState<CollectionPoint[]>([])
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('loading')

  const [search, setSearch] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState<GeoError>(null)

  const cardRefs = useRef<Map<string, HTMLLIElement>>(new Map())

  useEffect(() => {
    let cancelled = false
    getCollectionPoints()
      .then((data) => {
        if (cancelled) return
        setPoints(data.filter((p) => p.isActive))
        setLoadStatus('ready')
      })
      .catch(() => !cancelled && setLoadStatus('error'))
    return () => {
      cancelled = true
    }
  }, [])

  const neighborhoods = useMemo(
    () =>
      [
        ...new Set(
          points.map((p) => p.neighborhood).filter((n): n is string => !!n),
        ),
      ].sort((a, b) => a.localeCompare(b)),
    [points],
  )

  const filtered = useMemo(() => {
    const query = normalize(search)
    return points.filter((point) => {
      const matchesNeighborhood =
        !neighborhood || point.neighborhood === neighborhood
      const matchesSearch =
        !query ||
        normalize(
          `${point.name} ${point.address} ${point.neighborhood ?? ''}`,
        ).includes(query)
      return matchesNeighborhood && matchesSearch
    })
  }, [points, search, neighborhood])

  const mappable = useMemo(() => filtered.filter(hasCoords), [filtered])

  useEffect(() => {
    if (highlightedId && !filtered.some((p) => p.id === highlightedId)) {
      setHighlightedId(null)
    }
  }, [filtered, highlightedId])

  const highlight = useCallback((id: string) => {
    setHighlightedId(id)
    cardRefs.current
      .get(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [])

  const clearFilters = () => {
    setSearch('')
    setNeighborhood('')
    setHighlightedId(null)
    setGeoError(null)
  }

  const handleNearest = () => {
    if (!('geolocation' in navigator)) {
      setGeoError('unsupported')
      return
    }
    setLocating(true)
    setGeoError(null)

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const origin = { lat: coords.latitude, lng: coords.longitude }
        setUserLocation(origin)
        setLocating(false)
        const nearest = findNearest<MappablePoint>(
          origin,
          points.filter(hasCoords),
        )
        if (nearest) {
          setSearch('')
          setNeighborhood('')
          highlight(nearest.id)
        }
      },
      (error) => {
        setLocating(false)
        setGeoError(
          error.code === error.PERMISSION_DENIED ? 'denied' : 'unavailable',
        )
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <section className="bg-[#f5f6ff] px-5 py-10 md:px-20 md:py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <CollectionFilters
          search={search}
          neighborhood={neighborhood}
          neighborhoods={neighborhoods}
          locating={locating}
          onSearchChange={setSearch}
          onNeighborhoodChange={setNeighborhood}
          onClear={clearFilters}
          onNearest={handleNearest}
        />

        {geoError && (
          <p role="alert" className="text-sm font-semibold text-pink-1">
            {t(`collection.geoError.${geoError}`)}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <CollectionMap
            points={mappable}
            highlightedId={highlightedId}
            userLocation={userLocation}
            onSelect={highlight}
          />

          <div className="flex min-h-0 flex-col gap-3">
            <p className="text-sm font-semibold text-blue-1" aria-live="polite">
              {loadStatus === 'ready' &&
                t('collection.count', { count: filtered.length })}
            </p>

            {loadStatus === 'loading' && (
              <p className="text-blue-1">{t('collection.loading')}</p>
            )}
            {loadStatus === 'error' && (
              <p role="alert" className="text-pink-1">
                {t('collection.loadError')}
              </p>
            )}
            {loadStatus === 'ready' && filtered.length === 0 && (
              <p className="rounded-2xl border border-blue-1/20 bg-white p-6 text-blue-1">
                {t('collection.empty')}
              </p>
            )}

            {loadStatus === 'ready' && filtered.length > 0 && (
              <ul className="flex max-h-[460px] flex-col gap-4 overflow-y-auto pr-1 lg:max-h-[520px]">
                {filtered.map((point) => (
                  <CollectionPointCard
                    key={point.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(point.id, el)
                      else cardRefs.current.delete(point.id)
                    }}
                    point={point}
                    highlighted={point.id === highlightedId}
                    canHighlight={hasCoords(point)}
                    distanceKm={
                      userLocation && hasCoords(point)
                        ? distanceKm(userLocation, point)
                        : undefined
                    }
                    onHighlight={() => highlight(point.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
