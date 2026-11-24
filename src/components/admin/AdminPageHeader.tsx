import { PlusIcon } from '@phosphor-icons/react'

import { Button } from '../Button'

type AdminPageHeaderProps = {
  title: string
  description?: string
  addLabel?: string
  onAdd?: () => void
}

export function AdminPageHeader({
  title,
  description,
  addLabel = 'Adicionar',
  onAdd,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-h2">{title}</h1>
        {description && <p className="text-body text-blue-4">{description}</p>}
      </div>

      {onAdd && (
        <Button
          variant="dark"
          size="small"
          onClick={onAdd}
          rightIcon={<PlusIcon size={18} />}
        >
          {addLabel}
        </Button>
      )}
    </div>
  )
}
