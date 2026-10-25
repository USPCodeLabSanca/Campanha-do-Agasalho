type StepCardVariant = 'orange' | 'purple'

type StepCardProps = {
  step: number
  title: string
  description: string
  variant?: StepCardVariant
}

const variantClasses = {
  orange: {
    box: 'border-orange-2',
    circle: 'bg-orange-1',
  },
  purple: {
    box: 'border-purple-1',
    circle: 'bg-purple-3',
  },
}

export function StepCard({
  step,
  title,
  description,
  variant = 'orange',
}: StepCardProps) {
  return (
    <div
      className={`h-full rounded-2xl border bg-background p-8 text-blue-1 ${variantClasses[variant].box}`}
    >
      <span
        className={`flex size-12 items-center justify-center rounded-full text-h4 ${variantClasses[variant].circle}`}
        aria-hidden="true"
      >
        {step}
      </span>
      <h3 className="mt-3 text-h4">{title}</h3>
      <p className="mt-3 text-body">{description}</p>
    </div>
  )
}
