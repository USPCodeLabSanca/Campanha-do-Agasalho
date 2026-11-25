type CheckboxGroupFieldProps = {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  help?: string
}

export function CheckboxGroupField({
  label,
  options,
  selected,
  onChange,
  help,
}: CheckboxGroupFieldProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      onChange(
        options.filter((item) => item === option || selected.includes(item)),
      )
    }
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-strong">{label}</legend>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isChecked = selected.includes(option)

          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-strong transition has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-orange-2 ${
                isChecked
                  ? 'border-blue-1 bg-blue-1 text-white'
                  : 'border-gray-2 bg-white hover:border-blue-1'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(option)}
                className="sr-only"
              />
              {option}
            </label>
          )
        })}
      </div>

      {help && <p className="text-small text-blue-4">{help}</p>}
    </fieldset>
  )
}
