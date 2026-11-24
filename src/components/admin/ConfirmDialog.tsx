import { useEffect, useRef } from 'react'

import { Button } from '../Button'

type ConfirmDialogProps = {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Excluir',
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white p-6 text-blue-1 backdrop:bg-blue-1/60"
    >
      <div className="flex flex-col gap-3">
        <h2 id="confirm-title" className="text-h4">
          {title}
        </h2>
        <p id="confirm-message" className="text-body">
          {message}
        </p>

        <div className="mt-3 flex justify-end gap-3">
          <Button variant="outlineDark" size="small" onClick={close}>
            Cancelar
          </Button>
          <Button variant="pink" size="small" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
