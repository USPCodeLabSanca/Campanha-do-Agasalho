import { useTranslation } from 'react-i18next'

import { StepCard } from '../StepCard'

const steps = [
  {
    titleKey: 'entities.path.steps.sorting.title',
    descriptionKey: 'entities.path.steps.sorting.description',
  },
  {
    titleKey: 'entities.path.steps.division.title',
    descriptionKey: 'entities.path.steps.division.description',
  },
  {
    titleKey: 'entities.path.steps.delivery.title',
    descriptionKey: 'entities.path.steps.delivery.description',
  },
  {
    titleKey: 'entities.path.steps.families.title',
    descriptionKey: 'entities.path.steps.families.description',
  },
] as const

export function EntitiesPath() {
  const { t } = useTranslation()

  return (
    <section
      className="bg-white section-spacing"
      aria-labelledby="entities-path-title"
    >
      <div className="page-container">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="entities-path-title" className="text-h2">
              {t('entities.path.title')}
            </h2>
          </div>
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
                variant="purple"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
