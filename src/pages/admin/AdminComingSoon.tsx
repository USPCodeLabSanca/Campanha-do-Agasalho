type AdminComingSoonProps = {
  title: string
}

export function AdminComingSoon({ title }: AdminComingSoonProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-h2">{title}</h1>
      <p className="text-body">Em breve.</p>
    </div>
  )
}
