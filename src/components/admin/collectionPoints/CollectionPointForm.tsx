import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { TextField } from '../form/TextField'
import { CheckboxField } from '../form/CheckboxField'

import type {
  CollectionPoint,
  CollectionPointInput,
} from '../../../types/collectionPoint'

type CollectionPointFormProps = {
  point?: CollectionPoint
  isSaving: boolean
  onSave: (input: CollectionPointInput) => void
  onClose: () => void
}

const emptyPoint: CollectionPointInput = {
  name: '',
  address: '',
  hours: '',
  isActive: true,
}

export function CollectionPointForm({
  point,
  isSaving,
  onSave,
  onClose,
}: CollectionPointFormProps) {
  const [values, setValues] = useState<CollectionPointInput>(
    point ?? emptyPoint,
  )

  function updateField<Key extends keyof CollectionPointInput>(
    key: Key,
    value: CollectionPointInput[Key],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit() {
    onSave({
      name: values.name.trim(),
      address: values.address.trim(),
      hours: values.hours.trim(),
      isActive: values.isActive,
    })
  }

  return (
    <AdminDrawer
      title={point ? 'Editar ponto de coleta' : 'Adicionar ponto de coleta'}
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        label="Nome do local"
        value={values.name}
        onChange={(value) => updateField('name', value)}
        required
      />
      <TextField
        label="Endereço"
        value={values.address}
        onChange={(value) => updateField('address', value)}
      />
      <TextField
        label="Horário"
        value={values.hours}
        onChange={(value) => updateField('hours', value)}
        help="Ex.: Seg a sex, 8h às 22h"
      />
      <CheckboxField
        label="Mostrar no site"
        checked={values.isActive}
        onChange={(checked) => updateField('isActive', checked)}
        help="Desmarque para esconder o ponto sem precisar excluir"
      />
    </AdminDrawer>
  )
}
