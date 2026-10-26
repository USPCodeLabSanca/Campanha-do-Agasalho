import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button'
import { StatCard } from '../StatCard'

import welcomePt from '../../assets/images/floq_welcome_pt.svg'
import welcomeEn from '../../assets/images/floq_welcome_en.svg'
import snowFlake from '../../assets/images/snowflake.svg'
import snowBall from '../../assets/images/snowball.svg'

const FLAKES_COUNT = 65

const infoCards = [
  {
    valueKey: 'home.hero.stats.collectionPoints.value',
    titleKey: 'home.hero.stats.collectionPoints.title',
    subtitleKey: 'home.hero.stats.collectionPoints.subtitle',
  },
  {
    valueKey: 'home.hero.stats.donatedItems.value',
    titleKey: 'home.hero.stats.donatedItems.title',
    subtitleKey: 'home.hero.stats.donatedItems.subtitle',
  },
  {
    valueKey: 'home.hero.stats.entities.value',
    titleKey: 'home.hero.stats.entities.title',
    subtitleKey: 'home.hero.stats.entities.subtitle',
  },
  {
    valueKey: 'home.hero.stats.years.value',
    titleKey: 'home.hero.stats.years.title',
    subtitleKey: 'home.hero.stats.years.subtitle',
  },
] as const

function createFlakes() {
  const flakes = []

  for (let i = 0; i < FLAKES_COUNT; i++) {
    flakes.push({
      top: Math.random() * 100,
      left: Math.random() * 100,
      src: Math.random() < 0.6 ? snowFlake : snowBall,
    })
  }

  return flakes
}

export function HomeHero() {
  const [flakes] = useState(() => createFlakes())

  const { t, i18n } = useTranslation()

  const welcomeImage = i18n.resolvedLanguage === 'en' ? welcomeEn : welcomePt

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-blue-1 to-blue-5 section-spacing text-white"
      aria-labelledby="hero-title"
    >
      {flakes.map((flake, index) => (
        <img
          key={index}
          src={flake.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: `${flake.top}%`, left: `${flake.left}%` }}
        />
      ))}
      <div className="relative page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <h1
            className="text-center text-h2 sm:text-h1 lg:self-end lg:text-left lg:text-display"
            id="hero-title"
          >
            {t('home.hero.title')}{' '}
            <span className="block text-orange-1">
              {t('home.hero.titleHighlight')}
            </span>
          </h1>

          <img
            src={welcomeImage}
            alt={t('home.hero.imageAlt')}
            className="w-3/5 max-w-80 justify-self-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-full lg:max-w-96 lg:self-center"
          />

          <div className="text-center lg:self-start lg:text-left">
            <p className="text-body-lg">{t('home.hero.description')}</p>

            <div className="mt-10 flex justify-center gap-4 lg:justify-start">
              <Button to="/pontos-coleta">{t('home.hero.donate')}</Button>
              <Button variant="outlineLight" to="/participe">
                {t('home.hero.participate')}
              </Button>
            </div>
          </div>
        </div>

        <ul
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4"
          role="list"
        >
          {infoCards.map((card) => (
            <li key={card.titleKey}>
              <StatCard
                value={t(card.valueKey)}
                title={t(card.titleKey)}
                subtitle={t(card.subtitleKey)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
