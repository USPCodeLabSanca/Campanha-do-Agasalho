import { useCallback, useEffect, useState } from 'react'

import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminSearch } from '../../components/admin/AdminSearch'
import { AdminFilterChip } from '../../components/admin/AdminFilterChip'
import { AdminListItem } from '../../components/admin/AdminListItem'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'
import { AdminToast } from '../../components/admin/AdminToast'
import { EntityForm } from '../../components/admin/entities/EntityForm'

import {
  createEntity,
  deleteEntity,
  getEntities,
  updateEntity,
} from '../../services/entities'
import type { Entity, EntityInput } from '../../types/entity'

type Editing = Entity | 'new' | null

export function AdminEntities() {
  const [entities, setEntities] = useState<Entity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [onlyActive, setOnlyActive] = useState(false)
  const [editing, setEditing] = useState<Editing>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deleting, setDeleting] = useState<Entity | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    getEntities().then((data) => {
      setEntities(data)
      setIsLoading(false)
    })
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  async function handleSave(input: EntityInput) {
    setIsSaving(true)

    if (editing === 'new') {
      const created = await createEntity(input)
      setEntities((prev) => [...prev, created])
      setToast('Entidade adicionada')
    } else if (editing) {
      const updated = await updateEntity(editing.id, input)
      setEntities((prev) =>
        prev.map((entity) => (entity.id === updated.id ? updated : entity)),
      )
      setToast('Alterações salvas')
    }

    setIsSaving(false)
    setEditing(null)
  }

  async function handleDelete() {
    if (!deleting) return

    await deleteEntity(deleting.id)
    setEntities((prev) => prev.filter((entity) => entity.id !== deleting.id))
    setDeleting(null)
    setToast('Entidade excluída')
  }

  const activeCount = entities.filter((entity) => entity.isActive).length

  const searchText = search.trim().toLowerCase()
  const visibleEntities = entities.filter((entity) => {
    if (onlyActive && !entity.isActive) return false

    const text = `${entity.name} ${entity.neighborhood}`.toLowerCase()
    return text.includes(searchText)
  })

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Entidades"
        description="Instituições que recebem as doações da campanha."
        onAdd={() => setEditing('new')}
      />

      <div className="flex flex-wrap items-center gap-3">
        <AdminSearch
          label="Buscar por nome ou bairro"
          value={search}
          onChange={setSearch}
        />
        <AdminFilterChip
          label="Ativas"
          count={activeCount}
          isActive={onlyActive}
          onToggle={() => setOnlyActive((prev) => !prev)}
        />
      </div>

      {isLoading && <p className="text-body">Carregando...</p>}

      {!isLoading && entities.length === 0 && (
        <p className="text-body">Nenhuma entidade cadastrada ainda.</p>
      )}

      {!isLoading && entities.length > 0 && visibleEntities.length === 0 && (
        <p className="text-body">Nenhuma entidade encontrada.</p>
      )}

      {visibleEntities.length > 0 && (
        <ul className="flex flex-col gap-3">
          {visibleEntities.map((entity) => (
            <AdminListItem
              key={entity.id}
              title={entity.name}
              details={[entity.neighborhood, entity.targetAudience.pt]
                .filter(Boolean)
                .join(' · ')}
              status={{
                label: entity.isActive ? 'No site' : 'Escondida',
                isPositive: entity.isActive,
              }}
              onEdit={() => setEditing(entity)}
              onDelete={() => setDeleting(entity)}
            />
          ))}
        </ul>
      )}

      {editing && (
        <EntityForm
          entity={editing === 'new' ? undefined : editing}
          isSaving={isSaving}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Excluir entidade?"
          message={`"${deleting.name}" vai sair do site. Isso não pode ser desfeito.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}

      {toast && <AdminToast message={toast} onHide={hideToast} />}
    </div>
  )
}
