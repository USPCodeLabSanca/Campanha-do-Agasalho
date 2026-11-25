import { useCallback, useEffect, useState } from 'react'

import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminListItem } from '../../components/admin/AdminListItem'
import { AdminToast } from '../../components/admin/AdminToast'
import { NucleusForm } from '../../components/admin/participate/NucleusForm'
import { SelectionProcessCard } from '../../components/admin/participate/SelectionProcessCard'
import { SelectionProcessForm } from '../../components/admin/participate/SelectionProcessForm'

import {
  getNuclei,
  getSelectionProcess,
  updateNucleus,
  updateSelectionProcess,
} from '../../services/participate'
import type {
  Nucleus,
  NucleusInput,
  SelectionProcess,
} from '../../types/participate'

export function AdminParticipate() {
  const [nuclei, setNuclei] = useState<Nucleus[]>([])
  const [selection, setSelection] = useState<SelectionProcess | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [editingNucleus, setEditingNucleus] = useState<Nucleus | null>(null)
  const [isEditingSelection, setIsEditingSelection] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([getNuclei(), getSelectionProcess()]).then(
      ([nucleiData, selectionData]) => {
        setNuclei(nucleiData)
        setSelection(selectionData)
        setIsLoading(false)
      },
    )
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  async function handleSaveNucleus(input: NucleusInput) {
    if (!editingNucleus) return
    setIsSaving(true)

    const updated = await updateNucleus(editingNucleus.id, input)
    setNuclei((prev) =>
      prev.map((nucleus) => (nucleus.id === updated.id ? updated : nucleus)),
    )

    setIsSaving(false)
    setEditingNucleus(null)
    setToast('Alterações salvas')
  }

  async function handleSaveSelection(input: SelectionProcess) {
    setIsSaving(true)

    const updated = await updateSelectionProcess(input)
    setSelection(updated)

    setIsSaving(false)
    setIsEditingSelection(false)
    setToast('Alterações salvas')
  }

  async function handleToggleSelection() {
    if (!selection) return
    setIsToggling(true)

    const updated = await updateSelectionProcess({
      ...selection,
      isOpen: !selection.isOpen,
    })
    setSelection(updated)

    setIsToggling(false)
    setToast(updated.isOpen ? 'Inscrições abertas' : 'Inscrições fechadas')
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Participe"
        description="As inscrições e os núcleos da campanha, que aparecem na página Participe."
      />

      {isLoading && <p className="text-body">Carregando...</p>}

      {!isLoading && selection && (
        <SelectionProcessCard
          selection={selection}
          isToggling={isToggling}
          onToggle={handleToggleSelection}
          onEdit={() => setIsEditingSelection(true)}
        />
      )}

      {!isLoading && nuclei.length === 0 && (
        <p className="text-body">Nenhum núcleo cadastrado.</p>
      )}

      {nuclei.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-h4">Núcleos</h2>

          <ul className="flex flex-col gap-3">
            {nuclei.map((nucleus) => (
              <AdminListItem
                key={nucleus.id}
                title={nucleus.name.pt}
                details={nucleus.description.pt}
                status={{
                  label: nucleus.isActive ? 'No site' : 'Escondido',
                  isPositive: nucleus.isActive,
                }}
                onEdit={() => setEditingNucleus(nucleus)}
              />
            ))}
          </ul>
        </section>
      )}

      {editingNucleus && (
        <NucleusForm
          nucleus={editingNucleus}
          isSaving={isSaving}
          onSave={handleSaveNucleus}
          onClose={() => setEditingNucleus(null)}
        />
      )}

      {isEditingSelection && selection && (
        <SelectionProcessForm
          selection={selection}
          isSaving={isSaving}
          onSave={handleSaveSelection}
          onClose={() => setIsEditingSelection(false)}
        />
      )}

      {toast && <AdminToast message={toast} onHide={hideToast} />}
    </div>
  )
}
