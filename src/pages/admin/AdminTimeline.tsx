import { useCallback, useEffect, useState } from 'react'

import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminListItem } from '../../components/admin/AdminListItem'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'
import { AdminToast } from '../../components/admin/AdminToast'
import { MilestoneForm } from '../../components/admin/timeline/MilestoneForm'

import {
  createMilestone,
  deleteMilestone,
  getMilestones,
  updateMilestone,
} from '../../services/timeline'
import type { Milestone, MilestoneInput } from '../../types/milestone'
import { sortMilestones } from '../../utils/sortMilestones'

type Editing = Milestone | 'new' | null

export function AdminTimeline() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editing, setEditing] = useState<Editing>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deleting, setDeleting] = useState<Milestone | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    getMilestones().then((data) => {
      setMilestones(sortMilestones(data))
      setIsLoading(false)
    })
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  async function handleSave(input: MilestoneInput) {
    setIsSaving(true)

    if (editing === 'new') {
      const created = await createMilestone(input)
      setMilestones((prev) => sortMilestones([...prev, created]))
      setToast('Marco adicionado')
    } else if (editing) {
      const updated = await updateMilestone(editing.id, input)
      setMilestones((prev) =>
        sortMilestones(
          prev.map((item) => (item.id === updated.id ? updated : item)),
        ),
      )
      setToast('Alterações salvas')
    }

    setIsSaving(false)
    setEditing(null)
  }

  async function handleDelete() {
    if (!deleting) return

    await deleteMilestone(deleting.id)
    setMilestones((prev) => prev.filter((item) => item.id !== deleting.id))
    setDeleting(null)
    setToast('Marco excluído')
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Linha do tempo"
        description='Os marcos da seção "Nossa história", na página Campanha.'
        addLabel="Adicionar marco"
        onAdd={() => setEditing('new')}
      />

      {isLoading && <p className="text-body">Carregando...</p>}

      {!isLoading && milestones.length === 0 && (
        <p className="text-body">Nenhum marco cadastrado ainda.</p>
      )}

      {milestones.length > 0 && (
        <ul className="flex flex-col gap-3">
          {milestones.map((milestone) => (
            <AdminListItem
              key={milestone.id}
              title={`${milestone.year} · ${milestone.title.pt}`}
              details={milestone.description.pt}
              onEdit={() => setEditing(milestone)}
              onDelete={() => setDeleting(milestone)}
            />
          ))}
        </ul>
      )}

      {editing && (
        <MilestoneForm
          milestone={editing === 'new' ? undefined : editing}
          isSaving={isSaving}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Excluir marco?"
          message={`"${deleting.year} · ${deleting.title.pt}" vai sair da página Campanha. Isso não pode ser desfeito.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}

      {toast && <AdminToast message={toast} onHide={hideToast} />}
    </div>
  )
}
