import { useTranslation } from 'react-i18next'

import { StepCard } from '../StepCard'
import { TextLink } from '../TextLink'

const steps = [
  {
    titleKey: 'home.howItWorks.steps.donate.title',
    descriptionKey: 'home.howItWorks.steps.donate.description',
  },
  {
    titleKey: 'home.howItWorks.steps.collect.title',
    descriptionKey: 'home.howItWorks.steps.collect.description',
  },
  {
    titleKey: 'home.howItWorks.steps.sorting.title',
    descriptionKey: 'home.howItWorks.steps.sorting.description',
  },
  {
    titleKey: 'home.howItWorks.steps.delivery.title',
    descriptionKey: 'home.howItWorks.steps.delivery.description',
  },
] as const

export function HomeHowItWorks() {
  const { t } = useTranslation()

  return (
    <section
      className="bg-orange-3 section-spacing"
      aria-labelledby="how-it-works-title"
    >
      <div className="page-container">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="how-it-works-title" className="text-h2">
              {t('home.howItWorks.title')}
            </h2>
            <p className="mt-2 text-body">{t('home.howItWorks.subtitle')}</p>
          </div>
          <TextLink to="/campanha#como-funciona">
            {t('home.howItWorks.button')}
          </TextLink>
        </div>
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
