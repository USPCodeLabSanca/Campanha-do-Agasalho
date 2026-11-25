import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { TextField } from '../form/TextField'
import { SelectField } from '../form/SelectField'
import { BilingualField } from '../form/BilingualField'
import { CheckboxGroupField } from '../form/CheckboxGroupField'
import { CheckboxField } from '../form/CheckboxField'

import {
  CLOTHING_SIZES,
  PRODUCT_CATEGORY_LABELS,
} from '../../../constants/shop'
import type {
  Product,
  ProductCategory,
  ProductInput,
} from '../../../types/product'

type ProductFormProps = {
  product?: Product
  isSaving: boolean
  onSave: (input: ProductInput) => void
  onClose: () => void
}

const emptyProduct: ProductInput = {
  name: '',
  category: 'clothes',
  price: 0,
  description: { pt: '', en: '' },
  sizes: [],
  isSoldOut: false,
}

const categoryOptions = Object.entries(PRODUCT_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label }),
)

export function ProductForm({
  product,
  isSaving,
  onSave,
  onClose,
}: ProductFormProps) {
  const [values, setValues] = useState<ProductInput>(product ?? emptyProduct)
  const [priceText, setPriceText] = useState(
    product ? String(product.price) : '',
  )

  function updateField<Key extends keyof ProductInput>(
    key: Key,
    value: ProductInput[Key],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const isClothing = values.category === 'clothes'

  function handleSubmit() {
    const sizes = values.sizes ?? []

    onSave({
      ...values,
      name: values.name.trim(),
      price: Number(priceText),
      description: {
        pt: values.description.pt.trim(),
        en: values.description.en.trim(),
      },
      sizes: isClothing && sizes.length > 0 ? sizes : undefined,
    })
  }

  return (
    <AdminDrawer
      title={product ? 'Editar produto' : 'Adicionar produto'}
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        label="Nome"
        value={values.name}
        onChange={(value) => updateField('name', value)}
        required
      />
      <SelectField
        label="Categoria"
        value={values.category}
        options={categoryOptions}
        onChange={(value) => updateField('category', value as ProductCategory)}
      />
      <TextField
        label="Preço (R$)"
        type="number"
        step={0.01}
        value={priceText}
        onChange={setPriceText}
        required
      />
      <BilingualField
        label="Descrição"
        value={values.description}
        onChange={(value) => updateField('description', value)}
        required
        multiline
      />
      {isClothing && (
        <CheckboxGroupField
          label="Tamanhos"
          options={CLOTHING_SIZES}
          selected={values.sizes ?? []}
          onChange={(sizes) => updateField('sizes', sizes)}
          help="Deixe todos desmarcados se o produto tiver tamanho único"
        />
      )}
      <CheckboxField
        label="Esgotado"
        checked={values.isSoldOut ?? false}
        onChange={(checked) => updateField('isSoldOut', checked)}
        help="O produto continua no site, mas não dá para adicionar à sacolinha"
      />
    </AdminDrawer>
  )
}
