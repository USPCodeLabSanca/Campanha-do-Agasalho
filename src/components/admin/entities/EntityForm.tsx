import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { TextField } from '../form/TextField'
import { BilingualField } from '../form/BilingualField'
import { CheckboxField } from '../form/CheckboxField'

import type { Entity, EntityInput } from '../../../types/entity'
import type { TranslatedText } from '../../../types/translatedText'

type EntityFormProps = {
  entity?: Entity
  isSaving: boolean
  onSave: (input: EntityInput) => void
  onClose: () => void
}

const emptyEntity: EntityInput = {
  name: '',
  neighborhood: '',
  targetAudience: { pt: '', en: '' },
  contribution: { pt: '', en: '' },
  isActive: true,
}

function trimText(text: TranslatedText): TranslatedText {
  return { pt: text.pt.trim(), en: text.en.trim() }
}

export function EntityForm({
  entity,
  isSaving,
  onSave,
  onClose,
}: EntityFormProps) {
  const [values, setValues] = useState<EntityInput>(entity ?? emptyEntity)

  function updateField<Key extends keyof EntityInput>(
    key: Key,
    value: EntityInput[Key],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit() {
    onSave({
      name: values.name.trim(),
      neighborhood: values.neighborhood.trim(),
      targetAudience: trimText(values.targetAudience),
      contribution: trimText(values.contribution),
      isActive: values.isActive,
    })
  }

  return (
    <AdminDrawer
      title={entity ? 'Editar entidade' : 'Adicionar entidade'}
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
      <TextField
        label="Bairro"
        value={values.neighborhood}
        onChange={(value) => updateField('neighborhood', value)}
      />
      <BilingualField
        label="Público atendido"
        value={values.targetAudience}
        onChange={(value) => updateField('targetAudience', value)}
      />
      <BilingualField
        label="Como contribuímos"
        value={values.contribution}
        onChange={(value) => updateField('contribution', value)}
        multiline
      />
      <CheckboxField
        label="Mostrar no site"
        checked={values.isActive}
        onChange={(checked) => updateField('isActive', checked)}
        help="Desmarque para esconder a entidade sem precisar excluir"
      />
    </AdminDrawer>
  )
}
