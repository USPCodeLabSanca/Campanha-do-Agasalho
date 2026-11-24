type StepCardVariant = 'orange' | 'purple' | 'green'

type StepCardProps = {
  step?: number
  title: string
  description: string
  image?: string
  variant?: StepCardVariant
}

const variantClasses = {
  orange: {
    box: 'border-orange-2/40',
    circle: 'bg-orange-1',
  },
  purple: {
    box: 'border-purple-1/40',
    circle: 'bg-purple-3',
  },
  green: {
    box: 'border-green-1/40',
    circle: 'bg-green-2',
  },
}

export function StepCard({
  step,
  title,
  description,
  image,
  variant = 'orange',
}: StepCardProps) {
  return (
    <div
      className={`flex h-full flex-col gap-3 card text-blue-1 ${image ? 'p-6' : 'p-8'} ${variantClasses[variant].box}`}
    >
      {step && (
        <span
          className={`flex size-12 items-center justify-center rounded-full text-h4 ${variantClasses[variant].circle}`}
          aria-hidden="true"
        >
          {step}
        </span>
      )}
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="aspect-264/183 w-full rounded-xl object-cover object-top"
        />
      )}
      <h3 className="text-h4">{title}</h3>
      <p className="text-body">{description}</p>
    </div>
  )
}
