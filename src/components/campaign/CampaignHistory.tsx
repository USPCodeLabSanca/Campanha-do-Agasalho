import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getMilestones } from '../../services/timeline'
import type { Milestone } from '../../types/milestone'
import { getTranslatedText } from '../../utils/getTranslatedText'
import { sortMilestones } from '../../utils/sortMilestones'

import floqParty from '../../assets/images/floq_party.svg'

export function CampaignHistory() {
  const { t, i18n } = useTranslation()
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const language = i18n.resolvedLanguage

  useEffect(() => {
    getMilestones().then((data) => setMilestones(sortMilestones(data)))
  }, [])

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
                <li key={milestone.id} className="flex items-start gap-6">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-4 shrink-0 rounded-full bg-orange-1"
                  />
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-h4 text-orange-1">
                        {milestone.year}
                      </span>
                      <h3 className="text-h4">
                        {getTranslatedText(milestone.title, language)}
                      </h3>
                    </div>
                    <p className="mt-1 text-body">
                      {getTranslatedText(milestone.description, language)}
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
