import { useCallback, useEffect, useState } from 'react'

import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminSearch } from '../../components/admin/AdminSearch'
import { AdminFilterChip } from '../../components/admin/AdminFilterChip'
import { AdminListItem } from '../../components/admin/AdminListItem'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'
import { AdminToast } from '../../components/admin/AdminToast'
import { CollectionPointForm } from '../../components/admin/collectionPoints/CollectionPointForm'

import {
  createCollectionPoint,
  deleteCollectionPoint,
  getCollectionPoints,
  updateCollectionPoint,
} from '../../services/collectionPoints'
import type {
  CollectionPoint,
  CollectionPointInput,
} from '../../types/collectionPoint'

type Editing = CollectionPoint | 'new' | null

export function AdminCollectionPoints() {
  const [points, setPoints] = useState<CollectionPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [onlyActive, setOnlyActive] = useState(false)
  const [editing, setEditing] = useState<Editing>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deleting, setDeleting] = useState<CollectionPoint | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    getCollectionPoints().then((data) => {
      setPoints(data)
      setIsLoading(false)
    })
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  async function handleSave(input: CollectionPointInput) {
    setIsSaving(true)

    if (editing === 'new') {
      const created = await createCollectionPoint(input)
      setPoints((prev) => [...prev, created])
      setToast('Ponto de coleta adicionado')
    } else if (editing) {
      const updated = await updateCollectionPoint(editing.id, input)
      setPoints((prev) =>
        prev.map((point) => (point.id === updated.id ? updated : point)),
      )
      setToast('Alterações salvas')
    }

    setIsSaving(false)
    setEditing(null)
  }

  async function handleDelete() {
    if (!deleting) return

    await deleteCollectionPoint(deleting.id)
    setPoints((prev) => prev.filter((point) => point.id !== deleting.id))
    setDeleting(null)
    setToast('Ponto de coleta excluído')
  }

  const activeCount = points.filter((point) => point.isActive).length

  const searchText = search.trim().toLowerCase()
  const visiblePoints = points.filter((point) => {
    if (onlyActive && !point.isActive) return false

    const text = `${point.name} ${point.address}`.toLowerCase()
    return text.includes(searchText)
  })

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Pontos de coleta"
        description="Locais onde as pessoas podem deixar as doações."
        onAdd={() => setEditing('new')}
      />

      <div className="flex flex-wrap items-center gap-3">
        <AdminSearch
          label="Buscar por nome ou endereço"
          value={search}
          onChange={setSearch}
        />
        <AdminFilterChip
          label="Ativos"
          count={activeCount}
          isActive={onlyActive}
          onToggle={() => setOnlyActive((prev) => !prev)}
        />
      </div>

      {isLoading && <p className="text-body">Carregando...</p>}

      {!isLoading && points.length === 0 && (
        <p className="text-body">Nenhum ponto de coleta cadastrado ainda.</p>
      )}

      {!isLoading && points.length > 0 && visiblePoints.length === 0 && (
        <p className="text-body">Nenhum ponto de coleta encontrado.</p>
      )}

      {visiblePoints.length > 0 && (
        <ul className="flex flex-col gap-3">
          {visiblePoints.map((point) => (
            <AdminListItem
              key={point.id}
              title={point.name}
              details={[point.address, point.hours].filter(Boolean).join(' · ')}
              status={{
                label: point.isActive ? 'No site' : 'Escondido',
                isPositive: point.isActive,
              }}
              onEdit={() => setEditing(point)}
              onDelete={() => setDeleting(point)}
            />
          ))}
        </ul>
      )}

      {editing && (
        <CollectionPointForm
          point={editing === 'new' ? undefined : editing}
          isSaving={isSaving}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Excluir ponto de coleta?"
          message={`"${deleting.name}" vai sair do site. Isso não pode ser desfeito.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}

      {toast && <AdminToast message={toast} onHide={hideToast} />}
    </div>
  )
}
