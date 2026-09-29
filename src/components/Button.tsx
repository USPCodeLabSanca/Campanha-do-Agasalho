import { Link } from 'react-router'

type ButtonVariant =
  'primary' | 'outlineLight' | 'outlineDark' | 'pink' | 'green'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  rightIcon?: React.ReactNode
  to?: string
  onClick?: () => void
  disabled?: boolean
}

const baseClasses =
  'text-button cursor-pointer rounded-full border-2 px-5 py-3 transition inline-flex items-center justify-center gap-2 disabled:pointer-events-none disabled:opacity-50'

const variantClasses = {
  primary: 'bg-orange-1 text-blue-1 border-transparent hover:brightness-95',
  outlineLight:
    'bg-transparent text-white border-white hover:bg-white hover:text-blue-1',
  outlineDark:
    'bg-transparent text-blue-1 border-blue-1 hover:bg-blue-1 hover:text-white',
  pink: 'bg-pink-1 text-white border-transparent hover:brightness-95',
  green: 'bg-green-1 text-blue-1 border-transparent hover:brightness-95',
}

export function Button({
  children,
  variant = 'primary',
  rightIcon,
  to,
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]}`

  const content = (
    <>
      {children}
      {rightIcon && (
        <span aria-hidden="true" className="flex">
          {rightIcon}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
