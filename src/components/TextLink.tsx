import { Link } from 'react-router'

type TextLinkProps = {
  children: React.ReactNode
  to: string
}

export function TextLink({ children, to }: TextLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-button text-blue-1 transition hover:text-orange-2"
    >
      <span className="underline decoration-orange-1 decoration-2 underline-offset-4">
        {children}
      </span>
      <span aria-hidden="true">→</span>
    </Link>
  )
}
