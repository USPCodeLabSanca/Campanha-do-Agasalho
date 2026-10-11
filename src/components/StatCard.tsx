type StatCardProps = {
  value: string
  title: string
  subtitle: string
}

export function StatCard({ value, title, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-orange-2 bg-white p-8 text-blue-1">
      <p className="mb-4 text-h2">{value}</p>
      <p className="text-strong">{title}</p>
      <p className="text-small text-blue-4">{subtitle}</p>
    </div>
  )
}
