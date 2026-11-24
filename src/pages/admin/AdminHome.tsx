import { TextLink } from '../../components/TextLink'

export function AdminHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center text-blue-1">
      <h1 className="text-h2">Área administrativa</h1>
      <p className="text-body">Em breve, as telas de gerenciamento do site.</p>
      <TextLink to="/">Voltar para o site</TextLink>
    </main>
  )
}
