type CheckboxFieldProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  help?: string
}

export function CheckboxField({
  label,
  checked,
  onChange,
  help,
}: CheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-5 accent-blue-1"
      />
      <span className="flex flex-col">
        <span className="text-strong">{label}</span>
        {help && <span className="text-small text-blue-4">{help}</span>}
      </span>
    </label>
  )
}
