import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react'

type AdminListItemProps = {
  title: string
  details?: string
  status?: {
    label: string
    isPositive: boolean
  }
  onEdit: () => void
  onDelete: () => void
}

const iconButtonClasses =
  'cursor-pointer rounded-full p-2 transition hover:bg-background'

export function AdminListItem({
  title,
  details,
  status,
  onEdit,
  onDelete,
}: AdminListItemProps) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-gray-2 bg-white p-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-strong">{title}</p>
        {details && <p className="text-small text-blue-4">{details}</p>}
      </div>

      {status && (
        <span
          className={`hidden rounded-full px-3 py-0.5 text-caption font-bold sm:inline ${
            status.isPositive
              ? 'bg-green-3 text-blue-1'
              : 'bg-background text-blue-4'
          }`}
        >
          {status.label}
        </span>
      )}

      <div className="flex gap-1">
        <button
          type="button"
          className={iconButtonClasses}
          aria-label={`Editar ${title}`}
          onClick={onEdit}
        >
          <PencilSimpleIcon size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${iconButtonClasses} text-pink-1`}
          aria-label={`Excluir ${title}`}
          onClick={onDelete}
        >
          <TrashIcon size={20} aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
