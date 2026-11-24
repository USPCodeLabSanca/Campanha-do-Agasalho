import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ImpactNumbersContent } from './ImpactNumbersContent'
import { ImpactTestimonial } from './ImpactTestimonial'

import { getEditions } from '../../services/impact'
import type { Edition } from '../../types/edition'

export function ImpactNumbers() {
  const { t } = useTranslation()
  const [editions, setEditions] = useState<Edition[] | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    getEditions()
      .then((data) => {
        setEditions([...data].sort((a, b) => a.year - b.year))
      })
      .catch(() => {
        setHasError(true)
      })
  }, [])

  function getStatusMessage() {
    if (hasError) return t('impact.numbers.error')
    if (editions === null) return t('impact.numbers.loading')
    if (editions.length === 0) return t('impact.numbers.empty')
    return null
  }

  const statusMessage = getStatusMessage()

  return (
    <section aria-labelledby="impact-numbers-title" className="section-spacing">
      <div className="page-container">
        <h2 id="impact-numbers-title" className="text-h2">
          {t('impact.numbers.title')}
        </h2>
        <p className="mt-2 text-body">{t('impact.numbers.subtitle')}</p>

        {statusMessage || !editions ? (
          <p role="status" className="mt-8 text-body text-blue-4">
            {statusMessage}
          </p>
        ) : (
          <ImpactNumbersContent editions={editions} />
        )}

        <ImpactTestimonial />
      </div>
    </section>
  )
}
