import { Button } from './Button'
import { TextLink } from './TextLink'

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
    <div className="flex h-full flex-col-reverse items-start gap-6 card p-6 text-blue-1 sm:flex-row sm:items-center sm:p-8">
      <div>
        <h3 className="text-h3">{title}</h3>
        <p className="mt-2 text-body">{description}</p>
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 lg:flex-col lg:items-start lg:gap-4 xl:flex-row xl:items-center xl:gap-6">
          <Button variant="dark" to={primaryAction.to}>
            {primaryAction.label}
          </Button>
          <TextLink to={secondaryAction.to}>{secondaryAction.label}</TextLink>
        </div>
      </div>
      <img
        src={image}
        alt=""
        className="h-28 w-auto shrink-0 self-center sm:h-36 sm:self-auto"
      />
    </div>
  )
}
