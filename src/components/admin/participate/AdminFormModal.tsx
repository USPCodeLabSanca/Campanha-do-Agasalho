import { useEffect, type ReactNode } from 'react'
import { Button } from '../../Button'

export const inputClasses =
  'w-full rounded-lg border border-blue-1/30 bg-white px-3 py-2 text-blue-1 placeholder:text-blue-1/50 focus:border-blue-1 focus:outline-none'

type FormFieldProps = {
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

export function FormField({ label, hint, error, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-blue-1">
      {label}
      {children}
      {hint && !error && (
        <span className="text-xs font-normal text-blue-1/70">{hint}</span>
      )}
      {error && (
        <span role="alert" className="text-xs font-normal text-pink-1">
          {error}
        </span>
      )}
    </label>
  )
}

type AdminFormModalProps = {
  title: string
  isSaving: boolean
  onSubmit: () => void
  onClose: () => void
  children: ReactNode
}

export function AdminFormModal({
  title,
  isSaving,
  onSubmit,
  onClose,
  children,
}: AdminFormModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-1/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-form-title"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex max-h-[90vh] w-full max-w-lg flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-6"
      >
        <h2 id="admin-form-title" className="text-xl font-bold text-blue-1">
          {title}
        </h2>

        {children}

        <div className="flex justify-end gap-3">
          <Button variant="outlineDark" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
