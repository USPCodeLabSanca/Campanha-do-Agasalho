import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { TextField } from '../form/TextField'
import { BilingualField } from '../form/BilingualField'

import { MAX_YEAR, MIN_YEAR } from '../../../constants/years'
import type { Milestone, MilestoneInput } from '../../../types/milestone'
import type { TranslatedText } from '../../../types/translatedText'

type MilestoneFormProps = {
  milestone?: Milestone
  isSaving: boolean
  onSave: (input: MilestoneInput) => void
  onClose: () => void
}

function trimText(text: TranslatedText): TranslatedText {
  return { pt: text.pt.trim(), en: text.en.trim() }
}

export function MilestoneForm({
  milestone,
  isSaving,
  onSave,
  onClose,
}: MilestoneFormProps) {
  const [yearText, setYearText] = useState(
    milestone ? String(milestone.year) : '',
  )
  const [title, setTitle] = useState<TranslatedText>(
    milestone?.title ?? { pt: '', en: '' },
  )
  const [description, setDescription] = useState<TranslatedText>(
    milestone?.description ?? { pt: '', en: '' },
  )

  function handleSubmit() {
    onSave({
      year: Number(yearText),
      title: trimText(title),
      description: trimText(description),
    })
  }

  return (
    <AdminDrawer
      title={milestone ? 'Editar marco' : 'Adicionar marco'}
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        label="Ano"
        type="number"
        value={yearText}
        onChange={setYearText}
        min={MIN_YEAR}
        max={MAX_YEAR}
        required
      />
      <BilingualField
        label="Título"
        value={title}
        onChange={setTitle}
        required
      />
      <BilingualField
        label="Descrição"
        value={description}
        onChange={setDescription}
        required
        multiline
      />
    </AdminDrawer>
  )
}
