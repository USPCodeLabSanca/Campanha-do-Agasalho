import { useTranslation } from 'react-i18next'

import floqParty from '../../assets/images/floq_party.svg'

const milestones = [
  {
    yearKey: 'campaign.history.milestones.first.year',
    titleKey: 'campaign.history.milestones.first.title',
    descriptionKey: 'campaign.history.milestones.first.description',
  },
  {
    yearKey: 'campaign.history.milestones.second.year',
    titleKey: 'campaign.history.milestones.second.title',
    descriptionKey: 'campaign.history.milestones.second.description',
  },
  {
    yearKey: 'campaign.history.milestones.third.year',
    titleKey: 'campaign.history.milestones.third.title',
    descriptionKey: 'campaign.history.milestones.third.description',
  },
  {
    yearKey: 'campaign.history.milestones.fourth.year',
    titleKey: 'campaign.history.milestones.fourth.title',
    descriptionKey: 'campaign.history.milestones.fourth.description',
  },
  {
    yearKey: 'campaign.history.milestones.fifth.year',
    titleKey: 'campaign.history.milestones.fifth.title',
    descriptionKey: 'campaign.history.milestones.fifth.description',
  },
] as const

export function CampaignHistory() {
  const { t } = useTranslation()

  return (
    <section
      className="bg-blue-2 section-spacing text-white"
      aria-labelledby="history-title"
    >
      <div className="page-container grid items-center gap-12 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h2 id="history-title" className="text-h2">
              {t('campaign.history.title')}
            </h2>
            <img src={floqParty} alt="" className="h-20 w-auto md:hidden" />
          </div>

          <div className="relative mt-10">
            <span
              aria-hidden="true"
              className="absolute -top-2 -bottom-2 left-2 w-px bg-blue-4"
            />
            <ol role="list" className="relative flex flex-col gap-8">
              {milestones.map((milestone) => (
                <li key={milestone.titleKey} className="flex items-start gap-6">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-4 shrink-0 rounded-full bg-orange-1"
                  />
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-h4 text-orange-1">
                        {t(milestone.yearKey)}
                      </span>
                      <h3 className="text-h4">{t(milestone.titleKey)}</h3>
                    </div>
                    <p className="mt-1 text-body">
                      {t(milestone.descriptionKey)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <img
          src={floqParty}
          alt=""
          className="mx-auto hidden h-80 w-auto md:block"
        />
      </div>
    </section>
  )
}
