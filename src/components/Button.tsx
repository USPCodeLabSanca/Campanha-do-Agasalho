import { Link } from 'react-router'

type ButtonVariant =
  'primary' | 'dark' | 'outlineLight' | 'outlineDark' | 'pink' | 'green'

type ButtonSize = 'default' | 'small'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  rightIcon?: React.ReactNode
  to?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

const baseClasses =
  'text-button cursor-pointer rounded-full border-2 transition inline-flex items-center justify-center gap-2 disabled:pointer-events-none disabled:opacity-50'

const sizeClasses = {
  default: 'px-5 py-3',
  small: 'px-4 py-1.5',
}

const variantClasses = {
  primary: 'bg-orange-1 text-blue-1 border-transparent hover:brightness-95',
  dark: 'bg-blue-1 text-white border-transparent hover:brightness-130',
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
  size = 'default',
  rightIcon,
  to,
  href,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`

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
  if (href) {
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      onClick={onClick}
    >
      {content}
    </a>
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
