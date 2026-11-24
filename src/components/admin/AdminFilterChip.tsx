type AdminFilterChipProps = {
  label: string
  count: number
  isActive: boolean
  onToggle: () => void
}

export function AdminFilterChip({
  label,
  count,
  isActive,
  onToggle,
}: AdminFilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onToggle}
      className={`cursor-pointer rounded-full border px-4 py-1.5 text-strong transition ${
        isActive
          ? 'border-blue-1 bg-blue-1 text-white'
          : 'border-gray-2 bg-white hover:border-blue-1'
      }`}
    >
      {label} ({count})
    </button>
  )
}
