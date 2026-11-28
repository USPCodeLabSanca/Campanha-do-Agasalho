import { useEffect, useRef } from 'react'
import { XIcon } from '@phosphor-icons/react'

import { Button } from '../Button'

type AdminDrawerProps = {
  title: string
  isSaving: boolean
  error?: string | null
  onSubmit: () => void
  onClose: () => void
  children: React.ReactNode
}

export function AdminDrawer({
  title,
  isSaving,
  error,
  onSubmit,
  onClose,
  children,
}: AdminDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [])

  function close() {
    dialogRef.current?.close()
  }

  function handleClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      close()
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="admin-drawer-title"
      onClose={onClose}
      onClick={handleClick}
      className="my-0 mr-0 ml-auto h-dvh max-h-dvh w-full max-w-lg bg-white p-0 text-blue-1 backdrop:bg-blue-1/60"
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-gray-2 p-4">
          <h2 id="admin-drawer-title" className="text-h4">
            {title}
          </h2>
          <button
            type="button"
            className="cursor-pointer rounded-full p-2 transition hover:bg-background"
            aria-label="Fechar"
            onClick={close}
          >
            <XIcon size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          <p className="text-small text-blue-4">
            Campos com <span className="text-pink-0">*</span> são obrigatórios.
          </p>
          {children}
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-2 p-4">
          {error && (
            <p role="alert" className="rounded-xl bg-pink-4 p-3 text-strong">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outlineDark" size="small" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="dark"
              size="small"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </form>
    </dialog>
  )
}
