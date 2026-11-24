import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PageHero } from '../components/PageHero'
import { BagButton } from '../components/shop/BagButton'
import { BagDrawer } from '../components/shop/BagDrawer'
import { ShopProducts } from '../components/shop/ShopProducts'
import { useBag } from '../hooks/useBag'

import floqDuoShopping from '../assets/images/floq_duo_shopping.svg'

export function Shop() {
  const { t } = useTranslation()
  const bag = useBag()
  const [isBagOpen, setIsBagOpen] = useState(false)

  return (
    <>
      <PageHero
        label={t('nav.shop')}
        title={t('shop.hero.title')}
        description={t('shop.hero.description')}
        image={floqDuoShopping}
        variant="green"
      />
      <div>
        <ShopProducts onAddToBag={bag.addItem} />

        {bag.totalItems > 0 && (
          <BagButton
            count={bag.totalItems}
            onClick={() => setIsBagOpen(true)}
          />
        )}
      </div>

      {isBagOpen && (
        <BagDrawer
          items={bag.items}
          totalPrice={bag.totalPrice}
          onUpdateQuantity={bag.updateQuantity}
          onRemove={bag.removeItem}
          onClear={bag.clearBag}
          onClose={() => setIsBagOpen(false)}
        />
      )}
    </>
  )
}
