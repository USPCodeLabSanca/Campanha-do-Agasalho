import { useTranslation } from 'react-i18next'

import { ActionCard } from '../ActionCard'

import love from '../../assets/images/love_floq.svg'
import doubt from '../../assets/images/doubt_floq.svg'

const actionCards = [
  {
    titleKey: 'home.getStarted.help.title',
    descriptionKey: 'home.getStarted.help.description',
    image: love,
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
    image: doubt,
    primaryAction: {
      labelKey: 'home.getStarted.campaign.primaryAction',
      to: '/campanha',
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
        <h2 id="get-started-title" className="text-center text-h2">
          {t('home.getStarted.title')}
        </h2>
        <p className="mt-2 text-center text-body">
          {t('home.getStarted.subtitle')}
        </p>
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
