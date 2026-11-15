type ValueCardProps = {
  image: string
  title: string
  sectionTitle: string
  subtitleHighlight: string
  subtitleText: string
  descriptionHighlight: string
  descriptionText: string
}

export function EntityCard({
  image,
  title,
  sectionTitle,
  subtitleHighlight,
  subtitleText,
  descriptionHighlight,
  descriptionText,
}: ValueCardProps) {
  return (
    <div className="h-full overflow-hidden card border-purple-3 text-blue-1">
      <div className="flex justify-center bg-purple-3 py-6">
        <img src={image} alt="" className="h-28 w-auto md:h-32" />
      </div>
      <div className="p-6">
        <h3 className="text-h4">{title}</h3>
        <h3 className="text-small text-blue-4">{sectionTitle}</h3>
        <p className="mt-2 text-body">
          <span className="text-strong">{subtitleHighlight}</span>{' '}
          {subtitleText}
        </p>
        <p className="mt-2 text-body">
          <span className="text-strong">{descriptionHighlight}</span>{' '}
          {descriptionText}
        </p>
      </div>
    </div>
  )
}
