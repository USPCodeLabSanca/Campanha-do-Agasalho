import { useTranslation } from 'react-i18next'

import type { SizeMeasurement } from '../../types/product'

type SizeGuideProps = {
  measurements: SizeMeasurement[]
}

export function SizeGuide({ measurements }: SizeGuideProps) {
  const { t } = useTranslation()

  return (
    <table className="w-full text-center text-small tabular-nums">
      <caption className="mb-2 text-left text-caption text-blue-4">
        {t('shop.dialog.sizeGuide.caption')}
      </caption>
      <thead>
        <tr className="bg-green-3">
          <th scope="col" className="px-2 py-1.5">
            {t('shop.dialog.size')}
          </th>
          <th scope="col" className="px-2 py-1.5">
            {t('shop.dialog.sizeGuide.width')}
          </th>
          <th scope="col" className="px-2 py-1.5">
            {t('shop.dialog.sizeGuide.length')}
          </th>
        </tr>
      </thead>
      <tbody>
        {measurements.map((measurement) => (
          <tr key={measurement.size} className="border-b border-green-2">
            <th scope="row" className="px-2 py-1.5">
              {measurement.size}
            </th>
            <td className="px-2 py-1.5">{measurement.width}</td>
            <td className="px-2 py-1.5">{measurement.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
