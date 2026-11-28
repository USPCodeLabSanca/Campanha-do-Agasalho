import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

type TextLinkProps = {
  children: React.ReactNode
  to: string
}

const classes = 'group inline-flex items-center gap-1 text-button text-blue-1'

export function TextLink({ children, to }: TextLinkProps) {
  const { t } = useTranslation()
  const content = (
    <>
      <span className="underline decoration-orange-1 decoration-2 underline-offset-4 transition-all group-hover:decoration-orange-2 group-hover:decoration-4">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform motion-safe:group-hover:translate-x-1"
      >
        →
      </span>
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
        <span className="sr-only"> {t('newTab')}</span>
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
