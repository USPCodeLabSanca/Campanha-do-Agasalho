import { Button } from './Button'

type CardAction = {
  label: string
  to: string
}

type ActionCardProps = {
  title: string
  description: string
  image: string
  primaryAction: CardAction
  secondaryAction: CardAction
}

export function ActionCard({
  title,
  description,
  image,
  primaryAction,
  secondaryAction,
}: ActionCardProps) {
  return (
    <div className="flex h-full flex-col-reverse items-start gap-6 rounded-2xl border border-orange-2 bg-white p-6 text-blue-1 sm:flex-row sm:items-center sm:p-8">
      <div>
        <h3 className="text-h3">{title}</h3>
        <p className="mt-2 text-body">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button variant="dark" to={primaryAction.to}>
            {primaryAction.label}
          </Button>
          <Button variant="outlineDark" to={secondaryAction.to}>
            {secondaryAction.label}
          </Button>
        </div>
      </div>
      <img
        src={image}
        alt=""
        className="w-24 shrink-0 self-center sm:w-28 sm:self-auto"
      />
    </div>
  )
}
