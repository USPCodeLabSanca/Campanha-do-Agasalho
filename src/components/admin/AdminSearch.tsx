import { MagnifyingGlassIcon } from '@phosphor-icons/react'

type AdminSearchProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export function AdminSearch({ label, value, onChange }: AdminSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <MagnifyingGlassIcon
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-blue-4"
      />
      <input
        type="search"
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-blue-1/60 bg-white py-2 pr-4 pl-10 text-body placeholder:text-blue-1/70"
      />
    </div>
  )
}
