import { useTranslation } from 'react-i18next'

import { Button } from '../Button'

import teamPhoto from '../../assets/images/team.webp'

const teams = [
  'home.join.teams.general',
  'home.join.teams.communications',
  'home.join.teams.entities',
  'home.join.teams.externalRelations',
  'home.join.teams.infrastructure',
] as const

export function HomeJoin() {
  const { t } = useTranslation()

  return (
    <section className="section-spacing" aria-labelledby="join-title">
      <div className="page-container grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 id="join-title" className="text-h2 sm:text-h1">
            {t('home.join.title')}{' '}
            <span className="block underline decoration-orange-1 decoration-4 underline-offset-8 [text-decoration-skip-ink:none]">
              {t('home.join.titleHighlight')}
            </span>
          </h2>
          <p className="mt-6 text-body-lg">{t('home.join.description')}</p>

          <ul role="list" className="mt-6 flex flex-wrap gap-2">
            {teams.map((teamKey) => (
              <li
                key={teamKey}
                className="rounded-full bg-orange-3 px-4 py-1 text-small"
              >
                {t(teamKey)}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button to="/participe">{t('home.join.button')}</Button>
          </div>
        </div>

        <div className="relative">
          <img
            src={teamPhoto}
            alt={t('home.join.photoAlt')}
            className="aspect-4/3 w-full rounded-3xl object-cover"
          />
          <p className="absolute right-2 bottom-2 rounded-full bg-white px-3 py-1 text-small font-semibold shadow-md lg:right-4 lg:bottom-4 lg:px-4 lg:py-2 lg:text-strong">
            {t('home.join.volunteers')}
          </p>
        </div>
      </div>
    </section>
  )
}
