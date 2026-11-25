import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { BilingualField } from '../form/BilingualField'
import { SelectField } from '../form/SelectField'
import { CheckboxField } from '../form/CheckboxField'

import { MASCOTS, MASCOT_KEYS } from '../../../constants/participate'
import type {
  MascotKey,
  Nucleus,
  NucleusInput,
} from '../../../types/participate'
import type { TranslatedText } from '../../../types/translatedText'

type NucleusFormProps = {
  nucleus: Nucleus
  isSaving: boolean
  onSave: (input: NucleusInput) => void
  onClose: () => void
}

const mascotOptions = MASCOT_KEYS.map((key) => ({
  value: key,
  label: MASCOTS[key].label,
}))

function trimText(text: TranslatedText): TranslatedText {
  return { pt: text.pt.trim(), en: text.en.trim() }
}

export function NucleusForm({
  nucleus,
  isSaving,
  onSave,
  onClose,
}: NucleusFormProps) {
  const [values, setValues] = useState<NucleusInput>(nucleus)

  function updateField<Key extends keyof NucleusInput>(
    key: Key,
    value: NucleusInput[Key],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit() {
    onSave({
      name: trimText(values.name),
      description: trimText(values.description),
      mascot: values.mascot,
      isActive: values.isActive,
    })
  }

  return (
    <AdminDrawer
      title={`Editar núcleo: ${nucleus.name.pt}`}
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <BilingualField
        label="Nome"
        value={values.name}
        onChange={(value) => updateField('name', value)}
        required
      />
      <BilingualField
        label="Descrição"
        value={values.description}
        onChange={(value) => updateField('description', value)}
        required
        multiline
      />

      <div className="flex items-end gap-4">
        <img
          src={MASCOTS[values.mascot].src}
          alt=""
          className="h-20 w-20 shrink-0 object-contain"
        />
        <div className="flex-1">
          <SelectField
            label="Mascote do núcleo"
            value={values.mascot}
            options={mascotOptions}
            onChange={(value) => updateField('mascot', value as MascotKey)}
          />
        </div>
      </div>

      <CheckboxField
        label="Mostrar no site"
        checked={values.isActive}
        onChange={(checked) => updateField('isActive', checked)}
        help="Desmarque para esconder o núcleo da página Participe"
      />
    </AdminDrawer>
  )
}
