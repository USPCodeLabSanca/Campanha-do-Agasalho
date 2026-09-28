type ButtonVariant =
  'primary' | 'outlineLight' | 'outlineDark' | 'pink' | 'green'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  rightIcon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const baseClasses =
  'text-button cursor-pointer rounded-full border-2 px-5 py-3 transition inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-2 disabled:pointer-events-none disabled:opacity-50'

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
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {rightIcon && (
        <span aria-hidden="true" className="flex">
          {rightIcon}
        </span>
      )}
    </button>
  )
}
