import { NavLink } from 'react-router'

type NavItemVariant = 'desktop' | 'mobile'

type NavItemProps = {
  to: string
  children: React.ReactNode
  variant?: NavItemVariant
  onClick?: () => void
}

const baseClasses = 'transition'

const variantClasses = {
  desktop: 'px-2 py-1',
  mobile: 'block py-4',
}

const inactiveClasses = 'text-body text-white hover:text-orange-1'

const activeClasses =
  'text-button text-orange-1 underline underline-offset-8 decoration-2'

export function NavItem({
  to,
  children,
  variant = 'desktop',
  onClick,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClasses} ${variantClasses[variant]} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {children}
    </NavLink>
  )
}
