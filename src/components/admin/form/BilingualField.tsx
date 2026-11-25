import { useId } from 'react'

import { inputClasses } from './TextField'

import type { TranslatedText } from '../../../types/translatedText'

type BilingualFieldProps = {
  label: string
  value: TranslatedText
  onChange: (value: TranslatedText) => void
  required?: boolean
  multiline?: boolean
}

const languages = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'Inglês' },
] as const

export function BilingualField({
  label,
  value,
  onChange,
  required,
  multiline,
}: BilingualFieldProps) {
  const id = useId()

  return (
    <fieldset className="flex flex-col gap-3 rounded-2xl border border-gray-2 p-4">
      <legend className="px-1 text-strong">
        {label}
        {required && <span className="text-pink-1"> *</span>}
      </legend>

      <div className="grid gap-3 sm:grid-cols-2">
        {languages.map((language) => {
          const fieldId = `${id}-${language.code}`
          const isPortuguese = language.code === 'pt'

          const fieldProps = {
            id: fieldId,
            value: value[language.code],
            required: required && isPortuguese,
            className: inputClasses,
          }

          function handleChange(text: string) {
            onChange({ ...value, [language.code]: text })
          }

          return (
            <div key={language.code} className="flex flex-col gap-1">
              <label htmlFor={fieldId} className="text-small">
                {language.label}
                {required && !isPortuguese && ' (opcional)'}
              </label>

              {multiline ? (
                <textarea
                  {...fieldProps}
                  rows={4}
                  onChange={(event) => handleChange(event.target.value)}
                />
              ) : (
                <input
                  {...fieldProps}
                  type="text"
                  onChange={(event) => handleChange(event.target.value)}
                />
              )}
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
