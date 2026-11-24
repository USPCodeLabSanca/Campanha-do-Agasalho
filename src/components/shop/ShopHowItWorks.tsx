import { useTranslation } from 'react-i18next'

import { StepCard } from '../StepCard'

import floqShopChoose from '../../assets/images/floq_shop_choose.svg'
import floqShopContact from '../../assets/images/floq_shop_contact.svg'
import floqShopPickup from '../../assets/images/floq_shop_pickup.svg'
import floqShopSize from '../../assets/images/floq_shop_size.svg'

const steps = [
  {
    titleKey: 'shop.howItWorks.steps.choose.title',
    descriptionKey: 'shop.howItWorks.steps.choose.description',
    image: floqShopChoose,
  },
  {
    titleKey: 'shop.howItWorks.steps.size.title',
    descriptionKey: 'shop.howItWorks.steps.size.description',
    image: floqShopSize,
  },
  {
    titleKey: 'shop.howItWorks.steps.contact.title',
    descriptionKey: 'shop.howItWorks.steps.contact.description',
    image: floqShopContact,
  },
  {
    titleKey: 'shop.howItWorks.steps.pickup.title',
    descriptionKey: 'shop.howItWorks.steps.pickup.description',
    image: floqShopPickup,
  },
] as const

export function ShopHowItWorks() {
  const { t } = useTranslation()

  return (
    <section
      className="bg-green-3 section-spacing"
      aria-labelledby="shop-how-it-works-title"
    >
      <div className="page-container">
        <h2 id="shop-how-it-works-title" className="text-h2">
          {t('shop.howItWorks.title')}
        </h2>

        <ol
          role="list"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <li key={step.titleKey}>
              <StepCard
                title={t(step.titleKey)}
                description={t(step.descriptionKey)}
                image={step.image}
                variant="green"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
