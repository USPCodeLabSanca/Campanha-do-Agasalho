import wave from '../assets/images/wave.svg'

type PageHeroVariant = 'orange' | 'green' | 'pink' | 'purple'

type PageHeroProps = {
  label?: string
  title: string
  description: string
  image: string
  variant?: PageHeroVariant
}

const variantClasses = {
  orange: 'bg-orange-4',
  green: 'bg-green-2',
  pink: 'bg-pink-3',
  purple: 'bg-purple-3',
}

const waveBoxClasses =
  'absolute top-0 left-0 h-32 w-full sm:aspect-1440/339 sm:h-auto sm:max-h-80'

export function PageHero({
  label,
  title,
  description,
  image,
  variant = 'orange',
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className={`relative overflow-hidden text-blue-1 ${variantClasses[variant]}`}
    >
      <img src={wave} alt="" className={waveBoxClasses} />

      <div aria-hidden="true" className={waveBoxClasses}>
        <img
          src={image}
          alt=""
          className="absolute bottom-[10%] left-[77%] h-[80%] w-auto -translate-x-1/2 drop-shadow-[0_0_10px_rgb(255_255_255/0.35)]"
        />
      </div>

      <div className="relative page-container pt-36 pb-12 sm:pt-48 md:pt-56 md:pb-16">
        <div className="max-w-xl">
          {label && (
            <p className="mb-2 text-small font-bold tracking-widest uppercase">
              {label}
            </p>
          )}
          <h1 id="page-hero-title" className="text-h2">
            {title}
          </h1>
          <p className="mt-4 text-body-lg">{description}</p>
        </div>
      </div>
    </section>
  )
}
