import { useTranslation } from 'react-i18next'

import { ActionCard } from '../ActionCard'

import floqHeartHands from '../../assets/images/floq_heart_hands.svg'
import floqThinking from '../../assets/images/floq_thinking.svg'

const actionCards = [
  {
    titleKey: 'home.getStarted.help.title',
    descriptionKey: 'home.getStarted.help.description',
    image: floqHeartHands,
    primaryAction: {
      labelKey: 'home.getStarted.help.primaryAction',
      to: '/pontos-coleta',
    },
    secondaryAction: {
      labelKey: 'home.getStarted.help.secondaryAction',
      to: '/como-ajudar',
    },
  },
  {
    titleKey: 'home.getStarted.campaign.title',
    descriptionKey: 'home.getStarted.campaign.description',
    image: floqThinking,
    primaryAction: {
      labelKey: 'home.getStarted.campaign.primaryAction',
      to: '/campanha#como-funciona',
    },
    secondaryAction: {
      labelKey: 'home.getStarted.campaign.secondaryAction',
      to: '/impacto',
    },
  },
] as const

export function HomeGetStarted() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="get-started-title" className="section-spacing">
      <div className="page-container">
        <h2 id="get-started-title" className="text-h2">
          {t('home.getStarted.title')}
        </h2>
        <p className="mt-2 text-body">{t('home.getStarted.subtitle')}</p>
        <ul role="list" className="mt-10 grid gap-8 lg:grid-cols-2">
          {actionCards.map((card) => (
            <li key={card.titleKey}>
              <ActionCard
                title={t(card.titleKey)}
                description={t(card.descriptionKey)}
                image={card.image}
                primaryAction={{
                  label: t(card.primaryAction.labelKey),
                  to: card.primaryAction.to,
                }}
                secondaryAction={{
                  label: t(card.secondaryAction.labelKey),
                  to: card.secondaryAction.to,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
