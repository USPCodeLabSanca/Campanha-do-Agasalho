import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { LatLng, MappablePoint } from '../../types/collectionPoint'

type CollectionMapProps = {
  points: MappablePoint[]
  highlightedId: string | null
  userLocation: LatLng | null
  onSelect: (id: string) => void
}

const DEFAULT_CENTER: L.LatLngExpression = [-22.0087, -47.8909]

function pinIcon(active: boolean) {
  const size = active ? 28 : 20
  return L.divIcon({
    className: '',
    html: active
      ? '<div class="size-full rounded-full border-[3px] border-white bg-pink-1 shadow-md"></div>'
      : '<div class="size-full rounded-full border-[3px] border-white bg-blue-1 shadow-md"></div>',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

const userIcon = L.divIcon({
  className: '',
  html: '<div class="size-full rounded-full border-2 border-white bg-blue-5 shadow-md ring-4 ring-blue-5/30"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

export function CollectionMap({
  points,
  highlightedId,
  userLocation,
  onSelect,
}: CollectionMapProps) {
  const { t } = useTranslation()

  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const userMarkerRef = useRef<L.Marker | null>(null)
  const onSelectRef = useRef(onSelect)
  const highlightedIdRef = useRef(highlightedId)

  useEffect(() => {
    onSelectRef.current = onSelect
    highlightedIdRef.current = highlightedId
  }, [onSelect, highlightedId])

  useEffect(() => {
    if (!containerRef.current) return

    const map = L.map(containerRef.current, {
      center: DEFAULT_CENTER,
      zoom: 13,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    const container = map.getContainer()
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) map.scrollWheelZoom.enable()
      else map.scrollWheelZoom.disable()
    }
    container.addEventListener('wheel', onWheel)

    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(container)

    mapRef.current = map
    const markers = markersRef.current

    return () => {
      container.removeEventListener('wheel', onWheel)
      observer.disconnect()
      markers.clear()
      userMarkerRef.current = null
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const markers = markersRef.current
    const visibleIds = new Set(points.map((p) => p.id))

    markers.forEach((marker, id) => {
      if (!visibleIds.has(id)) {
        marker.remove()
        markers.delete(id)
      }
    })

    points.forEach((point) => {
      if (markers.has(point.id)) return
      const marker = L.marker([point.lat, point.lng], {
        icon: pinIcon(false),
        title: point.name,
        alt: point.name,
      }).addTo(map)
      marker.on('click', () => onSelectRef.current(point.id))
      markers.set(point.id, marker)
    })

    if (points.length > 0 && !highlightedIdRef.current) {
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]))
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 })
    }
  }, [points])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach((marker, id) => {
      const active = id === highlightedId
      marker.setIcon(pinIcon(active))
      marker.setZIndexOffset(active ? 1000 : 0)
    })

    const point = points.find((p) => p.id === highlightedId)
    if (point) {
      map.setView([point.lat, point.lng], Math.max(map.getZoom(), 15), {
        animate: true,
      })
    }
  }, [highlightedId, points])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    userMarkerRef.current?.remove()
    userMarkerRef.current = null
    if (!userLocation) return

    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
      icon: userIcon,
      title: t('collection.map.you'),
      keyboard: false,
    }).addTo(map)
  }, [userLocation, t])

  return (
    <div className="relative z-0 h-90 overflow-hidden rounded-3xl border border-blue-1/20 bg-white lg:h-full lg:min-h-115">
      <div
        ref={containerRef}
        className="size-full"
        role="region"
        aria-label={t('collection.map.label')}
      />
    </div>
  )
}
