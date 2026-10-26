type ValueCardProps = {
  title: string
  description: string
  image: string
}

export function ValueCard({ title, description, image }: ValueCardProps) {
  return (
    <div className="h-full overflow-hidden card text-blue-1">
      <div className="flex justify-center bg-orange-3 py-6">
        <img src={image} alt="" className="h-24 w-auto" />
      </div>
      <div className="p-6">
        <h3 className="text-h4">{title}</h3>
        <p className="mt-2 text-body">{description}</p>
      </div>
    </div>
  )
}
