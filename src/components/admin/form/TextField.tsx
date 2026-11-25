import { useId } from 'react'

type TextFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  help?: string
  required?: boolean
  multiline?: boolean
  type?: 'text' | 'number'
  step?: number
}

export const inputClasses =
  'w-full rounded-xl border border-gray-2 bg-white px-3 py-2 text-body'

export function TextField({
  label,
  value,
  onChange,
  help,
  required,
  multiline,
  type = 'text',
  step,
}: TextFieldProps) {
  const id = useId()
  const helpId = `${id}-help`

  const fieldProps = {
    id,
    value,
    required,
    'aria-describedby': help ? helpId : undefined,
    className: inputClasses,
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-strong">
        {label}
        {required && <span className="text-pink-1"> *</span>}
      </label>

      {multiline ? (
        <textarea
          {...fieldProps}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          {...fieldProps}
          type={type}
          min={type === 'number' ? 0 : undefined}
          step={step}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {help && (
        <p id={helpId} className="text-small text-blue-4">
          {help}
        </p>
      )}
    </div>
  )
}
