import { useTranslation } from 'react-i18next'

import { StepCard } from '../StepCard'

const steps = [
  {
    titleKey: 'campaign.howItWorks.steps.donate.title',
    descriptionKey: 'campaign.howItWorks.steps.donate.description',
  },
  {
    titleKey: 'campaign.howItWorks.steps.box.title',
    descriptionKey: 'campaign.howItWorks.steps.box.description',
  },
  {
    titleKey: 'campaign.howItWorks.steps.collect.title',
    descriptionKey: 'campaign.howItWorks.steps.collect.description',
  },
  {
    titleKey: 'campaign.howItWorks.steps.storage.title',
    descriptionKey: 'campaign.howItWorks.steps.storage.description',
  },
  {
    titleKey: 'campaign.howItWorks.steps.sorting.title',
    descriptionKey: 'campaign.howItWorks.steps.sorting.description',
  },
  {
    titleKey: 'campaign.howItWorks.steps.entities.title',
    descriptionKey: 'campaign.howItWorks.steps.entities.description',
  },
  {
    titleKey: 'campaign.howItWorks.steps.delivery.title',
    descriptionKey: 'campaign.howItWorks.steps.delivery.description',
  },
] as const

export function CampaignHowItWorks() {
  const { t } = useTranslation()

  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 bg-orange-3 section-spacing"
      aria-labelledby="campaign-how-it-works-title"
    >
      <div className="page-container">
        <h2 id="campaign-how-it-works-title" className="text-h2">
          {t('campaign.howItWorks.title')}
        </h2>
        <p className="mt-2 text-body-lg">{t('campaign.howItWorks.subtitle')}</p>

        <ol
          className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {steps.map((step, index) => (
            <li key={step.titleKey}>
              <StepCard
                step={index + 1}
                title={t(step.titleKey)}
                description={t(step.descriptionKey)}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
