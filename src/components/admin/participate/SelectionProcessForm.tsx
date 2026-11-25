import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { TextField } from '../form/TextField'
import { BilingualField } from '../form/BilingualField'

import type { SelectionProcess } from '../../../types/participate'
import type { TranslatedText } from '../../../types/translatedText'

type SelectionProcessFormProps = {
  selection: SelectionProcess
  isSaving: boolean
  onSave: (input: SelectionProcess) => void
  onClose: () => void
}

function trimText(text: TranslatedText): TranslatedText {
  return { pt: text.pt.trim(), en: text.en.trim() }
}

export function SelectionProcessForm({
  selection,
  isSaving,
  onSave,
  onClose,
}: SelectionProcessFormProps) {
  const [values, setValues] = useState<SelectionProcess>(selection)

  function updateField<Key extends keyof SelectionProcess>(
    key: Key,
    value: SelectionProcess[Key],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit() {
    onSave({
      isOpen: selection.isOpen,
      formUrl: values.formUrl.trim(),
      deadline: values.deadline,
      openMessage: trimText(values.openMessage),
      closedMessage: trimText(values.closedMessage),
    })
  }

  return (
    <AdminDrawer
      title="Editar inscrições"
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        label="Link do formulário de inscrição"
        type="url"
        value={values.formUrl}
        onChange={(value) => updateField('formUrl', value)}
        required={selection.isOpen}
        help="O link do Google Forms, começando com https://. É para onde o botão de inscrição leva."
      />
      <TextField
        label="Inscrições até"
        type="date"
        value={values.deadline}
        onChange={(value) => updateField('deadline', value)}
        help='Opcional. Aparece no site como "Inscrições até 15 de março".'
      />

      <BilingualField
        label="Mensagem com inscrições abertas"
        value={values.openMessage}
        onChange={(value) => updateField('openMessage', value)}
        required
        multiline
      />
      <BilingualField
        label="Mensagem com inscrições fechadas"
        value={values.closedMessage}
        onChange={(value) => updateField('closedMessage', value)}
        required
        multiline
      />
    </AdminDrawer>
  )
}
