import type { SelectionProcess } from '../../../types/participate'
import { formatDate } from '../../../utils/formatDate'
import { Button } from '../../Button'

type SelectionProcessCardProps = {
  selection: SelectionProcess
  isToggling: boolean
  onToggle: () => void
  onEdit: () => void
}

export function SelectionProcessCard({
  selection,
  isToggling,
  onToggle,
  onEdit,
}: SelectionProcessCardProps) {
  const { isOpen, formUrl, deadline } = selection
  const canOpen = Boolean(formUrl)

  return (
    <section
      aria-labelledby="selection-process-title"
      className="flex flex-col gap-4 rounded-2xl border border-gray-2 bg-white p-5 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="selection-process-title" className="text-h4">
            Inscrições
          </h2>
          <span
            className={`rounded-full px-3 py-0.5 text-caption font-bold ${
              isOpen ? 'bg-green-3 text-blue-1' : 'bg-background text-blue-4'
            }`}
          >
            {isOpen ? 'Abertas' : 'Fechadas'}
          </span>
        </div>

        <p className="text-small text-blue-4">
          {isOpen
            ? 'A página Participe mostra o botão "Fazer inscrição".'
            : 'A página Participe mostra que as inscrições estão fechadas, com a mensagem configurada.'}
        </p>

        <p className="truncate text-small text-blue-4">
          {formUrl
            ? `Formulário: ${formUrl}`
            : 'Nenhum link de formulário configurado.'}
        </p>

        {deadline && (
          <p className="text-small text-blue-4">
            Inscrições até {formatDate(deadline)}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-2 md:items-end">
        <div className="flex flex-wrap gap-3">
          <Button variant="outlineDark" size="small" onClick={onEdit}>
            Editar inscrições
          </Button>
          <Button
            variant={isOpen ? 'dark' : 'primary'}
            size="small"
            onClick={onToggle}
            disabled={isToggling || (!isOpen && !canOpen)}
          >
            {isOpen ? 'Fechar inscrições' : 'Abrir inscrições'}
          </Button>
        </div>
        {!isOpen && !canOpen && (
          <p className="text-small text-blue-4">
            Coloque o link do formulário para poder abrir.
          </p>
        )}
      </div>
    </section>
  )
}
