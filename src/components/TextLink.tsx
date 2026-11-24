import { Link } from 'react-router'

type TextLinkProps = {
  children: React.ReactNode
  to: string
}

const classes =
  'inline-flex items-center gap-1 text-button text-blue-1 transition hover:text-orange-2'

export function TextLink({ children, to }: TextLinkProps) {
  const content = (
    <>
      <span className="underline decoration-orange-1 decoration-2 underline-offset-4">
        {children}
      </span>
      <span aria-hidden="true">→</span>
    </>
  )

  if (to.startsWith('http')) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    )
  }

  if (to.startsWith('mailto:')) {
    return (
      <a href={to} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  )
}
