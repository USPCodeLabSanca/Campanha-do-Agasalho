interface NucleusCardProps {
  image: string
  title: string
  description: string
}

export function NucleusCard({ image, title, description }: NucleusCardProps) {
  return (
    <article className="flex h-full items-center gap-4 rounded-2xl border border-pink-1 bg-white p-4 sm:gap-6 sm:p-6">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="h-20 w-20 shrink-0 object-contain sm:h-28 sm:w-28"
      />
      <div className="min-w-0">
        <h3 className="text-h4 break-words">{title}</h3>
        <p className="mt-2 text-small">{description}</p>
      </div>
    </article>
  )
}
