import type { SelectionProcess } from '../../../types/participate'
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
  const { isOpen } = selection

  return (
    <section
      aria-labelledby="selection-process-title"
      className="flex flex-col gap-4 rounded-2xl border border-blue-1/20 bg-white p-5 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="selection-process-title"
            className="text-lg font-bold text-blue-1"
          >
            Processo seletivo
          </h2>
          <span
            className={[
              'rounded-full px-3 py-0.5 text-xs font-semibold',
              isOpen ? 'bg-green-1/30 text-blue-1' : 'bg-blue-1/10 text-blue-1',
            ].join(' ')}
          >
            {isOpen ? 'Inscrições abertas' : 'Inscrições fechadas'}
          </span>
        </div>

        <p className="text-sm text-blue-1/80">
          {isOpen
            ? 'A página Participe mostra o botão de inscrição.'
            : 'A página Participe mostra o aviso de "Inscrições fechadas" com a mensagem configurada.'}
        </p>

        <p className="truncate text-sm text-blue-1/70">
          {selection.formUrl
            ? `Link do formulário: ${selection.formUrl}`
            : 'Nenhum link de formulário configurado.'}
        </p>

        {isOpen && !selection.formUrl && (
          <p role="alert" className="text-sm font-semibold text-pink-1">
            Atenção: as inscrições estão abertas, mas não há link configurado.
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap gap-3">
        <Button variant="outlineDark" size="small" onClick={onEdit}>
          Editar textos e link
        </Button>
        <Button
          variant={isOpen ? 'dark' : 'primary'}
          size="small"
          onClick={onToggle}
          disabled={isToggling}
        >
          {isOpen ? 'Fechar inscrições' : 'Abrir inscrições'}
        </Button>
      </div>
    </section>
  )
}
