import { StatCard } from '../components/StatCard'

export function Home() {
  return (
    <>
      <StatCard
        value="18"
        title="pontos de coleta"
        subtitle="USP e São Carlos"
      />
      <StatCard
        value="+620 mil"
        title="peças arrecadadas"
        subtitle="edição 2025"
      />
      <StatCard
        value="+60"
        title="entidades beneficiadas"
        subtitle="São Carlos"
      />
      <StatCard value="+16" title="anos de campanha" subtitle="desde 2010" />
    </>
  )
}
