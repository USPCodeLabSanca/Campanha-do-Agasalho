import { Link } from 'react-router'
import type { Icon } from '@phosphor-icons/react'

type AdminStatCardProps = {
  to: string
  icon: Icon
  label: string
  value: string
  detail: string
  isWarning?: boolean
}

export function AdminStatCard({
  to,
  icon: CardIcon,
  label,
  value,
  detail,
  isWarning,
}: AdminStatCardProps) {
  return (
    <Link
      to={to}
      className="flex h-full flex-col gap-2 rounded-2xl border border-gray-2 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-1 hover:shadow-lg"
    >
      <span className="flex items-center gap-2 text-strong text-blue-4">
        <CardIcon size={20} aria-hidden="true" />
        {label}
      </span>
      <span className="text-h2">{value}</span>
      <span
        className={`mt-auto text-small ${isWarning ? 'font-bold text-pink-1' : 'text-blue-4'}`}
      >
        {detail}
      </span>
    </Link>
  )
}
