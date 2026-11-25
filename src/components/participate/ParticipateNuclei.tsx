import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NucleusCard } from './ParticipateNucleusCard'

import { MASCOTS } from '../../constants/participate'
import { getNuclei } from '../../services/participate'
import type { Nucleus } from '../../types/participate'
import { getTranslatedText } from '../../utils/getTranslatedText'

export function ParticipateNuclei() {
  const { t, i18n } = useTranslation()
  const [nuclei, setNuclei] = useState<Nucleus[]>([])
  const language = i18n.resolvedLanguage

  useEffect(() => {
    getNuclei().then((data) => setNuclei(data.filter((item) => item.isActive)))
  }, [])

  return (
    <section className="section-spacing" aria-labelledby="nuclei-title">
      <div className="page-container">
        <h2 id="nuclei-title" className="text-h2">
          {t('participate.nuclei.title')}
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-2" role="list">
          {nuclei.map((nucleus) => (
            <li key={nucleus.id}>
              <NucleusCard
                image={MASCOTS[nucleus.mascot].src}
                title={getTranslatedText(nucleus.name, language)}
                description={getTranslatedText(nucleus.description, language)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
