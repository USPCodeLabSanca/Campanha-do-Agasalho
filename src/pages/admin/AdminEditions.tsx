import { useCallback, useEffect, useState } from 'react'

import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminListItem } from '../../components/admin/AdminListItem'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'
import { AdminToast } from '../../components/admin/AdminToast'
import { EditionForm } from '../../components/admin/editions/EditionForm'

import {
  createEdition,
  deleteEdition,
  getEditions,
  updateEdition,
} from '../../services/impact'
import type { Edition } from '../../types/edition'

type Editing = Edition | 'new' | null

function sortByYear(editions: Edition[]) {
  return [...editions].sort((a, b) => b.year - a.year)
}

export function AdminEditions() {
  const [editions, setEditions] = useState<Edition[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editing, setEditing] = useState<Editing>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deleting, setDeleting] = useState<Edition | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    getEditions().then((data) => {
      setEditions(sortByYear(data))
      setIsLoading(false)
    })
  }, [])

  async function reloadEditions() {
    const data = await getEditions()
    setEditions(sortByYear(data))
  }

  const hideToast = useCallback(() => setToast(null), [])

  async function handleSave(edition: Edition) {
    setIsSaving(true)

    if (editing === 'new') {
      await createEdition(edition)
      setToast('Edição adicionada')
    } else if (editing) {
      await updateEdition(editing.year, edition)
      setToast('Alterações salvas')
    }

    await reloadEditions()
    setIsSaving(false)
    setEditing(null)
  }

  async function handleDelete() {
    if (!deleting) return

    await deleteEdition(deleting.year)
    await reloadEditions()
    setDeleting(null)
    setToast('Edição excluída')
  }

  const editingYear = editing && editing !== 'new' ? editing.year : null
  const usedYears = editions
    .map((edition) => edition.year)
    .filter((year) => year !== editingYear)

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Edições e números"
        description="Os números de cada ano, que aparecem na página de Impacto."
        onAdd={() => setEditing('new')}
      />

      {isLoading && <p className="text-body">Carregando...</p>}

      {!isLoading && editions.length === 0 && (
        <p className="text-body">Nenhuma edição cadastrada ainda.</p>
      )}

      {editions.length > 0 && (
        <ul className="flex flex-col gap-3">
          {editions.map((edition) => (
            <AdminListItem
              key={edition.year}
              title={`Edição ${edition.year}`}
              details={`${edition.totalCollected.toLocaleString('pt-BR')} peças · ${edition.volunteers} voluntários`}
              status={{
                label: edition.isOngoing ? 'Em andamento' : 'Encerrada',
                isPositive: edition.isOngoing ?? false,
              }}
              onEdit={() => setEditing(edition)}
              onDelete={() => setDeleting(edition)}
            />
          ))}
        </ul>
      )}

      {editing && (
        <EditionForm
          edition={editing === 'new' ? undefined : editing}
          usedYears={usedYears}
          isSaving={isSaving}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Excluir edição?"
          message={`Os números de ${deleting.year} vão sair da página de Impacto. Isso não pode ser desfeito.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}

      {toast && <AdminToast message={toast} onHide={hideToast} />}
    </div>
  )
}
