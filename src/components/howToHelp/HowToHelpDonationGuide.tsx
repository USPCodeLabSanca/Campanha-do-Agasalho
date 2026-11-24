import { useTranslation } from 'react-i18next'

import { Button } from '../Button'

import floqBoxClothes from '../../assets/images/floq_box_clothes.svg'

const items = [
  'coats',
  'sweatshirts',
  'pants',
  'socks',
  'blankets',
  'shoes',
  'hatsAndGloves',
  'kidsClothes',
] as const

const tips = ['clean', 'goodCondition', 'pairs', 'closedBags'] as const

export function HowToHelpDonationGuide() {
  const { t } = useTranslation()

  return (
    <section className="bg-green-3 section-spacing">
      <div className="page-container grid gap-12 md:grid-cols-2">
        <div className="flex flex-col">
          <h2 className="text-h2">{t('howToHelp.whatToDonate.title')}</h2>
          <p className="mt-2 text-body">
            {t('howToHelp.whatToDonate.subtitle')}
          </p>
          <ul role="list" className="mt-6 flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-green-1 bg-white px-4 py-1 text-strong"
              >
                {t(`howToHelp.whatToDonate.items.${item}`)}
              </li>
            ))}
          </ul>
          <img
            src={floqBoxClothes}
            alt=""
            className="m-auto hidden h-64 w-auto md:block"
          />
        </div>

        <div>
          <h2 className="text-h2">{t('howToHelp.beforeDelivery.title')}</h2>
          <p className="mt-2 text-body">
            {t('howToHelp.beforeDelivery.subtitle')}
          </p>
          <ul role="list" className="mt-6 flex flex-col gap-4">
            {tips.map((tip) => (
              <li key={tip} className="card border-green-1/40 p-5">
                <h3 className="text-strong">
                  {t(`howToHelp.beforeDelivery.tips.${tip}.title`)}
                </h3>
                <p className="mt-1 text-body">
                  {t(`howToHelp.beforeDelivery.tips.${tip}.description`)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button variant="green" to="/pontos-coleta">
              {t('howToHelp.beforeDelivery.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
