import { useTranslation } from 'react-i18next'

import { TextLink } from '../TextLink'

import type { Destination, DestinationType } from '../../types/edition'

const typeColors: Record<DestinationType, string> = {
  shelters: 'bg-blue-1',
  elderly: 'bg-blue-4',
  childcare: 'bg-orange-1',
  socialProjects: 'bg-green-1',
  families: 'bg-purple-3',
}

type ImpactDestinationsProps = {
  destinations: Destination[]
  note: string
}

export function ImpactDestinations({
  destinations,
  note,
}: ImpactDestinationsProps) {
  const { t } = useTranslation()

  return (
    <article
      aria-labelledby="impact-destinations-title"
      className="h-full card p-6 sm:p-8"
    >
      <h3 id="impact-destinations-title" className="text-h4">
        {t('impact.numbers.destinations.title')}
      </h3>
      <p className="mt-1 text-small text-blue-4">{note}</p>

      <ul role="list" className="mt-6 flex flex-col gap-4">
        {destinations.map((destination) => (
          <li key={destination.type}>
            <div className="flex justify-between gap-4 text-body">
              <span>
                {t(`impact.numbers.destinations.types.${destination.type}`)}
              </span>
              <span className="text-strong">{destination.percentage}%</span>
            </div>
            <div
              aria-hidden="true"
              className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-2/50"
            >
              <div
                className={`h-full rounded-full ${typeColors[destination.type]}`}
                style={{ width: `${destination.percentage}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <TextLink to="/entidades">
          {t('impact.numbers.destinations.link')}
        </TextLink>
      </div>
    </article>
  )
}
