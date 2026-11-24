import { useTranslation } from 'react-i18next'

import floqHeartHands from '../../assets/images/floq_heart_hands.svg'

export function ImpactTestimonial() {
  const { t } = useTranslation()

  return (
    <figure className="mt-12 grid items-center gap-6 card p-8 md:grid-cols-[auto_1fr] md:px-12 md:py-10">
      <img
        src={floqHeartHands}
        alt=""
        className="h-32 w-auto justify-self-center"
      />
      <div>
        <blockquote className="text-h4 sm:text-h3">
          <p>“{t('impact.testimonial.quote')}”</p>
        </blockquote>
        <figcaption className="mt-4">
          <p className="text-strong">{t('impact.testimonial.name')}</p>
          <p className="text-small text-blue-4">
            {t('impact.testimonial.organization')}
          </p>
        </figcaption>
      </div>
    </figure>
  )
}
