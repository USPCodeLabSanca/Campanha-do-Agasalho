import { useState } from 'react'
import type { SelectionProcess } from '../../../types/participate'
import { AdminFormModal, FormField, inputClasses } from './AdminFormModal'

type SelectionProcessFormProps = {
  selection: SelectionProcess
  isSaving: boolean
  onSave: (input: SelectionProcess) => void
  onClose: () => void
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function SelectionProcessForm({
  selection,
  isSaving,
  onSave,
  onClose,
}: SelectionProcessFormProps) {
  const [formUrl, setFormUrl] = useState(selection.formUrl)
  const [messagePt, setMessagePt] = useState(selection.closedMessage.pt)
  const [messageEn, setMessageEn] = useState(selection.closedMessage.en)
  const [showErrors, setShowErrors] = useState(false)

  const urlError =
    formUrl.trim() && !isValidUrl(formUrl.trim())
      ? 'Use um link completo, começando com https://'
      : undefined
  const messageError = !messagePt.trim()
    ? 'Informe a mensagem em português.'
    : undefined

  function handleSubmit() {
    if (urlError || messageError) {
      setShowErrors(true)
      return
    }

    onSave({
      isOpen: selection.isOpen,
      formUrl: formUrl.trim(),
      closedMessage: { pt: messagePt.trim(), en: messageEn.trim() },
    })
  }

  return (
    <AdminFormModal
      title="Editar processo seletivo"
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <FormField
        label="Link do formulário de inscrição"
        hint="Para onde o botão de inscrição leva quando as inscrições estão abertas."
        error={showErrors ? urlError : undefined}
      >
        <input
          type="url"
          className={inputClasses}
          value={formUrl}
          placeholder="https://"
          onChange={(e) => setFormUrl(e.target.value)}
        />
      </FormField>

      <FormField
        label="Mensagem com inscrições fechadas (português)"
        error={showErrors ? messageError : undefined}
      >
        <textarea
          rows={4}
          className={inputClasses}
          value={messagePt}
          onChange={(e) => setMessagePt(e.target.value)}
        />
      </FormField>

      <FormField
        label="Mensagem com inscrições fechadas (inglês)"
        hint="Se ficar vazio, o site mostra a mensagem em português."
      >
        <textarea
          rows={4}
          className={inputClasses}
          value={messageEn}
          onChange={(e) => setMessageEn(e.target.value)}
        />
      </FormField>
    </AdminFormModal>
  )
}
