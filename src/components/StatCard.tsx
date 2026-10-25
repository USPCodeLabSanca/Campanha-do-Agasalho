type StatCardProps = {
  value: string
  title: string
  subtitle: string
}

export function StatCard({ value, title, subtitle }: StatCardProps) {
  return (
    <div className="h-full rounded-2xl bg-white p-4 text-blue-1 sm:p-8">
      <p className="mb-2 text-h3 sm:mb-4 sm:text-h2">{value}</p>
      <p className="text-strong">{title}</p>
      <p className="text-small text-blue-4">{subtitle}</p>
    </div>
  )
}
